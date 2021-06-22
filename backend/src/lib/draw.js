const moment = require('moment');

const drawDayOfWeek = 3; // Wednesday

const defaultDateFormat = 'YYYY-MM-DD'; // eg. 2020-12-31 for new year's eve

class Draw {
    getNextDrawDates(afterDate, quantity, format) {
        // afterDate should be the latest date an entrant has paid into
        // quantity relates to how many draws after that date we want the dates for
        if (typeof format === 'undefined') {
            format = defaultDateFormat;
        }
        return new Promise ((resolve, reject) => {
            let drawDates = [];
            let date = moment(afterDate, format);

            while (drawDates.length < quantity) {
                date = date.add(1, 'days');
                if (date.isoWeekday() === drawDayOfWeek) {
                    drawDates.push(date.format(format));
                }
            }

            resolve(drawDates);
        });
    }

    getNextMonthDrawDates(afterDate, format) {
        // afterDate should be the date they paid, and we get the month after this' draw dates
        if (typeof format === 'undefined') {
            format = defaultDateFormat;
        }

        return new Promise ((resolve, reject) => {
            let drawDates = [];
            let date = moment(afterDate, format).startOf('month').add(1, 'months');
            const month = date.month();

            while (date.month() === month) {
                if (date.isoWeekday() === drawDayOfWeek) {
                    drawDates.push(date.format(format));
                }
                date.add(1, 'days');
            }

            resolve(drawDates);
        });
    }
}

module.exports = Draw;
