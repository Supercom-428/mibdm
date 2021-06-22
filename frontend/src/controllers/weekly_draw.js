'use strict';

const axios = require('axios');

exports.showCreateDraw = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const draw = await axios.get(process.env.API_URL + '/weekly_draw/next', config)
        .then(async result => {
            if (typeof result.data.draw !== 'undefined') {
                return result.data.draw;
            }
            return {};
        });

    res.render('draw', {
        user: req.session.user,
        title: 'Run Weekly Draw',
        draw: draw
    });
};

exports.run = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    try {
        const data = await axios.post(process.env.API_URL + '/weekly_draw/generateWinner', {
            drawId: req.body.drawId,
        }, config).then(result => {
            return result.data;
        });
        res.send(JSON.stringify(data));
    } catch(e) {
        console.log(e);
        next(e);
    }
};

exports.getAll = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const draws = await axios.get(process.env.API_URL + '/weekly_draw/list', config)
        .then(async result => {
            let rows = [];
            await result.data.models.forEach(row => {
                rows.push({
                    drawId: row.drawId,
                    date: row.date,
                    winningEntryId: row.winningEntryId,
                    firstName: row.winningEntry !== null ? row.winningEntry.drawEntrant.firstName : null,
                    lastName: row.winningEntry !== null ? row.winningEntry.drawEntrant.lastName : null,
                    websitePositionNumber: row.websitePositionNumber,
                    isBlogAddedToWebsite: row.isBlogAddedToWebsite ? 'Yes' : 'No',
                    isVideoOnYoutube: row.isVideoOnYoutube ? 'Yes' : 'No',
                    isSocialMediaPosted: row.isSocialMediaPosted ? 'Yes' : 'No',
                    isPrizeMoneyPaid: row.isPrizeMoneyPaid ? 'Yes' : 'No',
                    isMailshotSent: row.isMailshotSent ? 'Yes' : 'No',
                    isConsentSignedForPhotoAndVideo: row.isConsentSignedForPhotoAndVideo ? 'Yes' : 'No',
                    isAddedToInstagram: row.isAddedToInstagram ? 'Yes' : 'No',
                });
            });
            return rows;
        });
    res.render('datatable', {
        datatable: true,
        user: req.session.user,
        title: 'Weekly Draws',
        data: draws,
        sort_column: 1,
        sort_direction: "desc",
        export_filename: "weekly_draws",
        columns: [
            'Draw ID',
            'Date',
            'Winning Number',
            'First Name',
            'Last Name',
            'Website Position Number',
            'Added To Website?',
            'Video On YouTube?',
            'Social Media Posted?',
            'Prize Money Paid?',
            'Mailshot Sent?',
            'Consent For Photo &amp; Video?',
            'Added To Instagram?',
        ],
    });
};
