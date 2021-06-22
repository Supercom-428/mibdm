const xlsx = require('xlsx');
const dateFormat = require('date-format');
const args = process.argv.slice(2);

const file = xlsx.readFile(args[0]);

const winnersSheet = file.Sheets['WINNERS'];

let columns = {};
let rows = {};
Object.keys(winnersSheet).forEach(key => {
    // console.log(key);
    const matches = key.match(/^([A-Z]+)([0-9]+)$/);
    if (matches === null) {
        return;
    }

    const column = matches[1];
    const row = parseInt(matches[2]);

    if (row === 1) {
        columns[column] = winnersSheet[key].w.trim();
        return;
    }

    const rowKey = row.toString();
    if (Object.keys(rows).indexOf(rowKey) === -1) {
        rows[rowKey] = {};
    }
    rows[rowKey][columns[column]] = winnersSheet[key].w.trim();
});

const months = {
    'jan': 1,
    'feb': 2,
    'mar': 3,
    'apr': 4,
    'may': 5,
    'june': 6,
    'july': 7,
    'aug': 8,
    'sept': 9,
    'oct': 10,
    'nov': 11,
    'dec': 12,
};

const failed = [
    '2019-10-23',
    '2018-6-20',
    '2018-6-13',
    '2018-6-6',
];

Object.values(rows).forEach(row => {
    if (typeof row['DATE'] === 'undefined') {
        // console.log(row);
        return;
    }

    let day, month, year, date;
    let matches = row['DATE'].match(/^([\d]+)[A-Z]+[\s]+([A-Z]{3,4})/);
    if (matches !== null) {
        year = 2018;
        day = matches[1];
        month = matches[2].toLowerCase();
        if (Object.keys(months).indexOf(month) > -1) {
            month = months[month];
        }
    } else {
        let parts = row['DATE'].split('.');
        year = '20' + parts[2];
        month = parts[1];
        day = parts[0];
    }
    date = year + '-' + month + '-' + day;

    if (failed.indexOf(date) === -1) {
        return;
    }

    let websitePositionNumber = 0;
    matches = row['WINNER ADDED TO MIB WEBSITE - WINNERS (as a judge)'].match(/^YES, POSITION NUMBER - ([\d]+)$/);
    if (matches !== null) {
        websitePositionNumber = parseInt(matches[1]);
    }

    let isBlogAddedToWebsite = 0,
        isVideoOnYoutube = 0,
        isSocialMediaPosted = 0,
        isPrizeMoneyPaid = 0,
        isMailshotSent = 0,
        isConsentSignedForPhotoAndVideo = 0,
        isAddedToInstagram = 0;

    if (typeof row['BLOG ADDED ON WEBSITE'] !== 'undefined') {
        isBlogAddedToWebsite = row['BLOG ADDED ON WEBSITE'].toLowerCase().trim() === 'yes' ? 1 : 0;
    }
    if (typeof row['Video on You Tube'] !== 'undefined') {
        isVideoOnYoutube = row['Video on You Tube'].toLowerCase().trim() === 'yes' ? 1 : 0;
    }
    if (typeof row['SOCIAL MEDIA POSTS'] !== 'undefined') {
        isSocialMediaPosted = row['SOCIAL MEDIA POSTS'].toLowerCase().trim() === 'yes' ? 1 : 0;
    }
    if (typeof row['PRIZE MONEY PAID'] !== 'undefined') {
        isPrizeMoneyPaid = row['PRIZE MONEY PAID'].toLowerCase().trim() === '2000' ? 1 : 0;
    }
    if (typeof row['EMAIL to all ticket holders'] !== 'undefined') {
        isMailshotSent = row['EMAIL to all ticket holders'].toLowerCase().trim() === 'and the winner is…' ? 1 : 0;
    }
    if (typeof row['Consent signed for photo & video'] !== 'undefined') {
        isConsentSignedForPhotoAndVideo = row['Consent signed for photo & video'].toLowerCase().trim() === 'yes' ? 1 : 0;
    }
    if (typeof row['ADD TO INSTAGRAM'] !== 'undefined') {
        isAddedToInstagram = row['ADD TO INSTAGRAM'].toLowerCase().trim() === 'yes' ? 1 : 0;
    }
    //
    // console.log(row);
    // return;

    const data = {
        date: date,
        winningEntryId: row['NUMBER'],
        websitePositionNumber: websitePositionNumber,
        isBlogAddedToWebsite: isBlogAddedToWebsite,
        isVideoOnYoutube: isVideoOnYoutube,
        isSocialMediaPosted: isSocialMediaPosted,
        isPrizeMoneyPaid: isPrizeMoneyPaid,
        isMailshotSent: isMailshotSent,
        isConsentSignedForPhotoAndVideo: isConsentSignedForPhotoAndVideo,
        isAddedToInstagram: isAddedToInstagram,
    }

    // console.log(data);
    // const dateObject = dateFormat.parse(format, date);
    // console.log(date, format, dateObject);
    console.log("bash post.sh '" + JSON.stringify(data).replace(/'{1}/g, "''") + "' /weekly_draw/create");
});
