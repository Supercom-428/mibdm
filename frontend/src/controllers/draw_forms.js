'use strict';

const axios = require('axios');

exports.getAll = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const forms = await axios.get(process.env.API_URL + '/draw_form/list', config)
        .then(async result => {
            let rows = [];
            await result.data.models.forEach(row => {
                rows.push({
                    id: row.formId,
                    title: row.title,
                });
            });
            return rows;
        });
    res.render('datatable', {
        datatable: true,
        user: req.session.user,
        title: 'Draw Forms',
        data: forms,
        sort_column: 0,
        sort_direction: "desc",
        export_filename: "draw_forms",
        columns: [
            'ID',
            'Title',
        ],
    });
};
