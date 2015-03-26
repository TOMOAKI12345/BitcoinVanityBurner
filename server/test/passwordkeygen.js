/**
 * Created by TomoakiSato on 3/4/15.
 */
var bitcoin = require('bitcoinjs-lib')
var base58check = require('bs58check')
var base58 = require('bs58')
var cryptojs = require('cryptojs')
var forge = require('forge')
var hexToBytes =  function (hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return Buffer(bytes);
}
// this is the famous private key, but can not be imported to bitcoin client
var passphrase = 'test'
var sha256privatekey = bitcoin.crypto.sha256(passphrase)
var privatekeyHex = sha256privatekey.toString('hex').toUpperCase()
console.log(privatekeyHex)
// this is private key, wallet import format
// 0x80 + privatekeyhex + chekcksum
var privatekeyAndVersion = "80" + privatekeyHex
var firstSHA = bitcoin.crypto.sha256(hexToBytes(privatekeyAndVersion))
console.log('firstSHA ' + firstSHA.toString('hex'))
var secondSHA = bitcoin.crypto.sha256(Buffer(firstSHA))
console.log('secondSHA ' + secondSHA.toString('hex'))
var checksum = secondSHA.toString('hex').substr(0, 8).toUpperCase()
console.log(checksum)
var keywithChecksum = privatekeyAndVersion + checksum
console.log('keywithchecksum ' + keywithChecksum)
var privateKeyWIF = base58.encode(Buffer(hexToBytes(keywithChecksum)))
console.log('this is ' + passphrase + ' privatekeyWIF ' + privateKeyWIF)
// this is importable or not you can test from here. http://gobittest.appspot.com/PrivateKey

// So we are going to create public key from private key, bitcoin uses Eliptic Curve algorithm
//

//short way
// get eckey object for 2^256 private key WIF
var eckey = bitcoin.ECKey.fromWIF(privateKeyWIF)
// get pub
var publickey = eckey.pub
console.log('this is ' + passphrase + ' public key ' + publickey.toHex())
// get address 2^160
var bitcoinAddress  = eckey.pub.getAddress()
console.log('this is ' + passphrase +  ' address '+ bitcoinAddress )

// short way (compressed publickey )
eckey.compressed = true
var publicKeyHexCompressed = Crypto.util.bytesToHex(eckey.pub)
console.log(publicKeyHexCompressed)

// long way
var curve = bitcoin.getSECCurveByName("secp256k1") //found in bitcoinjs-lib/src/jsbn/sec.js
var hash160 = bitcoin.crypto.hash160(Buffer(hexToBytes(publickeyhex)))
//convert our random array or private key to a Big Integerconsole.log(hash160)
var privateKeyBN = BigInteger.fromByteArrayUnsigned(input)
var hash160bytes = hash160.toString('hex')
var payload = '00' + hash160bytes
var curvePt = curve.getG().multiply(privateKeyBN)
var sha256payload = bitcoin.crypto.sha256(bitcoin.crypto.sha256(payload));
var x = curvePt.getX().toBigInteger()
var checksum = sha256payload.slice(0, 4)
var y = curvePt.getY().toBigInteger()
var checksumbytes = checksum.toString('hex')
var publicKeyBytes = integerToBytes(x,32) //integerToBytes is found in bitcoinjs-lib/src/ecdsa.jsconsole.log(checksumbytes)
publicKeyBytes = publicKeyBytes.concat(integerToBytes(y,32))
var unencodedAddress = payload + checksumbytes;
publicKeyBytes.unshift(0x04)
console.log(unencodedAddress)
var publicKeyHex = Crypto.util.bytesToHex(publicKeyBytes)
var address = base58.encode(unencodedAddress);
console.log(address)
console.log(publicKeyHex)
var exWIF = 'KwMWvwRJeFqxYyhZgNwYuYjbQENDAPAudQx5VEmKJrUZcq6aL2pv'
var exPrivKey = bitcoin.ECKey.fromWIF(exWIF)
var exBuffer = exPrivKey.d.toBuffer(32)
//console.log( exPrivKey)
