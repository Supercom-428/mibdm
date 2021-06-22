'use strict';

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const sha1 = require('sha1');
const md5 = require('md5');
const tempWrite = require('temp-write');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const WSKey = '8|SH2lRL^jiGKhEA+]%_~dqb,U,?#z';

exports.bankStatementForm = async (req, res) => {
    console.log("Get Statement");

    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const drawEntrants = await axios.get(process.env.API_URL + '/draw_entrants/options', config)
        .then(async result => {
            console.log(result);
            return result.data.result.options;
        });
    const companies = await axios.get(process.env.API_URL + '/company/options', config)
        .then(async result => {
            console.log(result);
            return result.data.result.options;
        });
    res.render('import_bank_statement', {
        user: req.session.user,
        wsChannel: md5(req.session.user.userId.toString() + WSKey),
        customJs: 'bank_statement_upload',
        drawEntrants: drawEntrants,
        companies: companies
    });
};

exports.uploadBankStatement = async (req, res) => {
    console.log("Post Upload Statement");
    console.log(req.files);
    const file = req.files.file;
    const tmp = await tempWrite(file.data, file.name);
    const form = new FormData();
    form.append('file', fs.createReadStream(tmp));

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };
    // console.log(headers);
    // let request = new XMLHttpRequest();
    // const url = process.env.API_URL + '/import/bank_statement';
    // request.open('POST', url);
    // Object.keys(headers).forEach(header => {
    //     request.setRequestHeader(header, headers[header]);
    // });
    // console.log(request.getRequestHeader(''))
    // request.send(form.toString());
    //
    await axios.post(process.env.API_URL + '/import/bank_statement', form, config)
        .then(async result => {
            console.log(result);
            res.send(JSON.stringify({result: true, data: result.data}));
        })
        .then(() => {
            fs.unlinkSync(tmp);
        })
};

exports.enterDraw = async (req, res) => {
    let data = [];
    Object.keys(req.body).forEach(function (field, index) {
        const value = Object.values(req.body)[index];
        const matches = field.match(/\[([\w]+)\]\[([\d]+)\]/);
        if (matches.length === 3) {
            if (typeof data[matches[2]] === 'undefined') {
                data[matches[2]] = {};
            }
            data[matches[2]][matches[1]] = value;
        }
    });

    const form = new FormData();
    form.append('data', JSON.stringify(data));

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };

    await axios.post(process.env.API_URL + '/import/enter_draw', form, config)
        .then(async result => {
            console.log(result);
            res.send(JSON.stringify({result: true, data: result.data}));
        })
};

exports.enterEntriesIntoDraws = async (req, res) => {
    let data = [];
    Object.keys(req.body).forEach(function (field, index) {
        const value = Object.values(req.body)[index];
        const matches = field.match(/\[([\w]+)\]\[([\d]+)\]/);
        if (matches.length === 3) {
            if (typeof data[matches[2]] === 'undefined') {
                data[matches[2]] = {};
            }
            data[matches[2]][matches[1]] = value;
        }
    });

    const form = new FormData();
    form.append('data', JSON.stringify(data));

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };

    await axios.post(process.env.API_URL + '/import/enter_entries_into_draws', form, config)
        .then(async result => {
            console.log(result);
            res.send(JSON.stringify({result: true, data: result.data}));
        })
}

exports.match = async (req, res) => {

    const form = new FormData();

    form.append('entrantId', req.body.entrantId);
    form.append('companyId', req.body.companyId);
    form.append('row', req.body.row);
    form.append('documentId', req.body.documentId);
    form.append('reference', req.body.reference);
    form.append('name', req.body.name);

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };
    await axios.post(process.env.API_URL + '/import/match', form, config)
        .then(async result => {
            console.log(result);
            res.send(JSON.stringify({result: true, data: result.data}));
        })
}

exports.match_payroll = async (req, res) => {

    const form = new FormData();

    form.append('entrantId', req.body.entrantId);
    form.append('row', req.body.row);
    form.append('documentId', req.body.documentId);
    form.append('reference', req.body.reference);
    form.append('name', req.body.name);

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };
    await axios.post(process.env.API_URL + '/import/match_payroll', form, config)
        .then(async result => {
            console.log(result);
            res.send(JSON.stringify({result: true, data: result.data}));
        })
}

exports.unmatch_payroll = async (req, res) => {

    const form = new FormData();

    form.append('documentId', req.body.documentId);
    form.append('reference', req.body.reference);
    form.append('name', req.body.name);

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };
    await axios.post(process.env.API_URL + '/import/unmatch_payroll', form, config)
        .then(async result => {
            console.log(result);
            res.send(JSON.stringify({result: true, data: result.data}));
        })
}

exports.payrollReportForm = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const drawEntrants = await axios.get(process.env.API_URL + '/draw_entrants/options', config)
        .then(async result => {
            console.log(result);
            return result.data.result.options;
        });
    const companies = await axios.get(process.env.API_URL + '/company/options', config)
        .then(async result => {
            console.log(result);
            return result.data.result.options;
        });
    res.render('import_payroll_report', {
        user: req.session.user,
        wsChannel: md5(req.session.user.userId.toString() + WSKey),
        customJs: 'bank_statement_upload',
        drawEntrants: drawEntrants,
        companies: companies
    });
};

exports.uploadPayrollReport = async (req, res) => {
    console.log("Post Upload Statement");
    console.log(req.files);
    const file = req.files.file;
    const tmp = await tempWrite(file.data, file.name);
    const form = new FormData();
    form.append('file', fs.createReadStream(tmp));

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };
    
    await axios.post(process.env.API_URL + '/import/payroll_report', form, config)
        .then(async result => {
            console.log(result);
            res.send(JSON.stringify({result: true, data: result.data}));
        })
        .then(() => {
            fs.unlinkSync(tmp);
        })
};


exports.debitReportForm = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const drawEntrants = await axios.get(process.env.API_URL + '/draw_entrants/options', config)
        .then(async result => {
            console.log(result);
            return result.data.result.options;
        });
    const companies = await axios.get(process.env.API_URL + '/company/options', config)
        .then(async result => {
            console.log(result);
            return result.data.result.options;
        });
    res.render('import_debit_report', {
        user: req.session.user,
        wsChannel: md5(req.session.user.userId.toString() + WSKey),
        customJs: 'bank_statement_upload',
        drawEntrants: drawEntrants,
        companies: companies
    });


};


exports.uploadDebitReport = async (req, res) => {
    console.log("Debit Upload");
    console.log(req.files);
    const file = req.files.file;
    const tmp = await tempWrite(file.data, file.name);
    const form = new FormData();
    form.append('file', fs.createReadStream(tmp));

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };

    await axios.post(process.env.API_URL + '/import/debit_report', form, config)
        .then(async result => {
            console.log(result);
            res.send(JSON.stringify({result: true, data: result.data}));
        })
        .then(() => {
            fs.unlinkSync(tmp);
        })
};


exports.match_debit = async (req, res) => {

    const form = new FormData();

    form.append('entrantId', req.body.entrantId);
    form.append('companyId', req.body.companyId);
    form.append('row', req.body.row);
    form.append('documentId', req.body.documentId);
    form.append('reference', req.body.reference);
    form.append('name', req.body.name);

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };
    await axios.post(process.env.API_URL + '/import/match_debit', form, config)
        .then(async result => {
            console.log(result);
            res.send(JSON.stringify({result: true, data: result.data}));
        })
}

exports.unmatch = async (req, res) => {

    const form = new FormData();

    form.append('documentId', req.body.documentId);
    form.append('reference', req.body.reference);
    form.append('name', req.body.name);
    console.log('req.body_unmatch : ', req.body);

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };
    await axios.post(process.env.API_URL + '/import/unmatch', form, config)
        .then(async result => {
            console.log(result);
            res.send(JSON.stringify({result: true, data: result.data}));
        })
}
