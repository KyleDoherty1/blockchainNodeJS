const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain-classes/blockchain');
const P2PServer = require('./p2pServer');

//If there isnt a env variable passed into the npm run dev
//the default port is 3001.
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//Decalre the express server
const app = express();
app.use(bodyParser.json());

//Create the instance of the blockchain
const blockchain = new Blockchain;

//Create the instance if the P2P Server
const p2pServer = new P2PServer(blockchain);

//Current routes atm, will try to move them to a routes.js soon
app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    p2pServer.updateChains();
    res.redirect('/blocks');
});

//Start the express server and p2p server
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();