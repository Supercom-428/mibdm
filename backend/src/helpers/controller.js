module.exports = {

    saveModel: async (model) => {
        let result = false;
        try {
            await model.save();
            result = true;
        } catch (e) {
            console.log(e);
            // @todo perhaps throw the error and send via a result to the frontend?
            // depends if we want to have those kinds of errors in the frontend, probably not
        }
        return result;
    },

    sendResult: (res, flag, data) => {
        let resultData = {
            result: flag
        };
        if (typeof data === 'object') {
            resultData = {...resultData, ...data};
        }
        // console.log(resultData);
        res.send(JSON.stringify(resultData));
    },

    getById: async (model, id) => {
        return model.findByPk(id, {include: [{all: true, nested: true}]});
    },

    /**
     * @todo apply filters
     */
    getAll: async (model, filters) => {
        return model.findAll({include: [{all: true}]});
    },

    update: async (model, id, data) => {
        let record = await model.findByPk(id);

        await Object.keys(data).forEach(key => {
            record[key] = data[key];
        });

        try {
            await record.save();
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    delete: async (model, id) => {
        let record = await model.findByPk(id, {include: [{all: true, nested: true}]});
        console.log(record);
        let result = false;
        try {
            await record.destroy();
            result = true;
        } catch (e) {
            console.log(e);
            // @todo perhaps throw the error and send via a result to the frontend?
            // depends if we want to have those kinds of errors in the frontend, probably not
        }
        return result;
    },

};
