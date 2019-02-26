const Blockchain = require('./blockchain-classes/blockchain');

const blockchain = new Blockchain();

for(let i=0; i<10; i++)
{
    console.log(blockchain.addBlock(`1 vote for candidate ${i}`).toString());
}

// const Wallet = require('./wallet');
// const wallet = new Wallet();
// console.log(wallet.toString());