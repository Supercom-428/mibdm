'use strict';

const controller = require('../controllers/import');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/import/bank_statement', guard.check('import:bank-statement'), async (req, res) => {
        console.log("Enterance of bank_statement");
        await controller.bankStatement(req, res, io);
    });

    app.post('/import/match', guard.check('import:bank-statement'), controller.match);
    app.post('/import/unmatch', guard.check('import:bank-statement'), controller.unmatch);
    app.post('/import/enter_draw', guard.check('import:bank-statement'), async (req, res) => {
        await controller.enterDraw(req, res, io);
    });

    app.post('/import/enter_entries_into_draws', guard.check('import:bank-statement'), async (req, res) => {
        await controller.enterEntriesIntoDraws(req, res, io);
    });

    app.post('/import/match_payroll', guard.check('import:payroll-report'), controller.match_payroll);
    app.post('/import/unmatch_payroll', guard.check('import:payroll-report'), controller.unmatch_payroll);
    app.post('/import/payroll_report', guard.check('import:payroll-report'), async (req, res) => {
        await controller.payrollReport(req, res, io);
    });

    app.post('/import/debit_report', guard.check('import:debit-report'), async (req, res) => {
        await controller.directDebitImport(req, res, io);
    });

    app.post('/import/match_debit', guard.check('import:debit-report'), controller.match_debit);
}
