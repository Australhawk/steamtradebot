var Item = require('../../models/item');
var SteamTradeOffers = require('steam-tradeoffers');
var offers = new SteamTradeOffers();
function offerClient(sessionID,cookies,webAPIKey){
  offers.setup({
    sessionID: sessionID,
    webCookie: cookies,
    APIKey: webAPIKey,
    timeout: 30000
  })
  console.log("BOT: Steam Offers Setup!")
  offers.loadMyInventory({appId: 570, contextId: 2}, function(err,objects){
    updateItems(0,objects,function(){
        console.log("BOT: Updated Items");
    });
  });
}

function updateItems(i,objects,callback){
  if(i < objects.length){
    var object = objects[i];
    var item = new Item(object);
    var query = {id: object.id};
    Item.findOne(query,function(err,doc){
      if(doc){
        Item.update({id: object.id}, object);
        //console.log("ITEM ",object.id, " UPDATED");
      }else{
        item.save();
        //console.log("ITEM ",object.id, " SAVED");
      }
      updateItems(i+1,objects,callback);
    });
  }else{
    callback();
  }
}
exports.offerClient = offerClient
exports.offers = offers
