const SHA256 = require('crypto-js/sha256');
const {MiningDifficulty} = require('../config');
class Block{
    //Single Block Constructor
    // --timestamp (When the block is created)
    // --lastHash (The hash value of the last block. If it's the first 
    //             block it will take the hash of the genesis block)
    // --hash (This blocks hash)
    // --data (Data that will be stored in the blockchain. In this case
    //          votes)
    constructor(timestamp, lastHash, hash, data, nonce){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    //Retrun a string reprensatation of the block
    toString(){
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash}
            Hash     : ${this.hash}
            Nonce    : ${this.nonce}
            Data     : ${this.data}`
    }

    //Static method for creating the true first block. Since
    //the a block need a lastHash, the gensesis blocks hash will
    //be used if none other exists
    static genesisBlock(){
        return new this('Genesis Time', '**null**', '**KD-LyIt**', [], 0);
    }

    //Static method to mine a block into the blockchain
    static mineBlock(lastBlock, data){
        let timestamp;
        const lastHash = lastBlock.hash;
        let nonce = 0;
        //const hash = Block.generateHash(timestamp, lastHash, data, nonce);
        return Block.proofOfWork(nonce, timestamp, lastHash, data)
    }

    //Proof of Work method to make sure the hash is correct
    static proofOfWork(nonce, timestamp, lastHash, data){
        let hash;
        do{
            nonce++;
            timestamp = Date.now();
            hash = Block.generateHash(timestamp, lastHash, data, nonce)
        }while(hash.substring(0, MiningDifficulty) !== '0'.repeat(MiningDifficulty))

        return new this(timestamp, lastHash, hash, data, nonce);
    }

    //Uses the CONST SHA256 created at the top to create a one-way
    //hash of the current block by taking in its data and running
    //it through the hashing algorithm
    static generateHash(timestamp, lastHash, data, nonce){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static getBlockHash(block){
        const { timestamp, lastHash, data, nonce } = block;
        return Block.generateHash(timestamp, lastHash, data, nonce);
    }
}

module.exports = Block;