var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var ItemSchema = new mongoose.Schema({
  id: String,
  classid: String,
  instanceid: String,
  amount: String,
  pos: Number,
  appid: String,
  icon_url: String,
  icon_url_large: String,
  icon_drag_url: String,
  name: String,
  market_hash_name: String,
  market_name: String,
  name_color: String,
  background_color: String,
  type: String,
  tradable: Number,
  marketable: Number,
  commodity: Number,
  market_tradable_restriction: String,
  market_marketable_restriction: String,
  active: Boolean
});
ItemSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Item', ItemSchema);
