const ChainUtil = require('../chain-util');
const Vote = require('./vote');

//Inintial balanace set to 1 = 1 vote
const INITIAL_BALANCE = 1;

//Each voter gets a wallet with 1 'coin', a public and
//private key
class Wallet {
  constructor(email) {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
    this.privateKey = ChainUtil.extractPrivateKey(this.keyPair);
    this.email = email;
  }

  //String representation of wallet
  toString() {
    return `Wallet -
    email     : ${this.email}
    publicKey : ${this.publicKey.toString()}
    privateKey: ${this.privateKey.toString()}
    balance   : ${this.balance}`
  }

  sign(dataHash){
    return ec.sign(dataHash);
  }

  createVote(recipient, amount, pkEntered){
    if(pkEntered == this.privateKey && this.balance == 1){
      var vote = Vote.newVote(this, recipient, amount);
      this.balance -= 1;
    }
      
  }

  getPK(){
    return this.privateKey;
  }

  getEmail(){
    return this.email;
  }

}

module.exports = Wallet;
