var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var makeOffer = require('../components/offers/create')
/* GET items listing. */
router.post('/', function(req, res, next) {
  console.log(req.body)
  makeOffer({
    partnerSteamId: req.body.partnerSteamId || "NULL",
    accessToken: req.body.accessToken || "NULL",
    itemsFromMe: req.body.itemsFromMe || {},
    itemsFromThem: req.body.itemsFromThem || {},
    message: req.body.message || "NULL"
  },function(error,id){
    if(id){
      res.status(200);
      console.log("BOT: OFERTA ENVIADA");
      res.send('Oferta Enviada');
    }else{
      res.status(400);
      res.send('Oferta Mal Formada')
      console.log("BOT: OFERTA NO ENVIADA");
    }
  });
});

module.exports = router;
