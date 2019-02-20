
var Wallet = require('./index');

class WalletManager{
    
    //Blockchains Constructor. An array called chains is made
    //with the Genisis block being the first block added
    constructor() {
        this.wallets = [];
    }
    

    addWallet(email){
        var wallet = new Wallet(email);
        console.log(wallet);
        this.wallets.push(wallet);
        console.log("PRIVATE KEY: " + wallet.keyPair.getPrivate());
        var pk =  wallet.keyPair.getPrivate();
        return pk;
    }

    getWallets(){
        return this.wallets;
    }
}

module.exports = WalletManager;