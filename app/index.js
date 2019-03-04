const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain-classes/blockchain');
const P2PServer = require('./p2pServer');
const {TWILIO_SID, TWILIO_AUTH_TOKEN, PW} = require('../config');
var verifiedVoters = require('./verifiedVoters.json'); 
var WalletManager = require('../wallet/walletManager');
var nodemailer = require('nodemailer');
const client = require('twilio')(TWILIO_SID, TWILIO_AUTH_TOKEN);
var _ = require('underscore');
var Candidate = require('../election/candidate');
var Election = require('../election/election');
var election;
var candidates = [];

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

var walletManager = new WalletManager;

//Current routes atm, will try to move them to a routes.js soon
app.get('/voters', (req, res) => {
    res.json(verifiedVoters.voters);
});

app.post('/candidate', (req, res) => {
   // console.log(req.body);
    var x = new Candidate(req.body.name, req.body.party);
    candidates.push(x);
   // console.log(candidates);
    res.redirect('/candidates');
});

app.get('/candidates', (req, res) => {
    res.send(candidates);
});

app.post('/election', (req, res) => {
    // console.log(req.body);
     election = new Election(req.body.name, candidates);
     //candidates.push(x);
    // console.log(candidates);
     res.redirect('/election');
 });

 app.get('/election', (req, res) => {
    res.send(election);
});

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
    console.log(req.body.data);
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    p2pServer.updateChains();
    res.redirect('/blocks');
});

app.post('/verifypk', (req, res) => {

    if(walletManager.doesPkExist(req.body.pk))
    {
        console.log("true");
        res.send(true);
    }
    else
        console.log("false");

    res.end();
});

app.get('/newwallet/:email', (req, res) => {

     var email = req.params.email;
    console.log(email);
    var pk = walletManager.addWallet(email);
    console.log("PRIVATE KEY:  " + pk);
    var phone;
    //console.log(verifiedVoters,voters);

    function findVoter(element) { 
        if(element.email===email)
            return true;
    }

     var voter=_.find(verifiedVoters.voters, findVoter)
    // console.log(voter.phone);
    // var datagood = $.grep(verifiedVoters.voters, function (item) {
    //     return item.email.eqemail;
    // });

    // client.messages
    // .create({
    //     body: 'Your private key is: ' + pk,
    //     from: '+12533365589',
    //     to: '+'+voter.phone
    // })
    // .then(message => console.log(message.sid));
    
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
        text: ""+pk
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.send();
});


//Start the express server and p2p server
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();