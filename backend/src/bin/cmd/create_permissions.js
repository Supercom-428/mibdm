module.exports = {
    code: 'create_permissions',
    description: 'Add a permission to a role',
    options: {
        code: {
            description: 'Permission code',
            alias: 'c',
            type: 'string',
        },
        role_id: {
            description: 'System role ID',
            alias: 'r',
            type: 'integer',
        }
    },
    command: async argv => {
        const Permission = require(__dirname + '/../../models').permissions;
        const permission = Permission.build({
            code: argv.code,
            roleId: argv.role_id
        });
        try {
            await permission.save();
            console.log(permission.id + ' created');
        } catch (e) {
            console.log('There was an error: ' + e);
        }
        process.exit(0);
    }
}
