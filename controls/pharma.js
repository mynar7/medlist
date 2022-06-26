const $ = require('axios');

// turn off SSL enforcement hack for FDA's expired cert
const https = require('https');
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
})

// this checks for the drug name (including generic names) and retrieves rxNumber
// - if it doesn't exist in the database, it throws an error
module.exports = {
    getRxNorm: function (name) {
        return new Promise((resolve, reject) => {
            const baseURL = 'https://rxnav.nlm.nih.gov/REST/rxcui.json?name='
            $.get(baseURL + name, { httpsAgent })
                .then(res => {
                    let drugValue;
                    if (res.data.idGroup.rxnormId) {
                        drugValue = res.data.idGroup.rxnormId[0];
                        resolve({
                            name: name,
                            rxnorm_id: drugValue
                        });
                    } else {
                        reject({ error: "RxNorm ID not found" });
                    }
                })
                .catch(error => {
                    //unsuccesful - prompt user to re-enter drug name
                    reject(error);
                });
        });
    },

    getAllRxNorms: function (nameArr) {
        return new Promise((resolve, reject) => {
            let promiseArr = nameArr.map(name => this.getRxNorm(name))
            Promise.all(promiseArr)
                .then(results => resolve(results))
                .catch(err => reject({ error: "RxNorm IDs not found" }))
        });
    },

    //A maximum of 50 identifiers is allowed
    getInteractions: async function (rxcuis) {
        const url = 'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis='
        const response = await $.get(url + rxcuis.join('+'), { httpsAgent })
        const { fullInteractionTypeGroup } = response.data
        if (!fullInteractionTypeGroup || !fullInteractionTypeGroup.length)
            return []
        const [{ fullInteractionType }] = fullInteractionTypeGroup
        const interactionPairs = fullInteractionType
            .map(({
                interactionPair: [
                    { description, severity, interactionConcept }
                ] }) => ({
                    description,
                    severity,
                    source: interactionConcept
                }))
        return interactionPairs
    },

    searchFDA: async function (term) {
        try {
            term = term.toLowerCase().split(" ").join('+')
            // let termArr = term.split(" ");
            // term = termArr.join('+');
            let queryURL = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${term}"+openfda.brand_name:"${term}"&limit=10`;
            const res = await $.get(queryURL, { httpsAgent })
            let nameSearchArr = res.data.results.reduce((newArr, item) => {
                let dosage;
                if (item.dosage_forms_and_strengths)
                    dosage = item.dosage_forms_and_strengths[0];
                if (item.openfda.route) {
                    //ensure only unique results returned
                    let nameFilterArr = newArr.filter(
                        element => {
                            return (element.brand_name.toLowerCase().trim() === item.openfda.brand_name[0].toLowerCase().trim() &&
                                element.route.toLowerCase().trim() === item.openfda.route[0].toLowerCase().trim());
                        });
                    if (nameFilterArr.length === 0) {
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
            return nameSearchArr;
        } catch (err) {
            return []
        }
    },

    getFDADetails: function (fdaID) {
        const queryString = `https://api.fda.gov/drug/label.json?search=id:${fdaID}`;
        return new Promise((resolve, reject) => {
            $.get(queryString, { httpsAgent })
                .then(res => resolve(res.data.results[0]))
                .catch(err => { reject({ Error: "Details not found" }) })
        })
    },

    getFDAinfo: async function (fdaID) {
        try {
            const queryURL = `https://api.fda.gov/drug/label.json?search=id:${fdaID}`;
            const res = await $.get(queryURL, { httpsAgent })
            const {
                indications_and_usage,
                dosage_forms_and_strengths,
                dosage_and_administration,
                warnings,
                overdosage,
                stop_use,
                do_not_use,
                openfda: {
                    brand_name,
                    generic_name
                }
            } = res.data.results[0];
            return {
                brand_name,
                generic_name,
                indications_and_usage,
                dosage_forms_and_strengths,
                dosage_and_administration,
                warnings,
                stop_use,
                do_not_use,
                overdosage
            };
        } catch(err) {
            return {}
        }
    }
}