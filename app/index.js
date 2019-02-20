const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain-classes/blockchain');
const P2PServer = require('./p2pServer');
const {TWILIO_SID, TWILIO_AUTH_TOKEN, PW} = require('../config');
var verifiedVoters = require('./verifiedVoters.json'); 
var WalletManager = require('../wallet/walletManager');
var nodemailer = require('nodemailer');
const client = require('twilio')(TWILIO_SID, TWILIO_AUTH_TOKEN);

//If there isnt a env variable passed into the npm run dev
//the default port is 3001.
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//Decalre the express server
const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Create the instance of the blockchain
const blockchain = new Blockchain;

//Create the instance if the P2P Server
const p2pServer = new P2PServer(blockchain);

var wallets = new WalletManager;

//Current routes atm, will try to move them to a routes.js soon
app.get('/voters', (req, res) => {
    res.json(verifiedVoters.voters);
});

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
    console.log(req.body.body);
    const block = blockchain.addBlock(req.body.body);
    console.log(`New block added: ${block.toString()}`);
    p2pServer.updateChains();
    res.redirect('/blocks');
});

app.post('/verifypk', (req, res) => {
    console.log(req.body.pk);
    console.log(wallets.getWallets);
});

app.get('/newwallet/:email', (req, res) => {

     var email = req.params.email;
    console.log(email);
    var pk = wallets.addWallet(email);
    console.log("PRIVATE KEY:  " + pk);
    var phone = req.body.data;

    client.messages
    .create({
        body: 'Your private key is: ' + pk,
        from: '+12533365589',
        to: '+353831362447'
    })
    .then(message => console.log(message.sid));
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kyledoherty1@gmail.com',
          pass: PW
        }
      });
      
      var mailOptions = {
        from: 'kyledoherty1@gmail.com',
        to: email,
        subject: 'Private Key',
        text:  ""+pk
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
});


//Start the express server and p2p server
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();