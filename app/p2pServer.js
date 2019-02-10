const Websocket = require('ws');

//Check the enviroment variables and if one called P2P_PORT
//exists, use it, otherwise set to 50001
const P2P_PORT = process.env.P2P_PORT || 5001;

//Set peers to the ones stated in the startup, otherwise set it
//to an empty array. The peers are set by WS://localhost:5001, 
//ws//localhost:5002,etc, so split(',') will seperate them

const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

// *******************************

//P2PServer class is passed 1 piece of data which is a blockchain
//Each  server will have its own blockchain
//This way each will have their own chain and sync it with the other servers
class P2PServer{
    constructor(blockchain){
        this.blockchain = blockchain;
        this.connectedSockets = [];
    }

    //Starts the server and listens for connections
    listen(){
        //Create the server with the static server method.
        const server = new Websocket.Server({ port: P2P_PORT});

        //Event Listener. Listens for incoming messages sent to the server
        //This is listening for the connection event and fires off
        //connectSocket() with the socket thats trying to connect
        server.on('connection', socket => this.connectSocket(socket));

        //This server needs to connect to any peers that are
        //already running
        this.connectToPeers();
        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
    }

    connectToPeers(){
        //This methods goes through each peer in the peers[] array
        //It creates a socket for each peer. These peer servers
        //may not have been started yet so a listener for the
        //'on' event is added so we connect to it when it starts
        peers.forEach(peer => {
            const socket = new Websocket(peer);

            socket.on('open', () => this.connectSocket(socket));
        });
    }

    //Added the socket to the sockets array
    connectSocket(socket){
        this.connectedSockets.push(socket);
        console.log('Socket connected')

        //For every peer thats connected to this peer,
        //we will listen for a message event and replace our
        //blockchain if its valid to do so
        socket.on('message', message => {
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data);
        });

        //This sends a message to connected peers of its current blockchain
        //Basically the above .on method listens for this method
        socket.send(JSON.stringify(this.blockchain.chain));
    };

    updateChains(){
        this.connectedSockets.forEach(socket => socket.send(JSON.stringify(this.blockchain.chain)))
    }
    
}

module.exports = P2PServer;