const EC =  require('elliptic').ec;
const ec = new EC('secp256k1');

//Generates a keypair based on elipcital curve cryptography
class ChainUtil{
    static genKeyPair() {
      return ec.genKeyPair();
    } 
}

module.exports = ChainUtil;