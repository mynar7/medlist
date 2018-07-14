const router = require('express').Router();
const db = require('../models');

function checkAuth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).json({Error: "Unauthorized"});
    }
}

router.get('/test', checkAuth, (req, res) => {
    res.json(req.user);
})

module.exports = router;