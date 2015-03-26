// this test using this one http://procbits.com/2013/08/27/generating-a-bitcoin-address-with-javascript
var Crypto = require("crypto")
var Bitcoin = require('bitcoinjs-lib');
var randArr = new Crypto.randomBytes(32) // create a typed array of 32 bytes

//some bitcoin and crypto methods don't like Uint8Array for input. They expect regular JS arrays
var privateKeyBytes = []
for (var i = 0; i < randArr.length; i++) privateKeyBytes[i] = randArr[i]

//hex string of our private key
var privateKeyHex = privateKeyBytes.toString('hex').toUpperCase()
console.log(privateKeyHex)

// wallet import format
// this is base58 encoding of 0x80 + private key + checksum
var privateKeyAndVersion = "80" + privateKeyHex
var firstSHA = Crypto.SHA256(privateKeyAndVersion.toString('hex'));
var secondSHA = Crypto.SHA256(firstSHA);
var checkSum = secondSHA.substr(0, 8).toUpperCase()
console.log(checkSum);

// append checksum to end of the private key and version
// currently the key  =  version + privateKeyHex + checksum
var keyWithChecksum = privateKeyAndVersion + checkSum
console.log(keyWithChecksum)

var privateKeyWif = Bitcoin.Base58.encode(Crypto.util.hexToBytes(keyWithChecksum))

// Much easier version.recall, "privateKeyBytes" is an array of random numbers
var privateKeyWIF = new Bitcoin.Address(privateKeyBytes)
privateKeyWIF.version = 0x80 //0x80 = 128, https://en.bitcoin.it/wiki/List_of_address_prefixes
privateKeyWIF = privateKeyWIF.toString()
console.log(privateKeyWIF) // same result will be shown. "5Hx15HFGyep2CfPxsJKe2fXJsCVn5DEiyoeGGF6JZjGbTRnqfiD"

var curve = getSECCurveByName("secp256k1")
// convert our random array or private key to a biginteger
var privateKeyBN = BigInteger.fromByteArrayUnsigned(input)
var curvePt = curve.getG().multiply(privateKeyBN)
var x = curvePt.getX().toBigInteger()
var y = curvePt.getY().toBigInteger()
var publicKeyBytes = Bitcoin.ecdsa.integerToBytes(x, 32)
publicKeyBytes = publicKeyBytes.concat(integerToBytes(y, 32))
publicKeyBytes.unshift(0x04)
console.log(publicKeyBytes);
var publicKeyHex = Crypto.util.bytesToHex(publicKeyBytes)
console.log(publicKeyHex)


//could use publicKeyBytesCompressed as well
var hash160 = Crypto.RIPEMD160(Crypto.util.hexToBytes(Crypto.SHA256(publicKeyBytes)))
console.log(hash160) //"3c176e659bea0f29a3e9bf7880c112b1b31b4dc8" 40 hex 20 bytes

var version = 0x00 //if using testnet, would use 0x6F or 111. 0x00 is mainnet
var hashAndBytes = Crypto.util.hexToBytes(hash160)
hashAndBytes.unshift(version)

var doubleSHA = Crypto.SHA256(Crypto.util.hexToBytes(Crypto.SHA256(hashAndBytes)))
var addressChecksum = doubleSHA.substr(0,8)
console.log(addressChecksum) //26268187

var unencodedAddress = "00" + hash160 + addressChecksum // 25bytes binary address.

console.log(unencodedAddress)
/* output
 003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187 this is the
 */
var address = Bitcoin.Base58.encode(Crypto.util.hexToBytes(unencodedAddress))
console.log(address) //16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS

var addressFromPassphrase = function(passphrase){
  var privateKeyHex = Crytpo.util.SHA256(Crypto.util.hexToBytes(Crypto.util.SHA256(passphrase)))
  var privateKeyBytes = Crypto.util.hexToBytes(privateKeyHex);

}
