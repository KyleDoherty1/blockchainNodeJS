const Vote = require('./vote');
const Wallet = require('./index');

describe('Vote', () => {
  let vote, voterWallet, pollingStation, amount;
  beforeEach(() => {
    voterWallet = new Wallet();
    amount = 1;
    pollingStation = 'r3c1p13nt';
    vote = Vote.newVote(voterWallet, pollingStation, amount);
  });

  it('ouputs the `amount` subtracted from the wallet balance', () => {
    expect(vote.outputs.find(output => output.address === voterWallet.publicKey).amount)
      .toEqual(voterWallet.balance - amount);
  });

  it('outputs the `amount` added to the recipient', () => {
    expect(vote.outputs.find(output => output.address === pollingStation).amount)
      .toEqual(amount);
  });

  it('inputs the balance of the wallet', () => {
    expect(vote.input.amount).toEqual(voterWallet.balance);
 });
 
 it('validates a valid vote', () => {
    expect(Vote.verifyVote(vote)).toBe(true);
 });

 it('invalidates a valid vote', () => {
  vote.outputs[0].amount = 5000;
  expect(Vote.verifyVote(vote)).toBe(false);
});
 

  describe('voting with an amount more than 1', () => {
    beforeEach(() => {
      amount = 2;
      vote = Vote.newVote(voterWallet, pollingStation, amount);
    });

    it('does not create the vote', () => {
      expect(vote).toEqual(undefined);
    });


});
});
