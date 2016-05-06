var express = require('express');
var router = express.Router();
var Item = require('../models/item');
/* GET items listing. */
router.get('/', function(req, res, next) {
  var page = parseInt(req.query.page || 1)
  Item.paginate({},{page: page, limit: 9, lean: true}, function(err,users){
    return res.end(JSON.stringify(users));
  });

});

module.exports = router;
