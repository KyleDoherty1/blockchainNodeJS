const SHA256 = require('crypto-js/sha256');

class Block{
    //Single Block Constructor
    // --timestamp (When the block is created)
    // --lastHash (The hash value of the last block. If it's the first 
    //             block it will take the hash of the genesis block)
    // --hash (This blocks hash)
    // --data (Data that will be stored in the blockchain. In this case
    //          votes)
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    //Retrun a string reprensatation of the block
    toString(){
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash}
            Hash     : ${this.hash}
            Data     : ${this.data}`
    }

    //Static method for creating the true first block. Since
    //the a block need a lastHash, the gensesis blocks hash will
    //be used if none other exists
    static genesisBlock(){
        return new this('Genesis Time', '**null**', '**KD-LyIt**', []);
    }

    //Static method to mine a block into the blockchain
    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.generateHash(timestamp, lastHash, data);
        
        return new this(timestamp, lastHash, hash, data);
    }

    //Uses the CONST SHA256 created at the top to create a one-way
    //hash of the current block by taking in its data and running
    //it through the hashing algorithm
    static generateHash(timestamp, lastHash, data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static getBlockHash(block){
        const { timestamp, lastHash, data } = block;
        return Block.generateHash(timestamp, lastHash, data);
    }
}

module.exports = Block;