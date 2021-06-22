'use strict';

const DrawEntry = require('../models').drawEntries;
const WeeklyDrawEntries = require('../models').weeklyDrawEntries;
const WeeklyDraw = require('../models').weeklyDraw;
const Settings = require('../models').settings;
const Helper = require('../helpers/controller');

exports.getData = async (req, res) => {
    var entries = [];
    // we want a list of all of the draws for the filtering
    const draws = await WeeklyDraw.findAll({include: [{all: true, nested: true}]});

    // take the draws data and generate some filters from it
    let filters = {
        years: {},
        dates: {},
    };
    draws.forEach((draw, index) => {
        const dateParts = draw.date.split('-');
        const year = dateParts[0],
            month = parseInt(dateParts[1]),
            day = parseInt(dateParts[2]);
        if (typeof filters.years[year] === 'undefined') {
            filters.years[year] = {};
        }
        if (typeof filters.years[year][month] === 'undefined') {
            filters.years[year][month] = {};
        }
        let friendlyDate = day.toString().padStart(2, '0') + '/' + month.toString().padStart(2, '0') + '/' + year;
        filters.years[year][month][friendlyDate] = index;
        filters.dates[friendlyDate] = index;
    });

    // we want all of the draw entries and the draws they have been entered into
    DrawEntry.hasMany(WeeklyDrawEntries, {sourceKey: 'entryNumber', foreignKey: 'entryId'});

    if ( req.params.id == 0 ){
        entries = await DrawEntry.findAll({include: [{all: true, nested: true}]});
    } else {
        entries = await DrawEntry.findAll({
            where: {
                status: '2',
            },
            include: [{all: true, nested: true}]
        });
    }

    // get the user settings if they exist
    const UserSettings = await Settings.findOne({
        userId: req.user.userId,
        code: 'master_view',
    });

    // build the result data
    const resultData = {
        draws: {
            count: Object.keys(draws).length,
            data: draws,
            filters: filters,
        },
        entries: {
            count: Object.keys(entries).length,
            data: entries,
        },
        defaultSettings: {},
    };

    if (UserSettings) {
        resultData.defaultSettings = UserSettings.settings.toString('utf8');
    }

    Helper.sendResult(res, true, resultData);
};
