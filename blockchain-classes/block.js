const ChainUtil = require('../chain-util');
const {MINING_DIFFUCULTY, MINE_RATE} = require('../config');
class Block{
    //Single Block Constructor
    // --timestamp (When the block is created)
    // --lastHash (The hash value of the last block. If it's the first 
    //             block it will take the hash of the genesis block)
    // --hash (This blocks hash)
    // --data (Data that will be stored in the blockchain. In this case
    //          votes)
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || MINING_DIFFUCULTY;
    }

    //Retrun a string reprensatation of the block
    toString(){
        return `Block -
            Timestamp  : ${this.timestamp}
            Last Hash  : ${this.lastHash}
            Hash       : ${this.hash}
            Nonce      : ${this.nonce}
            Difficulty : ${this.difficulty}
            Data       : ${this.data}`
    }

    //Static method for creating the true first block. Since
    //the a block need a lastHash, the gensesis blocks hash will
    //be used if none other exists
    static genesisBlock(){
        return new this('Genesis Time', '**null**', '**KD-LyIt**', null, 0, MINING_DIFFUCULTY);
    }

    //Static method to mine a block into the blockchain
    static mineBlock(lastBlock, data){
        let timestamp;
        const lastHash = lastBlock.hash;
        let nonce = 0;
        //const hash = Block.generateHash(timestamp, lastHash, data, nonce);
        return Block.proofOfWork(nonce, timestamp, lastHash, data, lastBlock)
    }

    //Proof of Work method to make sure the hash is correct
    static proofOfWork(nonce, timestamp, lastHash, data, lastBlock){
        let hash;
        let {difficulty} = lastBlock;
        do{
            nonce++;
            timestamp = Date.now();
            //Get the difficulty of the block (amount of 0's before the hash)
            difficulty = Block.changeDifficulty(lastBlock, timestamp)
            hash = Block.generateHash(timestamp, lastHash, data, nonce, difficulty)
        }while(hash.substring(0, difficulty) !== '0'.repeat(difficulty))

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    //Uses the CONST SHA256 created at the top to create a one-way
    //hash of the current block by taking in its data and running
    //it through the hashing algorithm
    static generateHash(timestamp, lastHash, data, nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static getBlockHash(block){
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return Block.generateHash(timestamp, lastHash, data, nonce, difficulty);
    }
    
    //Calculates the difficulty of the block to be mined
    static changeDifficulty( lastBlock, currentTime){
        //Get difficulty of last block
        let {difficulty} = lastBlock;
        //If the last blocks timestamp + the mine rate(4s) is greater than the
        //current time its mined to quickly 
        if(lastBlock.timestamp + MINE_RATE > currentTime)
            difficulty += 1;
        //Else of it didnt mine quick enough we decrease the difficulty
        else if(difficulty > 2)
            difficulty -= 1;
        
        return difficulty; 
    }
}

module.exports = Block;