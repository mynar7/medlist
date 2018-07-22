const router = require('express').Router();
const passport = require('passport');

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', 
    passport.authenticate('google'), 
    (req, res) => {
    res.redirect('/medlistcontainer');
});

module.exports = router;