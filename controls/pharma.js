const $ = require('axios');
const drugNoInter = [8591, 151827, 6809, 221124];
const drugInter = ["207106", "152923", "656659"]
const leetest = [196503,202813]
const leetest2 = [11289,17472]
const leetest3 = [11289,32968,704,36437]
// Test calls ******************
//   ge/tDrugValue('sertraline')
getInteractions(drugNoInter);

// this checks for the drug name (including generic names) and retrieves rxNumber 
// - if it doesn't exist in the database, it throws an error
function getDrugValue(name) {
    const baseURL = 'https://rxnav.nlm.nih.gov/REST/rxcui.json?name='
    $.get(baseURL + name)
        .then(res => {
            let drugValue = res.data.idGroup.rxnormId[0];
            //succesful - write drugValue into database
            console.log(drugValue)
        })
        .catch(error => {
            //unsuccesful - prompt user to re-enter drug name
            console.log('error')
        });
}

//A maximum of 50 identifiers is allowed
function getInteractions(listArray) { // expects listArray to be an array
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
            if (typeof res.data.fullInteractionTypeGroup != 'undefined') {
                for (var i = 0; i < res.data.fullInteractionTypeGroup.length; i++) {
                    for (var j = 0; j < res.data.fullInteractionTypeGroup[i].fullInteractionType.length; j++) {
                        for (var k = 0; k < res.data.fullInteractionTypeGroup[i].fullInteractionType[j].interactionPair.length; k++) {
                            interactionsArray.push(res.data.fullInteractionTypeGroup[i].fullInteractionType[j].interactionPair[k].description)
                        }
                    }
                }
            } else {
                interactionsArray.push('no interactions found')
            }
            console.log(interactionsArray)
        })
        .catch(error => {
            //unsuccesful - declare error
            console.log(error)
        });
}