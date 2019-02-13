const ChainUtil = require('../chain-util');
//Inintial balanace set to 1 = 1 vote
const INITIAL_BALANCE = 1;

//Each voter gets a wallet with 1 'coin', a public and
//private key
class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  //String representation of wallet
  toString() {
    return `Wallet -
    publicKey : ${this.publicKey.toString()}
    balance   : ${this.balance}`
  }
}

module.exports = Wallet;
