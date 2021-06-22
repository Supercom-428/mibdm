'use strict';

const axios = require('axios');

exports.getAll = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const reconciliation = await axios.get(process.env.API_URL + '/reconciliation/list', config)
        .then(async result => {
            let rows = [];
            await result.data.models.forEach(row => {
                rows.push({
                    id: row.id,
                    reference: row.reference,
                    name: row.name(),
                    entrantId: row.drawEntrantId,
                    firstName: row.draw_entrant.firstName,
                    lastName: row.draw_entrant.lastName,
                    companyId: row.companyId,
                    companyName: row.company.name,
                });
            });
            return rows;
        });
    res.render('datatable', {
        datatable: true,
        user: req.session.user,
        title: 'Reconciliation',
        data: reconciliation,
        sort_column: 0,
        sort_direction: "desc",
        export_filename: "reconciliation",
        columns: [
            'ID',
            'Reference',
            'Name',
            'Entrant ID',
            'First Name',
            'Last Name',
            'Company ID',
            'Company Name',
        ],
    });
};
