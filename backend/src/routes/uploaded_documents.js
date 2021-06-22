'use strict';

const controller = require('../controllers/uploaded_documents');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/uploaded_documents/create', guard.check('uploaded_documents:create'), controller.create);
    app.get('/uploaded_documents/get/:id', guard.check('uploaded_documents:get'), controller.getById);
    app.get('/uploaded_documents/list', guard.check('uploaded_documents:list'), controller.getAll);
    app.post('/uploaded_documents/update/:id', guard.check('uploaded_documents:update'), controller.update);
    app.post('/uploaded_documents/delete/:id', guard.check('uploaded_documents:delete'), controller.delete);
}
