'use strict';

const axios = require('axios');

exports.getAll = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const users = await axios.get(process.env.API_URL + '/users/list', config)
        .then(async result => {
            let rows = [];
            await result.data.models.forEach(row => {
                rows.push({
                    id: row.id,
                    username: row.username,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    emailAddress: row.emailAddress,
                    role: row.role.description,
                });
            });
            return rows;
        });
    res.render('datatable', {
        datatable: true,
        user: req.session.user,
        title: 'Users',
        data: users,
        sort_column: 0,
        sort_direction: "desc",
        export_filename: "users",
        columns: [
            'ID',
            'Username',
            'First Name',
            'Last Name',
            'Email',
            'Role',
        ],
    });
};
