const router = require('express').Router();
const pharma = require('../controls/pharma');
const db = require('../models');

//middleware for protecting routes
function checkAuth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).json({
            Error: "Unauthorized"
        });
    }
}


//test route: check auth
router.get('/test', checkAuth, (req, res) => {
    res.json(req.user);
})

//test route: get rxnorm id 
router.get('/rxnorm/:med', (req, res) => {
    pharma.getRxNorm(req.params.med)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

//test route: give meds as /rxnorms/med1+med2+med3 and get reactions back in array
router.get('/rxnorms/:meds', (req, res) => {
    let meds = req.params.meds.split("+");
    pharma.getAllRxNorms(meds)
        //debug .then to give interactions off of rxnorm_ids
        .then(result => pharma.getInteractions(result.map(x => x.rxnorm_id)))
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

router.get('/infomed/:med', (req, res) => {
    pharma.searchFDA(req.params.med)
        .then(result => {
            // console.log(result[0].openfda_id);
            return pharma.getFDAinfo(result[0].openfda_id);
        })
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

router.get('/medInfo/:FDAId', (req, res) => {
    pharma.getFDAinfo(req.params.FDAId)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


//find med in FDA db

// ADD BACK IN CHECKAUTH
router.get('/searchMed/:med', checkAuth, (req, res) => {
    pharma.searchFDA(req.params.med)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

//delete user
router.delete('/removeuser', checkAuth, (req, res) => {
    db.User.destroy({
            where: {
                id: req.user.id,
            }
        })
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

//get one med

//joined substances for contents of med
//joined dose_times for dosages
router.get('/med/:medId', checkAuth, (req, res) => {
    db.Med.findOne({
            where: {
                UserId: req.user.id,
                id: req.params.medId
            },
            include: [{
                    model: db.Substance,
                    as: "substances"
                },
                {
                    model: db.Dose_Time,
                    as: "dose_times"
                }
            ]
        }).then(results => res.json(results))
        .catch(err => res.json(err));
});

//delete one med

router.delete('/med/:medId', checkAuth, (req, res) => {
    db.Med.destroy({
            where: {
                UserId: req.user.id,
                id: req.params.medId
            }
        }).then(results => res.json(results))
        .catch(err => res.json(err));
});


//get all meds without doses

router.get('/allMeds', checkAuth, (req, res) => {
    db.Med.findAll({
            where: {
                UserId: req.user.id,
            }
        }).then(results => res.json(results))
        .catch(err => res.json(err));
});

//get all user's meds

//joined substances for contents of med
//joined dose_times for dosages
router.get('/allMeds/more', checkAuth, (req, res) => {
    db.Med.findAll({
            where: {
                UserId: req.user.id,
            },
            include: [{
                    model: db.Substance,
                    as: "substances"
                },
                {
                    model: db.Dose_Time,
                    as: "dose_times"
                }
            ]
        }).then(results => res.json(results))
        .catch(err => res.json(err));
});

//get interactions

router.get('/interactions', checkAuth, (req, res) => {
    db.Substance.findAll({
            where: {
                UserId: req.user.id,
            }
        }).then(results => {
            console.log(results.length);
            let rxnorm_ids = results.map(substance => substance.rxnorm_id);
            return pharma.getInteractions(rxnorm_ids);
        }).then(results => res.json(results))
        .catch(err => res.json(err));
});

//add a med 
router.post('/addMed', checkAuth, (req, res) => {
    let substances = req.body.substance;
    Promise.all([
            //convert substances to rxnormids
            pharma.getAllRxNorms(substances),
            //add med to DB
            db.Med.create({
                //manually inserting id here so that I can test without a frontend
                UserId: req.user.id,
                brand_name: req.body.brand_name,
                generic_name: req.body.generic_name,
                // note: req.body.note,
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
                    MedId: result[1].id,
                    UserId: req.user.id,
                });
            });
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

//get doses
router.get('/doses/:medId', checkAuth, (req, res) => {
    db.Dose_Time.findAll({
        where: {
            MedId: req.params.medId
        }
    }).then(result => {
        let sortedResults = result.sort((a, b) => {
            let aTimeArr = a.time.split(":");
            let bTimeArr = b.time.split(":");
            let aHour = aTimeArr[0];
            let bHour = bTimeArr[0];
            return parseInt(aHour) - parseInt(bHour);
        })
        res.json(sortedResults)
    })
    .catch(err => res.json(err));
});


//add a dosage and time to administer
router.post('/addDose/:medId', (req, res) => {
    db.Dose_Time.create({
            UserId: req.user.id,        
            MedId: req.params.medId,
            time: req.body.time,
            dose: req.body.dose,
            note: req.body.note
        }).then(result => res.json(result))
        .catch(err => res.json(err));
});

//delete one dose/time

router.delete('/dose/:doseId', checkAuth, (req, res) => {
    db.Dose_Time.destroy({
            where: {
                UserId: req.user.id,
                id: req.params.doseId
            }
        }).then(results => res.json(results))
        .catch(err => res.json(err));
});

//get a schedule
router.get('/schedule', checkAuth, (req, res) => {
    db.Dose_Time.findAll({
            where: {
                UserId: req.user.id,
            },
            include: [{
                model: db.Med
            }]
        }).then(result => {

            let groupedByTime = result.reduce((newArr, dose) => {
                //find if we've started a group at this time
                let timeObj = newArr.find(x => x.time === dose.time)
                //push data to that group
                if (timeObj) {
                    timeObj.meds.push({
                        doseId: dose.id,
                        dose: dose.dose,
                        note: dose.note,
                        med: dose.Med
                    })
                    //if there's no group at this time, create one and push
                } else {
                    newArr.push({
                        time: dose.time,
                        meds: [{
                            doseId: dose.id,
                            dose: dose.dose,
                            note: dose.note,
                            med: dose.Med
                        }]
                    })
                }
                return newArr;
            }, []);
            //sort results by time
            groupedByTime.sort((a, b) => {
                let aTime = a.time.split(":");
                let bTime = b.time.split(":");
                let aHour = parseInt(aTime[0]);
                let bHour = parseInt(bTime[0]);
                let aMin = parseInt(aTime[1]);
                let bMin = parseInt(bTime[1]);
                if (aHour === bHour) {
                    return aMin - bMin;
                } else {
                    return aHour - bHour;
                }
            });
            res.json(groupedByTime);
        })
        .catch(err => res.json(err));
});

//get a schedule
router.put('/dose/:doseId', checkAuth, (req, res) => {
    db.Dose_Time.update({
            time: req.body.time,
            dose: req.body.dose,
            note: req.body.note
        }, {
            returning: true,
            where: {
                UserId: req.user.id,
                id: req.params.doseId
            }
        })
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

module.exports = router;