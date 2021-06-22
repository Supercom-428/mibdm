'use strict';

const axios = require('axios');

exports.getAll = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const history = await axios.get(process.env.API_URL + '/payment_history/list', config)
        .then(async result => {
            let rows = [];
            await result.data.models.forEach(row => {
                rows.push({
                    paymentId: row.paymentId,
                    date: row.date,
                    documentId: row.documentId,
                    file: row.uploaded_documents.filename,
                    description: row.description,
                    amount: row.amount,
                });
            });
            return rows;
        });
    res.render('datatable', {
        datatable: true,
        user: req.session.user,
        title: 'Payment History',
        data: history,
        sort_column: 1,
        sort_direction: "desc",
        export_filename: "payment_history",
        columns: [
            'ID',
            'Date',
            'Document ID',
            'File',
            'Description',
            'Amount',
        ],
    });
};
