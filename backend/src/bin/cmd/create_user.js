module.exports = {
    code: 'create_user',
    description: 'Create a system user',
    options: {
        username: {
            description: 'Username used to log in the user to the system',
            alias: 'u',
            type: 'string',
        },
        password: {
            description: 'Password used to log in the user to the system',
            alias: 'p',
            type: 'string',
        },
        first_name: {
            description: 'First name',
            alias: 'f',
            type: 'string',
        },
        last_name: {
            description: 'Last name',
            alias: 'l',
            type: 'string',
        },
        email: {
            description: 'Email address',
            alias: 'e',
            type: 'string',
        },
        role_id: {
            description: 'System Role ID',
            alias: 'r',
            type: 'integer',
        }
    },
    command: async argv => {
        const User = require(__dirname + '/../../models').user;
        const user = User.build({
            username: argv.username,
            password: argv.password,
            firstName: argv.first_name,
            lastName: argv.last_name,
            emailAddress: argv.email,
            roleId: argv.role_id
        });
        try {
            await user.save();
            console.log(user.id + ' created');
        } catch (e) {
            console.log('There was an error: ' + e);
        }
        process.exit(0);
    }
}
