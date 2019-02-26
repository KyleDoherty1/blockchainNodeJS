
var Wallet = require('./index');

class WalletManager{
    
    //Blockchains Constructor. An array called chains is made
    //with the Genisis block being the first block added
    constructor() {
        this.wallets = [];
    }
    

    addWallet(email){
        var wallet = new Wallet(email);
        //console.log(wallet);
        this.wallets.push(wallet);
        //console.log("PRIVATE KEY: " + wallet.keyPair.getPrivate());
        var pk =  wallet.keyPair.getPrivate();
        return pk;
    }

    getWallets(){
        return this.wallets;
    }

    getWalletByEmail(email){
        for (var i = 0; i <= this.wallets.length-1; i++) {
            //console.log(this.wallets[i].getEmail());
            if(this.wallets[i].getEmail() == email)
                return this.wallets[i];
         }
    }

    doesPkExist(pk){
        console.log(pk);
        for (var i = 0; i <= this.wallets.length-1; i++) {
            //console.log(this.wallets[i].getEmail());
            //console.log(this.wallets[i].keyPair.getPrivate());
            if(this.wallets[i].keyPair.getPrivate() == pk)
                return true;
         }
    }
}

module.exports = WalletManager;