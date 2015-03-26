'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AssetSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Asset', AssetSchema);