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

//give meds as /rxnorms/med1+med2+med3 and get reactions back in array
router.get('/rxnorms/:meds', (req, res) => {
    let meds = req.params.meds.split("+");
    pharma.getAllRxNorms(meds)
    //debug .then to give interactions off of rxnorm_ids
        .then(result => pharma.getInteractions(result.map(x => x.rxnorm_id)))
        .then(result => res.json(result) )
        .catch(err => res.json(err) );
});

//find med in FDA db
router.get('/medsearch/:med', (req, res) => {
    pharma.searchFDA(req.params.med)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

//add a med
router.post('/addmed', (req, res) => {
    let substances = req.body.substance;
    Promise.all([
        //convert substances to rxnormids
        pharma.getAllRxNorms(substances),
        //add med to DB
        db.Med.create({
            //manually inserting id here so that I can test without a frontend
            UserId: process.env.TEST_ID, //req.user.id,
            brand_name: req.body.brand_name,
            generic_name: req.body.generic_name,
            user_name: req.body.user_name,
            openFDA_id: req.body.openfda_id
        })
    ])
    //result returns as an array [0] is rxnorm results, [1] the created Med result
    .then(result => {
        //add MedId foreign key to substances results
        let bulkSubstances = result[0].map(x => {
            return ({
                rxnorm_id: x.rxnorm_id,
                name: x.name,
                MedId: result[1].id
            });
        })
        //bulk insert those substances into db under added med's ID
        //return "db.Substance.bulkCreate(bulkSubstances)" also works,
        //but will only return result of bulkInsert, and not previous result
        return new Promise((resolve, reject) => {
            db.Substance.bulkCreate(bulkSubstances)
                //"[result[1], result2]" gives "[added med from previous insert, [ added substances] ]"
                //back to client in json. 
                .then(result2 => resolve([result[1], result2]))
                .catch(err => reject(err));
        });
    }).then(result => res.json(result))
    .catch(err => res.json(err));
});

//get a schedule
// router.get()

module.exports = router;