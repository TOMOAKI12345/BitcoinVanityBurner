/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Asset = require('./asset.model');

exports.register = function(socket) {
  Asset.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Asset.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('asset:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('asset:remove', doc);
}