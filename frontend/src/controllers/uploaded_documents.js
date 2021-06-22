'use strict';

const axios = require('axios');

exports.getAll = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const docs = await axios.get(process.env.API_URL + '/uploaded_documents/list', config)
        .then(async result => {
            let rows = [];
            await result.data.models.forEach(row => {
                rows.push({
                    documentId: row.documentId,
                    filename: row.filename,
                    pathToFile: row.pathToFile,
                });
            });
            return rows;
        });
    res.render('datatable', {
        datatable: true,
        user: req.session.user,
        title: 'Uploaded Documents',
        sort_column: 0,
        sort_direction: "desc",
        data: docs,
        export_filename: "uploaded_documents",
        columns: [
            'Document ID',
            'Filename',
            'Path To File',
        ],
    });
};
