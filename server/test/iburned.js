var bs58check = require('bs58check')
var base58 = require('bs58')
var crypto = require('crypto')
var bitcoin = require('bitcoinjs-lib')
var customAddress = '1t'

while (customAddress.length <= 33) {
    customAddress += 'X';
}
while (customAddress.length > 34) {
    customAddress.substr(0, -1)
}
var hexToBytes =  function (hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return Buffer(bytes);
}
// hash length check
console.log(customAddress)
var CAdecodedhex = Buffer(base58.decode(customAddress)).toString('hex')
console.log(CAdecodedhex.length)
while(CAdecodedhex.length >= 52){
  CAdecodedhex =  Buffer(base58.decode(customAddress.slice(0, -1))).toString('hex')
}
while(CAdecodedhex.length <= 48){
  CAdecodedhex =  Buffer(base58.decode(customAddress + 'X')).toString('hex')
}
console.log(CAdecodedhex.length)

var payload = CAdecodedhex.slice(0, -8)
var sha256x2bytes = sha256x2(Buffer(hexToBytes(payload)))
var checksum = sha256x2bytes.toString('hex').slice(0, 8)  //sha256x2 hex is the checksum for bitcoin address.
var validCAhex = payload + checksum
var validCAaddress = base58.encode(Buffer(hexToBytes(validCAhex)))
console.log(validCAhex + ' ' + validCAaddress)

console.log(validCAhex + ' ' +  payload + ' ' + checksum)
console.log(validCAaddress)
console.log(bitcoin.Address.fromBase58Check(validCAaddress))
function sha256x2(buffer) {
  buffer = crypto.createHash('sha256').update(buffer).digest()
  return crypto.createHash('sha256').update(buffer).digest()
}
