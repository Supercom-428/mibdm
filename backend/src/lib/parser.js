const moment = require('moment');

class Parser {
    constructor(file, xlsxParser) {
        this.file = file;
        this.xlsxParser = xlsxParser;
    }

    parse() {
        return new Promise((resolve, reject) => {
            const wb = this.xlsxParser.readFile(this.file, {cellDates: true});
            const name = wb.SheetNames[0];
            const ws = wb.Sheets[name];
            const data = this.xlsxParser.utils.sheet_to_json(ws);
            data.shift();
            const headers = data.shift();
            let parsedData = [];
            data.forEach(row => {
                let parsedRow = {};
                Object.keys(headers).forEach(key => {
                    parsedRow[headers[key]] = row[key];
                });
                if (typeof parsedRow['Date'] !== 'undefined') {
                    parsedRow['Date'] = moment(parsedRow['Date']).format('DD/MM/YYYY');
                }
                if (typeof parsedRow['Money in'] !== 'undefined' && parseFloat(parsedRow['Money in']) > 0) {
                    parsedData.push(parsedRow);
                }
            });
            // console.log(parsedData);
            resolve(parsedData);
        });
    }
}

module.exports = Parser;
