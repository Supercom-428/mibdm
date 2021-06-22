'use strict';

const axios = require('axios');

exports.getAll = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const entrantForms = await axios.get(process.env.API_URL + '/draw_entrant_form/list', config)
        .then(async result => {
            let rows = [];
            await result.data.models.forEach(row => {
                rows.push({
                    formId: row.formId,
                    formTitle: row.draw_form.title,
                    entrantId: row.entrantId,
                    firstName: row.draw_entrant.firstName,
                    lastName: row.draw_entrant.lastName,
                    dateSent: row.dateSent,
                    dateReceived: row.dateReceived,
                    dateCopyReturned: row.dateCopyReturned,

                });
            });
            return rows;
        });
    res.render('datatable', {
        datatable: true,
        user: req.session.user,
        title: 'Draw Entrant Forms',
        data: entrantForms,
        sort_column: 0,
        sort_direction: "desc",
        export_filename: "draw_entrant_forms",
        columns: [
            'Form ID',
            'Form Title',
            'Entrant ID',
            'First Name',
            'Last Name',
            'Date Sent',
            'Date Received',
            'Date Copy Received',
        ],
    });
};
