'use strict';

const axios = require('axios');

exports.getAll = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const media = await axios.get(process.env.API_URL + '/media/list', config)
        .then(async result => {
            let rows = [];
            await result.data.models.forEach(row => {
                rows.push({
                    id: row.id,
                    name: row.name,
                    contactName: row.contactName,
                    contactEmail: row.contactEmail,
                    contactNumber: row.contactNumber,
                });
            });
            return rows;
        });
    res.render('datatable', {
        datatable: true,
        user: req.session.user,
        title: 'Media',
        data: media,
        sort_column: 0,
        sort_direction: "desc",
        export_filename: "media",
        columns: [
            'ID',
            'Name',
            'Contact Name',
            'Contact Email',
            'Contact Number',
        ],
    });
};
