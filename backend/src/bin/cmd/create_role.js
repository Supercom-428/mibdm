module.exports = {
    code: 'create_role',
    description: 'Create a system role',
    options: {
        description: {
            description: 'Name of the role',
            alias: 'd',
            type: 'string',
        }
    },
    command: async argv => {
        const Role = require(__dirname + '/../../models').role;
        const role = Role.build({
            description: argv.description
        });
        try {
            await role.save();
            console.log(role.id + ' created');
        } catch (e) {
            console.log('There was an error: ' + e);
        }
        process.exit(0);
    }
}
