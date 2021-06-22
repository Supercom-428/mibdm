'use strict';

const sha1 = require('sha1');
const md5 = require('md5');
const formidable = require('formidable');
const multiparty = require('multiparty');
const Helper = require('../helpers/controller');
const parser = require('../lib/parser');
const parser_payroll = require('../lib/parser_payroll')
const TextParser = require('../lib/txt_parser');
const drawHelper = require('../lib/draw');
const paymentHelper = require('../lib/payment');
const xlsx = require('xlsx');
const Reconciliation = require('../models').reconciliation;
const Company = require('../models').company;
const DrawEntrant = require('../models').drawEntrant;
const DrawEntry = require('../models').drawEntries;
const UploadedDocument = require('../models').uploadedDocuments;
const PaymentHistory = require('../models').paymentHistory;
const WeeklyDrawEntries = require('../models').weeklyDrawEntries;
const WeeklyDraw = require('../models').weeklyDraw;
const moment = require('moment');
const company = require('../models/company');

const WSKey = '8|SH2lRL^jiGKhEA+]%_~dqb,U,?#z';

exports.enterDraw = async (req, res, io) => {
    const WSChannel = md5(req.user.userId.toString() + WSKey) + '-draws';
    const DrawHelper = new drawHelper();
    const PaymentHelper = new paymentHelper();
    const form = new formidable({multiples: true, uploadDir: __dirname});
    form.parse(req, async (err, fields, files) => {
        const rows = JSON.parse(fields.data);
        rows.forEach(async row => {
  
            if (typeof row.company !== 'undefined') {
                // @todo we need to get the entrants for this company and match them to the next month's draw
                // @todo companies shouldn't get here if the entrants for that company don't add up to the amount paid
            } else {
                // we are detecting which draws to add an entrant to based on the number of entries they have and the amount they paid
                const entrant = await DrawEntrant.findByPk(row.draw_entrant, {include: [{all: true, nested: true}]});
                // const user = await User.findOne({
                //     where: {
                //         username: username,
                //     },
                //     include: [{all: true, nested: true}],
                // });
                // console.log(entrant);
                const amount = row.amount;
                const quantity = entrant.drawEntries.length;
                let type;
                try {
                    type = PaymentHelper.calculateDrawEntryForPayment(amount, quantity);
                } catch (e) {
                    console.log(e);
                    io.emit(WSChannel, {
                        type: 'unexpected-payment',
                        data: {
                            ...row,
                            entrant: JSON.stringify(entrant),
                        }
                    });
                    return;
                }

                // find the next month's dates after the payment date, check if already entered
                if (type === PaymentHelper.getNextMonthCode()) {
                    const dates = await DrawHelper.getNextMonthDrawDates(row.date, 'DD/MM/YYYY');
                    entrant.drawEntries.forEach(drawEntry => {
                        let datesNotEntered = [];
                        let datesEntered = [];
                        drawEntry.weeklyDrawEntries.forEach(weeklyDrawEntries => {
                            if (dates.indexOf(weeklyDrawEntries.date) !== -1) {
                                datesEntered.push(weeklyDrawEntries.date);
                            }
                        });

                        dates.forEach(date => {
                            if (datesEntered.indexOf(date) === -1) {
                                datesNotEntered.push(date);
                            }
                        });
                        console.log(row.date, type, dates);
                        console.log('dates entered = ', datesEntered);
                        console.log('dates not entered = ', datesNotEntered);

                        if (datesEntered.length > 0) {
                            // we have an issue, the entrant is already entered for some dates, we need manual intervention
                            io.emit(WSChannel, {
                                type: 'dates-entered',
                                data: {
                                    ...row,
                                    entrant: JSON.stringify(entrant),
                                    drawEntry: JSON.stringify(drawEntry),
                                    datesEntered: datesEntered,
                                    datesNotEntered: datesNotEntered,
                                },
                            });
                        }

                        // we only have dates not entered to go with, so we can tell the user we will add the entrant into them
                        console.log('emitting dates-not-entered with row', row);
                        io.emit(WSChannel, {
                            type: 'dates-not-entered',
                            data: {
                                ...row,
                                entrant: JSON.stringify(entrant),
                                drawEntry: JSON.stringify(drawEntry),
                                dates: datesNotEntered,
                            },
                        });
                    });

                }

                // find the next draw after the payment date, check if already entered
                if (type === PaymentHelper.getNextDrawCode()) {
                    const date = await DrawHelper.getNextDrawDates(row.date, 1, 'DD/MM/YYYY');
                    console.log(row.date, type, date);
                    // @todo enter them into the next draw!!!
                }
            }
        });
        Helper.sendResult(res, true, {});
    });
};

exports.enterEntriesIntoDraws = async (req, res, io) => {
    const WSChannel = md5(req.user.userId.toString() + WSKey) + '-draws';
    const resultsChannel = md5(req.user.userId.toString() + WSKey) + '-results';
    const DrawHelper = new drawHelper();
    const PaymentHelper = new paymentHelper();
    const form = new formidable({multiples: true, uploadDir: __dirname});
    form.parse(req, async (err, fields, files) => {
        const rows = JSON.parse(fields.data);
        rows.forEach(async row => {
            if (typeof row.company !== 'undefined') {
                // @todo we need to get the entrants for this company and match them to the next month's draw
                // @todo companies shouldn't get here if the entrants for that company don't add up to the amount paid
            } else {
                const dates = JSON.parse(row.draw_dates);

                let datesEntered = [];
                let datesNotEntered = [];
                // let promises = [];

                const entry = await DrawEntry.findByPk(row.entry_number, {include: [{all: true, nested: true}]});
    
                entry.status = '1';
                await Helper.update(DrawEntry, row.entry_number, entry);

                // dates.forEach(async drawDate => {
                //     promises.push(new Promise(async (resolve, reject) => {
                Promise.all(
                    dates.map(async drawDate => {

                        const date = moment(drawDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

                        const payment = PaymentHistory.build({
                            date: moment(row.payment_date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                            documentId: row.document_id,
                            description: '', // @todo get the description from the bank statement
                            amount: row.amount
                        });

                        const paymentId = await payment.save();

                        let draw;
                        draw = await WeeklyDraw.findOne({
                            where: {
                                date: date
                            }
                        });

                        if (draw === null) {
                            const model = WeeklyDraw.build({
                                date: date,
                                winningEntryId: null,
                                websitePositionNumber: null,
                                isBlogAddedToWebsite: 0,
                                isVideoOnYoutube: 0,
                                isSocialMediaPosted: 0,
                                isPrizeMoneyPaid: 0,
                                isMailshotSent: 0,
                                isConsentSignedForPhotoAndVideo: 0,
                                isAddedToInstagram: 0
                            });

                            draw = await model.save();
                        }

                        const entry = WeeklyDrawEntries.build({
                            entryId: row.entry_number,
                            drawId: draw.drawId,
                            status: '1',
                            paymentId: paymentId.paymentId
                        });
                        try {
                            await entry.save();
                            console.log('Entered ' + date + ' for ' + row.entry_number + ' / ' + draw.drawId);
                            // resolve({
                            //     date: date,
                            //     entered: true
                            // });
                            datesEntered.push(date);
                        } catch (e) {
                            console.error(e);
                            console.log('Failed to enter ' + date + ' for ' + row.entry_number + ' / ' + draw.drawId);
                            // resolve({
                            //     date: date,
                            //     entered: false
                            // });
                            datesNotEntered.push(date);
                        }
                    })
                ).then(() => {

                    
                    if (datesEntered.length > 0) {
                        io.emit(resultsChannel, {
                            type: 'successful-entries',
                            data: {
                                dates: datesEntered,
                                entry: JSON.stringify(entry),
                                row: row
                            }
                        });
                        console.log('emitted successful-entries');
                    }

                    if (datesNotEntered.length > 0) {
                        io.emit(resultsChannel, {
                            type: 'failed-entries',
                            data: {
                                dates: datesNotEntered,
                                entry: JSON.stringify(entry),
                                row: row
                            }
                        });
                        console.log('emitted failed-entries');
                    }
                });

                // Promise.all([promises])
                //     .then(results => {
                //         results.forEach(result => {
                //             if (result.entered === true) {
                //                 datesEntered.push(result.date);
                //             } else {
                //                 datesNotEntered.push(result.date);
                //             }
                //         });
                //     })
                //     .then(() => {

                    // });
            }
        });

        Helper.sendResult(res, true, {});
    });
};

exports.match = async (req, res, io) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    form.parse(req, async (err, fields, files) => {
        let reference = fields.reference.trim();
        if (reference === '') {
            reference = null;
        }
        let name = fields.name.trim();
        if (name === '') {
            name = null;
        }

        const entrantId = fields.entrantId === 'null' ? null : parseInt(fields.entrantId);
        const companyId = fields.companyId === 'null' ? null : parseInt(fields.companyId);

        console.log('entrantId = ' + entrantId);
        console.log('companyId = ' + companyId);
        console.log('reference = ' + reference);
        console.log('name = ' + name);

        const model = Reconciliation.build({
            drawEntrantId: entrantId,
            companyId: companyId,
            reference: reference,
            name: name,
        });

        await model.save();

        const row = JSON.parse(fields.row);
        
        const payment = PaymentHistory.build({
            documentId: fields.documentId,
            date: moment(row['Date'], 'DD/MM/YYYY').format('YYYY-MM-DD'),
            description: row['Description'],
            amount: row['Money in'],
        });
        
        await payment.save();

        // res.send(200, {""});
        const match = await Reconciliation.findOne({
            where: {
                reference: reference,
                name: name,
            },
            include: [{all: true, nested: true}],
        });
        console.log(match);
        Helper.sendResult(res, true, {"match": match});
    });
};

exports.unmatch = async (req, res, io) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    form.parse(req, async (err, fields, files) => {
        let reference = fields.reference.trim();
        if (reference === '') {
            reference = null;
        }
        let name = fields.name.trim();
        if (name === '') {
            name = null;
        }

        console.log('reference = ' + reference);
        console.log('name = ' + name);

        const update_row = await Reconciliation.findOne({
            where: {
                reference: reference,
                name: name,
            },
            include: [{all: true, nested: true}],
        });
        console.log('id = ' + update_row.id);

        const result = await Helper.delete(Reconciliation, update_row.id);

        Helper.sendResult(res, result, {"match": update_row});
    });
};

exports.match_payroll = async (req, res, io) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    form.parse(req, async (err, fields, files) => {
        let reference = fields.reference.trim();
        if (reference === '') {
            reference = null;
        }
        let name = fields.name.trim();
        if (name === '') {
            name = null;
        }

        console.log('entrantId = ' + fields.entrantId);

        const entrantId = fields.entrantId === 'null' ? null : parseInt(fields.entrantId);

        if (entrantId !== null) {
            let update_row = await DrawEntrant.findOne({
                where: {
                    id: entrantId,
                },
                include: [{all: true, nested: true}],
            });

            update_row.payrollReference = reference;

            await Helper.update(DrawEntrant, entrantId, update_row);
            
            const match = await DrawEntrant.findOne({
                where: {
                    payrollReference: reference,
                    id: entrantId,
                },
                include: [{all: true, nested: true}],
            });

            console.log(match);
            Helper.sendResult(res, true, {"match": match});
        }
    });
};

exports.unmatch_payroll = async (req, res, io) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    form.parse(req, async (err, fields, files) => {
        
        let referenceValue = fields.reference.trim();
        if (referenceValue === '') {
            referenceValue = null;
        }
        let name = fields.name.trim();
        if (name === '') {
            name = null;
        }

        let firstname = name.split(':', 2)[0];
        let lastname = name.split(':', 2)[1];

        const update_row = await DrawEntrant.findOne({
            where: {
                firstName: firstname,
                lastName: lastname,
                payrollReference: referenceValue,
            },
            include: [{all: true, nested: true}],
        });

        console.log(firstname,":",lastname, ":",referenceValue);

        const alias = firstname + " " + lastname;
        const match = {reference:referenceValue, name:alias};
        
        update_row.payrollReference = "";

        const result = await Helper.update(DrawEntrant, update_row.id, update_row);
        Helper.sendResult(res, result, {"match": match});
    });
};

exports.bankStatement = async (req, res, io) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    console.log('waiting for form to be parsed');
    form.parse(req, async (err, fields, files) => {
        console.log('form being parsed now');
        const WSChannel = md5(req.user.userId.toString() + WSKey);

        const file = files.file;
        const Parser = new parser(file.path, xlsx);
        const rows = await Parser.parse();
        const total = rows.length;

        const doc = UploadedDocument.build({
            filename: file.name,
            pathToFile: file.path,
            engineId: 1,
        });
        await doc.save();

        const documentId = doc.documentId;

        let totals = {
            total: total,
            processed: 0,
            matchedEntrants: 0,
            matchedCompanies: 0,
            unmatched: 0,
            ignored: 0,
            failed: 0,
        };

        console.log('emitting row count of ' + rows.length + ' to ' + WSChannel);
        io.emit(WSChannel, {
            type: 'count',
            data: {
                documentId: documentId,
                totals: totals
            }
        });
        // return;
        rows.forEach(async row => {
            let match = null;
            let matches = null;
            let rowFailed = true;

            let name = null,
                reference = null;

            // Row is a simple bank payment
            matches = row['Description'].match(/^FASTER PAYMENTS RECEIPT REF\.(.*) FROM (.*)$/);
            if (matches !== null && matches.length === 3) {
                rowFailed = false;
                reference = matches[1];
                name = matches[2];
            }

            // Row is a simple bank payment but without a reference
            matches = row['Description'].match(/^FASTER PAYMENTS RECEIPT FROM (.*)$/);
            if (matches !== null && matches.length === 2) {
                rowFailed = false;
                name = matches[1];
            }

            // Row is a "regular payment"
            matches = row['Description'].match(/^REGULAR TRANSFER FROM (.*) REFERENCE - (.*)$/);
            if (matches !== null && matches.length === 3) {
                rowFailed = false;
                reference = matches[2];
                name = matches[1];
            }

            // Row is a "bank giro credit"
            matches = row['Description'].match(/^BANK GIRO CREDIT REF (.*)$/);
            if (matches !== null && matches.length === 2) {
                rowFailed = false;
                reference = matches[1];
            }

            // Row is a "interest paid"
            matches = row['Description'].match(/^INTEREST PAID .*$/);
            if (matches !== null) {
                rowFailed = false;
                totals.ignored++;
            }

            // Row is a "bill payment"
            matches = row['Description'].match(/^BILL PAYMENT FROM (.*)[\s,]+REFERENCE (.*)$/);
            if (matches !== null && matches.length === 3) {
                rowFailed = false;
                name = matches[1];
                reference = matches[2];
            }

            if (rowFailed) {
                console.log('failed row = ', row);
                totals.failed++;
            }

            if (name !== null || reference !== null) {
                match = await Reconciliation.findOne({
                    where: {
                        reference: reference,
                        name: name,
                    },
                    include: [{all: true, nested: true}],
                });
                totals.processed++;

                if (match !== null) {
                    let type = null;
                    if (match.drawEntrantId > 0) {
                        type = 'matched-entrants';
                        totals.matchedEntrants++;
                    } else {
                        type = 'matched-companies';
                        totals.matchedCompanies++;
                    }
                    console.log('emitting a match for ' + type);
                    io.emit(WSChannel, {
                        type: type,
                        data: {
                            documentId: documentId,
                            totals: totals,
                            row: row,
                            match: match.toJSON()
                        }
                    });
                } else {
                    totals.unmatched++;
                    // console.log('emitting a no match');
                    io.emit(WSChannel, {
                        type: 'unmatched',
                        data: {
                            documentId: documentId,
                            totals: totals,
                            row: row,
                            reference: reference,
                            name: name
                        }
                    });
                }
            } else {
                totals.processed++;
                io.emit(WSChannel, {
                    type: rowFailed ? 'failed' : 'ignored',
                    data: {
                        documentId: documentId,
                        totals: totals,
                        row: row,
                    }
                });
            }
        });
    });

    Helper.sendResult(res, {result: true});
};

exports.payrollReport = async (req, res, io) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    form.parse(req, async (err, fields, files) => {
        const WSChannel = md5(req.user.userId.toString() + WSKey);
        const file = files.file;
        const Parser = new parser_payroll(file.path, xlsx);
        const rows = await Parser.parse();
        const total = rows.length;

        const doc = UploadedDocument.build({
            filename: file.name,
            pathToFile: file.path,
            engineId: 1,
        });
        await doc.save();

        const documentId = doc.documentId;

        let totals = {
            total: total,
            processed: 0,
            matchedEntrants: 0,
            matchedCompanies: 0,
            unmatched: 0,
            ignored: 0,
            failed: 0,
        };
        console.log('emitting row count of ' + rows.length + ' to ' + WSChannel);
        io.emit(WSChannel, {
            type: 'count',
            data: {
                documentId: documentId,
                totals: totals
            }
        });
        rows.forEach(async row => {
            let match = null;
            let match_db = null;
            let match_company = null;
            let rowFailed = true;
            let companyname = null,
                name = null,
                reference = null;
                
            row.Date = row.Date.slice(6, 8) + '/' + row.Date.slice(4, 6) + '/' + row.Date.slice(0, 4);
            
            // Row is a simple bank payment
            match = Object.assign({}, row);
            if (match !== null && Object.keys(match).length === 5) {
                rowFailed = false;
                reference = match['Pay Ref'];
                name = match['Name'];
                row['Money in'] = match['Amount'];
                companyname = match['Company'].split(':')[0];
            }
            
            if (rowFailed) {
                console.log('failed row = ', row);
                totals.failed++;
            }

            match_company = await Company.findOne({
                where: {
                    payrollReportName : companyname,
                },
                include: [{all: true, nested: true}],
            });
            
            if (match_company != null && reference != null) {
                match_db = await DrawEntrant.findOne({
                    where: {
                        companyId: match_company.id,
                        payrollReference: reference,
                        paymentMethod: "payroll"
                    },
                    include: [{all: true, nested: true}],
                });
                totals.processed++;

                if (match_db !== null) {
                    let type = null;
                    
                    type = 'matched-entrants';
                    totals.matchedEntrants++;
                    
                    console.log('emitting a match for ' + type , match_db.toJSON());
                    io.emit(WSChannel, {
                        type: type,
                        data: {
                            documentId: documentId,
                            totals: totals,
                            row: row,
                            match: match_db.toJSON()
                        }
                    });
                } else {
                    totals.unmatched++;
                    console.log('emitting a no match');
                    io.emit(WSChannel, {
                        type: 'unmatched',
                        data: {
                            documentId: documentId,
                            totals: totals,
                            row: row,
                            reference: reference,
                            name: name
                        }
                    });
                }
            } else {
                totals.processed++;
                io.emit(WSChannel, {
                    type: rowFailed ? 'failed' : 'ignored',
                    data: {
                        documentId: documentId,
                        totals: totals,
                        row: row,
                    }
                });
            }
        });
    });

    Helper.sendResult(res, {result: true});
};


exports.directDebitImport = async (req, res, io) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    console.log('waiting for form to be parsed');
    form.parse(req, async (err, fields, files) => {
        console.log('form being parsed now');
        const WSChannel = md5(req.user.userId.toString() + WSKey);

        const file = files.file;
        const Parser = new TextParser(file.path);
        const rows = await Parser.parse();
        const total = rows.length;

        const doc = UploadedDocument.build({
            filename: file.name,
            pathToFile: file.path,
            engineId: 1,
        });
        await doc.save();

        const documentId = doc.documentId;

        let totals = {
            total: total,
            processed: 0,
            matchedEntrants: 0,
            matchedCompanies: 0,
            unmatched: 0,
            ignored: 0,
            failed: 0,
        };

        console.log('emitting row count of ' + rows.length + ' to ' + WSChannel);
        io.emit(WSChannel, {
            type: 'count',
            data: {
                documentId: documentId,
                totals: totals
            }
        });
        rows.forEach(async row => {
            let match = null;
            let matches = null;
            let rowFailed = true;
            let firstname = '',
                lastname = '';
            let name = null,
                reference = null;
            
            if (row !== null){
                rowFailed = false;
                reference = row['Ref'];
                name = row['Name'];
                row['Money in'] = row['Amount'];
                firstname = row['Name'].split(' ', 2)[0];
                lastname = row['Name'].split(' ', 2)[1];
                if (typeof lastname == 'undefined')
                    lastname = '';
            }
            if (rowFailed) {
                console.log('failed row = ', row);
                totals.failed++;
            }
            if (name !== null && reference !== null) {
                // match = await DrawEntrant.findOne({
                //     where: {
                //         firstName: firstname,
                //         lastName: lastname,
                //         payrollReference: reference,
                //         paymentMethod: "direct_debit"
                //     },
                //     include: [{all: true, nested: true}],
                // });
                match = await Reconciliation.findOne({
                    where: {
                        reference: reference,
                        name: name,
                    },
                    include: [{all: true, nested: true}],
                });
                totals.processed++;
                if (match !== null) {
                    let type = null;
                    if (match.drawEntrantId > 0) {
                        type = 'matched-entrants';
                        totals.matchedEntrants++;
                    } else {
                        type = 'matched-companies';
                        totals.matchedCompanies++;
                    }
                    console.log('emitting a match for ' + type);
                    io.emit(WSChannel, {
                        type: type,
                        data: {
                            documentId: documentId,
                            totals: totals,
                            row: row,
                            match: match.toJSON()
                        }
                    });
                } else {
                    totals.unmatched++;
                    io.emit(WSChannel, {
                        type: 'unmatched',
                        data: {
                            documentId: documentId,
                            totals: totals,
                            row: row,
                            reference: reference,
                            name: name
                        }
                    });
                }
            } else {
                totals.processed++;
                io.emit(WSChannel, {
                    type: rowFailed ? 'failed' : 'ignored',
                    data: {
                        documentId: documentId,
                        totals: totals,
                        row: row,
                    }
                });
            }
        });
    });

    Helper.sendResult(res, {result: true});  
};

exports.match_debit = async (req, res, io) => {

    console.log("MATCH DEBIT!!!!!!!");
    const form = new formidable({multiples: true, uploadDir: __dirname});
    form.parse(req, async (err, fields, files) => {
        let reference = fields.reference.trim();
        if (reference === '') {
            reference = null;
        }
        let name = fields.name.trim();
        if (name === '') {
            name = null;
        }

        const entrantId = fields.entrantId === 'null' ? null : parseInt(fields.entrantId);
        const companyId = fields.companyId === 'null' ? null : parseInt(fields.companyId);

        console.log('entrantId = ' + entrantId);
        console.log('companyId = ' + companyId);
        console.log('reference = ' + reference);
        console.log('name = ' + name);

        const model = Reconciliation.build({
            drawEntrantId: entrantId,
            companyId: companyId,
            reference: reference,
            name: name,
        });

        await model.save();

        // const row = JSON.parse(fields.row);
        //
        // const payment = PaymentHistory.build({
        //     documentId: fields.documentId,
        //     date: moment(row['Date'], 'DD/MM/YYYY').format('YYYY-MM-DD'),
        //     description: row['Description'],
        //     amount: row['Money in'],
        // });
        //
        // await payment.save();

        // res.send(200, {""});
        const match = await Reconciliation.findOne({
            where: {
                reference: reference,
                name: name,
            },
            include: [{all: true, nested: true}],
        });
        console.log(match);
        Helper.sendResult(res, true, {"match": match});
    });
};
