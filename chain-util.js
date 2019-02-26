const EC =  require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const uuidV1 = require('uuid/v1');
const ec = new EC('secp256k1');

//Generates a keypair based on elipcital curve cryptography
class ChainUtil{
    static genKeyPair() {
      return ec.genKeyPair();
    } 

    static id(){
        return uuidV1();
    }

    static hash(data){
        return SHA256(JSON.stringify(data)).toString();
    }

    static verifySignature(publicKey, signature, dataHash){
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }

    static extractPrivateKey(keyPair)
	{
		var temp = JSON.parse(JSON.stringify(keyPair));
		var key=temp.priv;
		const privateKeyPair = ec.keyFromPrivate(key);
		return privateKeyPair;
	} 
}

module.exports = ChainUtil;