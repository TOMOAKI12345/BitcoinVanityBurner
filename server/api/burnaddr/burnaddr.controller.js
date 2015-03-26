'use strict';

var _ = require('lodash');
var Burnaddr = require('./burnaddr.model');
var bs58check = require('bs58check')
var base58 = require('bs58')
var crypto = require('crypto')
function sha256x2(buffer) {
  buffer = crypto.createHash('sha256').update(buffer).digest()
  return crypto.createHash('sha256').update(buffer).digest()
}

var hexToBytes =  function (hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return Buffer(bytes);
}

// Get list of burnaddrs
exports.index = function(req, res) {
  Burnaddr.find(function (err, burnaddrs) {
    if(err) { return handleError(res, err); }
    return res.json(200, burnaddrs);
  });
};

// Get a single burnaddr
exports.show = function(req, res) {
  Burnaddr.findById(req.params.id, function (err, burnaddr) {
    if(err) { return handleError(res, err); }
    if(!burnaddr) { return res.send(404); }
    return res.json(burnaddr);
  });
};

// Creates a new burnaddr in the DB.
exports.create = function(req, res) {
  var customAddress = req.body.name
  // regular address should start from "1"
  if(customAddress.slice(0, 1) != '1')customAddress = customAddress.replace(/^/, '1')
  // to base58 compatible
  customAddress = customAddress.replace(/l/g, 'L').replace(/I/g, 'L').replace(/0/g, 'Q').replace(/O/g, 'Q')
  // Address should be 34 characters
  while (customAddress.length <= 33) {
    customAddress += 'X';
  }
  while (customAddress.length > 34) {
    customAddress.substr(0, -1)
  }
// hash length should be 50 bytes
  var CAdecodedhex = Buffer(base58.decode(customAddress)).toString('hex')
  while(CAdecodedhex.length >= 52){
    CAdecodedhex =  Buffer(base58.decode(customAddress.slice(0, -1))).toString('hex')
  }
  while(CAdecodedhex.length <= 48){
    CAdecodedhex =  Buffer(base58.decode(customAddress + 'X')).toString('hex')
  }
// check sum
  var payload = CAdecodedhex.slice(0, -8)
  var sha256x2bytes = sha256x2(Buffer(hexToBytes(payload)))
  var checksum = sha256x2bytes.toString('hex').slice(0, 8)  //sha256x2 hex is the checksum for bitcoin address.
  var validCAhex = payload + checksum
  var validCAaddress = base58.encode(Buffer(hexToBytes(validCAhex)))
  Burnaddr.create({name: validCAaddress}, function(err, burnaddr) {
    if(err) { return handleError(res, err); }
    return res.json(201, burnaddr);
  });
};
// Updates an existing burnaddr in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Burnaddr.findById(req.params.id, function (err, burnaddr) {
    if (err) { return handleError(res, err); }
    if(!burnaddr) { return res.send(404); }
    var updated = _.merge(burnaddr, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, burnaddr);
    });
  });
};

// Deletes a burnaddr from the DB.
exports.destroy = function(req, res) {
  Burnaddr.findById(req.params.id, function (err, burnaddr) {
    if(err) { return handleError(res, err); }
    if(!burnaddr) { return res.send(404); }
    burnaddr.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
