'use strict';

const controller = require('../controllers/import');
const requireLogin = require('../requireLogin');

module.exports = app => {
    app.get('/import/bank_statement', requireLogin, controller.bankStatementForm);
    app.post('/import/bank_statement', requireLogin, controller.uploadBankStatement);
    app.post('/import/match', requireLogin, controller.match);
    app.post('/import/unmatch', requireLogin, controller.unmatch);
    app.post('/import/match_payroll', requireLogin, controller.match_payroll);
    app.post('/import/unmatch_payroll', requireLogin, controller.unmatch_payroll);
    app.post('/import/enter_draw', requireLogin, controller.enterDraw);
    app.post('/import/enter_entries_into_draws', requireLogin, controller.enterEntriesIntoDraws);
    app.get('/import/payroll_report', requireLogin, controller.payrollReportForm);
    app.post('/import/payroll_report', requireLogin, controller.uploadPayrollReport);

    app.get('/import/debit_report', requireLogin, controller.debitReportForm);
    app.post('/import/debit_report', requireLogin, controller.uploadDebitReport);
    app.post('/import/match_debit', requireLogin, controller.match_debit);
}
