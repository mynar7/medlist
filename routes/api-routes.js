const router = require('express').Router();
const pharma = require('../controls/pharma');
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
//test route for rxnorm id 
router.get('/rxnorm/:med', (req, res) => {
    pharma.getRxNorm(req.params.med)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

router.get('/rxnorms/:meds', (req, res) => {
    let meds = req.params.meds.split("+");
    pharma.getAllRxNorms(meds)
    //debug .then to give interactions off of rxnorm_ids
    // .then(result => pharma.getInteractions(result.map(x => x.rxnorm_id)))
    .then(result => res.json(result) )
    .catch(err => res.json(err) );
});

router.get('/medsearch/:med', (req, res) => {
    pharma.searchFDA(req.params.med)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

module.exports = router;