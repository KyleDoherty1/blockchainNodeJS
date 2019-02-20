const ChainUtil = require('../chain-util');

//Class for the vote object
class Vote {
  constructor() {
    this.id = ChainUtil.id();
    this.candidate = null;
  }

  //Create a new vote 
  static newVote(voterWallet, pollingStation, amount) {
    const vote = new this();

    //if the voter has used their 'coin' they cant vote
    if (amount > voterWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance.`);
      return;
    }

    //Vote will have a output
    vote.outputs.push(...[
      { amount: voterWallet.balance - amount, address: voterWallet.publicKey },
      { amount, address: pollingStation }
    ]);

    Vote.signVote(vote, voterWallet);

    return vote;
  }

  //Need to sign a vote with the timestamp, amount, address
  //and voters signature
  static signVote(vote, voterWallet){
    vote.input = {
      timestamp: Date.now(),
      amount: voterWallet.balance,
      address: voterWallet.publicKey,
      signature: voterWallet.sign(ChainUtil.hash(vote.outputs))
    }
  }

  //Verify a vote
  static verifyVote(vote){
    return ChainUtil.verifySignature(
      vote.input.address,
      vote.input.signature,
      ChainUtil.hash(vote.outputs)
    );
  }
}

module.exports = Vote;
