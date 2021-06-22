const readline = require('readline');
const fs = require('fs');
const moment = require('moment');


  class TextParser{
    constructor(file) {
        this.file = file;
    }

    parse() {
        return new Promise((resolve, reject) => {
            
            const parsedData = [];
            const lines = [];
            const readInterface = readline.createInterface({
                input: fs.createReadStream(this.file),
                output: process.stdout,
                console: false
            });

            readInterface.on('line', line => {
                console.log(line);
                if (!line.trim() === false && !line.includes("-----"))
                {
                    lines.push(line);
                }

            }).on('close', () => {
                console.log("LINE COUNT: ", lines.length);
                const keys = [];
                let processed_cnt = -1;
                let unprocessed_cnt = -1;
                let index_proc_start = -1;
                let index_unproc_start = -1;
                let index_summary = -1;
                
                lines.forEach(line => {
                    
                    if (line.includes("Lines Processed:") === true)
                    {
                        processed_cnt = parseInt(line.split('\t')[1]); 
                    }
                    else if (line.includes("Lines UnProcessed:") === true){
                        unprocessed_cnt = parseInt(line.split('\t')[1]); 
                    }
                    else if (line.trim() === "PROCESSED LINES")
                    {
                        index_proc_start = lines.indexOf(line);
                    }
                    else if (line.trim() === "UNPROCESSED LINES")
                    {
                        index_unproc_start = lines.indexOf(line);
                    }
                    else if (line.includes("Summary") === true)
                    {
                        index_summary = lines.indexOf(line);
                    }
                });

                let stringKeysForProcLine = ['Ref', 'Name', 'Amount', 'Date'];

                if (index_proc_start !== -1){
                    
                    for (var i = index_proc_start + 3 ; i < index_unproc_start; i += 2)
                    {
                        let parsedRow = {};
                        let stringVal = lines[i].split('\t');
                        stringVal = stringVal.concat(lines[i + 1].split('\t'));
                        console.log(stringVal);
                        
                        for (var j = 0; j < stringKeysForProcLine.length; j ++)
                        {
                            parsedRow[stringKeysForProcLine[j]] = stringVal[j];
                        }
                        
                        parsedRow['processed'] = true;
                        parsedData.push(parsedRow);
                    }

                }
                // let stringKeysForUnprocLine = ['Ref', 'Name', 'Amount', 'Unknown', 'Date'];

                // if (index_unproc_start !== -1){
                //     let strings = lines[index_unproc_start + 1].split(',');
                //     let parsedRow = {};

                //     for (var j = 0; j < stringKeysForUnprocLine.length; j ++)
                //     {
                //         let string = strings[j];
                //         string = string.replace(/"/g, '');
                //         parsedRow[stringKeysForUnprocLine[j]] = string;
                //     }

                //     parsedRow['processed'] = false;
                //     parsedData.push(parsedRow);
                // }                
                resolve(parsedData);
            });
        });
    }
  }

  module.exports = TextParser;