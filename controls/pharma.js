const $ = require('axios');
// const drugNoInter = [8591, 151827, 6809, 221124];
// const drugInter = ["207106", "152923", "656659"]
// const leetest = [196503,202813]
// const leetest2 = [11289,17472]
// const leetest3 = [11289,32968,704,36437]
// Test calls ******************
//   ge/tDrugValue('sertraline')
//getInteractions(drugInter).then((results) => console.log(results));

// this checks for the drug name (including generic names) and retrieves rxNumber 
// - if it doesn't exist in the database, it throws an error
pharma = {
    getRxNorm: function (name) {
        return new Promise((resolve, reject) => {
            const baseURL = 'https://rxnav.nlm.nih.gov/REST/rxcui.json?name='
            $.get(baseURL + name)
            .then(res => {
                let drugValue;
                if(res.data.idGroup.rxnormId) {
                    drugValue = res.data.idGroup.rxnormId[0];
                    resolve({
                        name: name,
                        rxnorm_id: drugValue
                    });
                } else {
                    reject({error: "RxNorm ID not found"});
                }
            })
            .catch(error => {
                //unsuccesful - prompt user to re-enter drug name
                reject(error);
            });
        });
    },

    getAllRxNorms: function(nameArr) {
        return new Promise((resolve, reject) => {
            let promiseArr = nameArr.map(name => this.getRxNorm(name))
            Promise.all(promiseArr)
            .then(results => resolve(results))
            .catch(err => reject({error: "RxNorm IDs not found"}))
        });
    },  

    //A maximum of 50 identifiers is allowed
    getInteractions: function (listArray) { // expects listArray to be an array
        return new Promise((resolve, reject) => {
        const baseURL = 'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis='
        // TODO: validate array
        let listString = listArray[0];
        for (var i = 1; i < listArray.length; i++) {
            listString += '+' + listArray[i]
        }
        queryString = baseURL + listString;
        $.get(queryString)
            .then(res => {
                let interactionsArray = [];
                if (res.data.fullInteractionTypeGroup) {
                    for (var i = 0; i < res.data.fullInteractionTypeGroup.length; i++) {
                        for (var j = 0; j < res.data.fullInteractionTypeGroup[i].fullInteractionType.length; j++) {
                            for (var k = 0; k < res.data.fullInteractionTypeGroup[i].fullInteractionType[j].interactionPair.length; k++) {
                                interactionsArray.push(res.data.fullInteractionTypeGroup[i].fullInteractionType[j].interactionPair[k].description)
                            }
                        }
                    }
                }

                resolve(interactionsArray);
            })
            .catch(error => {
                //unsuccesful - declare error
                reject(error);
            });
        })
    },

    searchFDA: function(term) {
        term.toLowerCase();
        let termArr = term.split(" ");
        term = termArr.join('+');
        let queryURL = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${term}"+openfda.brand_name:"${term}"&limit=10`;
        return new Promise((resolve, reject) => {
            $.get(queryURL)
            .then(res => {
                let nameSearchArr = res.data.results.reduce((newArr, item) => {
                    let dosage;
                        if(item.dosage_forms_and_strengths) dosage = item.dosage_forms_and_strengths[0];
                        if(item.openfda.route) {
                            //ensure only unique results returned
                            let nameFilterArr = newArr.filter(
                                element => {
                                    return ( element.brand_name.toLowerCase().trim() === item.openfda.brand_name[0].toLowerCase().trim() &&
                                             element.route.toLowerCase().trim() === item.openfda.route[0].toLowerCase().trim() );
                                });
                            if(nameFilterArr.length === 0) {
                                newArr.push({
                                    brand_name: item.openfda.brand_name[0],
                                    generic_name: item.openfda.generic_name[0],
                                    substance: item.openfda.substance_name,
                                    route: item.openfda.route[0],
                                    dosage: dosage,
                                    openfda_id: item.id
                                });
                            }
                        }   
                    return newArr;
                }, []);
                resolve(nameSearchArr);
            }).catch(err => {
                console.log(err);
                reject({Error: "No Match"});
            });
        });//end promise
    },

    getFDAinfo: function(fdaID) {
        const queryURL = `https://api.fda.gov/drug/label.json?search=id:${fdaID}`;
        return new Promise((resolve, reject) => {
            $.get(queryURL)
            .then(res => {
                // console.log(res.data)
                const { 
                    indications_and_usage,
                    warnings,
                    overdosage,
                    stop_use,
                    do_not_use
                } = res.data.results[0];
                resolve({
                    brand_name: res.data.results[0].openfda.brand_name,
                    generic_name: res.data.results[0].openfda.generic_name,
                    indications_and_usage: indications_and_usage,
                    warnings: warnings,
                    stop_use: stop_use,
                    do_not_use: do_not_use,
                    overdosage: overdosage
                });
            }).catch(err => reject(console.log(err)));
        });
    }

}//end obj

module.exports = pharma;