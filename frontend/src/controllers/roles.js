'use strict';

const axios = require('axios');

exports.getAll = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const roles = await axios.get(process.env.API_URL + '/roles/list', config)
        .then(async result => {
            let rows = [];
            await result.data.models.forEach(row => {
                rows.push({
                    id: row.id,
                    description: row.description,
                });
            });
            return rows;
        });
    res.render('datatable', {
        datatable: true,
        user: req.session.user,
        title: 'Roles',
        data: roles,
        sort_column: 0,
        sort_direction: "desc",
        export_filename: "roles",
        columns: [
            'ID',
            'Description',
        ],
    });
};
