var offerClient = require('../offers/index').offers
function makeOffer(options,callback){
  offerClient.makeOffer(options,callback);
}

module.exports = makeOffer
