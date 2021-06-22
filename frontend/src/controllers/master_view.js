'use strict';

const axios = require('axios');
const moment = require('moment');
const FormData = require('form-data');

exports.getMasterView = async (req, res) => {
    var data = {};
    const config = {
        headers: {Authorization: `Bearer ${req.session.token}`}
    };

    if ( req.params.id == 0) {
        data = await axios.get(process.env.API_URL + '/master_view/data/0', config)
            .then(async result => {
                if (typeof result.data.defaultSettings === 'string') {
                    result.data.defaultSettings = JSON.parse(result.data.defaultSettings);
                }
                return result.data;
            });
    } else {
        data = await axios.get(process.env.API_URL + '/master_view/data/1', config)
            .then(async result => {
                if (typeof result.data.defaultSettings === 'string') {
                    result.data.defaultSettings = JSON.parse(result.data.defaultSettings);
                }
                return result.data;
            });
    }
    
    var columns = [];
    if ( req.params.id == 0 ) {
        columns = [
            'Entry Number',
            'First Name',
            'Last Name',
            'Company Name',
            'Phone Number',
            'Email Address',
            'Payment Frequency',
            'Payment Method',
            'Payroll Reference',
            'Added To CRM',
            'Consent Given To Contact Line Manager',
            'Notes',
            'Delete Option',
        ];
    } else {
        columns = [
            'Entry Number',
            'First Name',
            'Last Name',
            'Company Name',
            'Phone Number',
            'Email Address',
            'Payment Frequency',
            'Payment Method',
            'Payroll Reference',
            'Added To CRM',
            'Consent Given To Contact Line Manager',
            'Notes',
        ];
    }

    const drawDates = Object.keys(data.draws.filters.dates);

    drawDates.forEach(date => {
        columns.push(date);
    });

    let tableData = [];
    Object.values(data.entries.data).forEach(row => {
        var record = {};

        if ( req.params.id == 0 ) {
            record = {
                entryNumber: row.entryNumber,
                firstName: row.drawEntrant.firstName,
                lastName: row.drawEntrant.lastName,
                companyName: row.drawEntrant.company !== null ? row.drawEntrant.company.name : '',
                phoneNumber: row.drawEntrant.phoneNumber,
                emailAddress: row.drawEntrant.email,
                paymentFrequency: row.drawEntrant.paymentFrequency,
                paymentMethod: row.drawEntrant.paymentMethod,
                payrollReference: row.drawEntrant.payrollReference,
                addedToCRM: row.drawEntrant.isAddedToCrm === 1 ? 'Yes' : 'No',
                consentGivenToContactLineManager: row.drawEntrant.isConsentGivenToContactLineManager === 1 ? 'Yes' : 'No',
                notes: row.drawEntrant.notes === null ? '' : row.drawEntrant.notes.data.length > 0 ? Buffer.from(row.drawEntrant.notes).toString('utf8') : '',
                deleteOption: row.weeklyDrawEntries.length != 0 ? row.weeklyDrawEntries[0].status === 2 ? '2' : '<button class="button" id="'+ row.entryNumber +'" >Del</button>' : '0',
            };
        } else {
            record = {
                entryNumber: row.entryNumber,
                firstName: row.drawEntrant.firstName,
                lastName: row.drawEntrant.lastName,
                companyName: row.drawEntrant.company !== null ? row.drawEntrant.company.name : '',
                phoneNumber: row.drawEntrant.phoneNumber,
                emailAddress: row.drawEntrant.email,
                paymentFrequency: row.drawEntrant.paymentFrequency,
                paymentMethod: row.drawEntrant.paymentMethod,
                payrollReference: row.drawEntrant.payrollReference,
                addedToCRM: row.drawEntrant.isAddedToCrm === 1 ? 'Yes' : 'No',
                consentGivenToContactLineManager: row.drawEntrant.isConsentGivenToContactLineManager === 1 ? 'Yes' : 'No',
                notes: row.drawEntrant.notes === null ? '' : row.drawEntrant.notes.data.length > 0 ? Buffer.from(row.drawEntrant.notes).toString('utf8') : '',
            };
        }
        drawDates.forEach(date => {
            record[date] = 'No';
        });
        Object.values(row.weeklyDrawEntries).forEach(drawEntry => {
            const tmpDate = moment(drawEntry.weeklyDraw.date, 'YYYY-MM-DD').format('DD/MM/YYYY');
            if (Object.values(drawDates).indexOf(tmpDate) !== -1) { // @todo moment
                // record[drawEntry.weeklyDraw.date] = '<i class="nav-icon fas fa-check"></i>';
                record[tmpDate] = 'Yes';
            }
        });
        if (row.drawEntrant.lastName === 'McCrossan') {
            console.log(record);
            console.log(row.weeklyDrawEntries);
        }
        tableData.push(record);
    });

    let filters = [];

    let yearFilter = {
        code: 'years',
        title: 'Years',
        options: [],
    };

    const monthsMap = {
        '1': 'Jan',
        '2': 'Feb',
        '3': 'Mar',
        '4': 'Apr',
        '5': 'May',
        '6': 'Jun',
        '7': 'Jul',
        '8': 'Aug',
        '9': 'Sept',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec',
    };

    let monthsColumnsMap = {};
    columns.forEach((column, index) => {
        if (column.indexOf('/') === -1) {
            return;
        }
        var parts = column.split('/');
        if (parts.length !== 3) {
            return;
        }
        // console.log(parts);
        const year = parts[2];
        const month = parseInt(parts[1]);
        if (typeof monthsColumnsMap[year] === 'undefined') {
            monthsColumnsMap[year] = {};
        }
        if (typeof monthsColumnsMap[year][month] === 'undefined') {
            monthsColumnsMap[year][month] = [];
        }
        monthsColumnsMap[year][month].push(index);
    });

    // console.log(monthsColumnsMap);

    Object.keys(data.draws.filters.years).forEach(year => {
        let obj = {};
        obj.value = year;
        obj.title = year;
        obj.visible = false;
        obj.children = [];
        let months = {
            code: 'months',
            options: [],
        };
        Object.keys(data.draws.filters.years[year]).forEach(month => {
            // console.log(month);
            // console.log(typeof month);
            // console.log(typeof monthsMap[month]);
            var columns = monthsColumnsMap[year][month];
            var visible = false;
            for (var x = 0; x < columns.length; x++) {
                var index = columns[x];
                if (typeof data.defaultSettings.columns !== 'undefined' && typeof data.defaultSettings.columns.visible !== 'undefined' && data.defaultSettings.columns.visible.indexOf(index) !== -1) {
                    visible = true;
                    break;
                }
            }
            months.options.push({
                value: month,
                title: typeof monthsMap[month] !== 'undefined' ? monthsMap[month] : month,
                columns: columns,
                visible: visible,
            });
        });
        for (var x = 0; x < months.options.length; x++) {
            var month = months.options[x];
            if (month.visible === true) {
                obj.visible = true;
                break;
            }
        }
        obj.children.push(months);
        console.log(obj);
        yearFilter.options.push(obj);
    });

    filters.push(yearFilter);

    console.log(data.defaultSettings);

    res.render('datatable-large', {
        datatable: true,
        user: req.session.user,
        title: req.params.id == 0 ? 'Master View' : 'Deleted Numbers',
        data: tableData,
        sort_column: 0,
        sort_direction: "desc",
        settings_code: "master_view",
        export_filename: "master_view",
        columns: columns,
        verticalColumns: drawDates,
        filters: filters,
        defaultSettings: data.defaultSettings,
    });
};

exports.delete = async (req, res) => {

    const form = new FormData();
    form.append('status', 2);
    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    console.log("entryId : ", req.body.entryId);
    
    await axios.post(process.env.API_URL + '/weekly_draw_entries/update/' + req.body.entryId, form, config)
        .then(async result => {
            res.send(JSON.stringify({result: true, data: result.data}));
        });
};

exports.update = async (req, res) => {

    const config = {
        headers: {Authorization: `Bearer ${req.session.token}`}
    };
    const data = await axios.get(process.env.API_URL + '/weekly_draw/list', config)
        .then(async result => {
            if (typeof result.data.defaultSettings === 'string') {
                result.data.defaultSettings = JSON.parse(result.data.defaultSettings);
            }
            return result.data;
        });
    
    data.models.forEach ( async model => {
        const tmpDate = moment(req.body.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        if (model.date == tmpDate) {

            const form = new FormData();
            form.append('entryId', req.body.entryId);
            form.append('drawId', model.drawId);
            form.append('operate', req.body.operate);

            const config = {
                headers: {
                    Authorization: `Bearer ${req.session.token}`,
                    ...form.getHeaders(),
                    'content-type': `multipart/form-data; boundary=${form._boundary}`,
                }
            };

            if (req.body.operate == 'No') {
                console.log("master-view Delete : ",model.date, tmpDate, req.body.operate)
                const resDel = await axios.post(process.env.API_URL + '/weekly_draw_entries/delete/' + model.drawId + '/' + req.body.entryId, form, config)
                    .then(async result => {
                        res.send(JSON.stringify({result: true, data: result.data}));
                    });
                return resDel;
            } else {
                console.log("master-view Create : ",model.date, tmpDate, req.body.operate);
                const resAdd = await axios.post(process.env.API_URL + '/weekly_draw_entries/create/', form, config)
                    .then(async result => {
                        res.send(JSON.stringify({result: true, data: result.data}));
                    });
                return resAdd;
            }
        }
    });
};
