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
            let i = 1;
            let j = 0;
            data.forEach(row => {
                let parsedRow = {};
                for (let index = 0; index < Object.keys(headers).length; index++) {
                    let key = Object.keys(headers)[index];
                    if (typeof row[key] == "string" && i) {
                        data.shift()
                        const subheaders = data.shift()  
                        data.forEach(subrow => {
                            Object.keys(subheaders).forEach(key => {
                                if(typeof subrow[key] !== "undefined"){
                                    parsedRow[subheaders[key]] = subrow[key];
                                }
                                else{
                                    parsedRow[subheaders[key]] = 'undefined';
                                    j++;
                                }
                            });
                            if (j == 3)
                                parsedData.push('undefined');
                            else {
                                let temp = Object.assign({}, parsedRow);
                                parsedData.push(temp);
                            }
                            j = 0;
                        });
                        let date = moment(headers[key]).format('DD/MM/YYYY').split('/');
                        date = parseInt(date[2]) * 10000 + parseInt(date[1]) * 100 + parseInt(date[0]);
                        parsedData.splice(0,0,date);
                        parsedData.splice(1,0,row[key]);
                        i = 0;
                        continue;
                    }

                    if (typeof row[key] !== 'undefined') {
                        
                        parsedRow = {};
                        parsedRow[headers[key]] = row[key];
                        
                        if (typeof parsedRow[headers[key]] == 'object') {
                            let date = moment(parsedRow[headers[key]]).format('DD/MM/YYYY').split('/');
                            parsedRow[headers[key]] = parseInt(date[2]) * 10000 + parseInt(date[1]) * 100 + parseInt(date[0]);
                        }
                        
                        const index = parsedData.findIndex(ele => ele === 'undefined');
                        parsedData[index] = parsedRow[headers[key]];
                    }
                }
            });

            for (let index = 0; index < parsedData.length; index++) {
                if (typeof parsedData[index] == 'number') {
                    for (let i = index + 1; i < parsedData.length; i ++){
                        if (typeof parsedData[i] == 'number')
                            break;
                        if (typeof parsedData[i] == 'string'){
                            parsedData[i] += ':' + parsedData[index].toString();
                            console.log("converting: " + typeof parsedData[i]);
                        }
                        else
                            parsedData[i]['Date'] = parsedData[index].toString();
                    }
                }
                if (typeof parsedData[index] == 'string') {
                    for (let j = index + 1; j < parsedData.length; j ++){
                        if(typeof parsedData[j] == 'number' || typeof parsedData[j] == 'string')
                            break;
                        parsedData[j]['Company'] = parsedData[index];
                    }
                }
            }
            let filter = 0;
            while (1) {
                if ( typeof parsedData[filter] !== 'object' || parsedData[filter]['Pay Ref'] == 'Pay Ref' || parsedData[filter]['Pay Ref'] == 'undefined'
                || parsedData[filter]['Name'] == 'undefined') {
                    parsedData.splice(filter, 1);
                    filter = 0;
                }
                else
                    filter++;
                if(filter > parsedData.length - 1)
                    break;
            }
            resolve(parsedData);
        });
    }
}

module.exports = Parser;
