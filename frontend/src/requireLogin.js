module.exports = (req, res, next) => {
    if (!req.session || !req.session.token) {
        res.redirect('/login');
    } else {
        next();
    }
};
