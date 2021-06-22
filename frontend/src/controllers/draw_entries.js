'use strict';

const axios = require('axios');

exports.getAll = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const entries = await axios.get(process.env.API_URL + '/draw_entries/list', config)
        .then(async result => {
            let rows = [];
            await result.data.models.forEach(row => {
                rows.push({
                    entryNumber: row.entryNumber,
                    entrantId: row.entrantId,
                    firstName: row.drawEntrant.firstName,
                    lastName: row.drawEntrant.lastName,
                });
            });
            return rows;
        });
    res.render('datatable', {
        datatable: true,
        user: req.session.user,
        title: 'Draw Entries',
        data: entries,
        sort_column: 0,
        sort_direction: "desc",
        export_filename: "draw_entries",
        columns: [
            'Entry Number',
            'Entrant ID',
            'First Name',
            'Last Name',
        ],
    });
};
