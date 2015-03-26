/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Burnaddr = require('./burnaddr.model');

exports.register = function(socket) {
  Burnaddr.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Burnaddr.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('burnaddr:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('burnaddr:remove', doc);
}