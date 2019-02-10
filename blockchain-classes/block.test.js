const Block = require('./block');

describe('Block', () => {

    let data, lastBlock, block;

    beforeEach(() => {
        data = '1 vote for Trump';
        lastBlock = Block.genesisBlock();
        block = Block.mineBlock(lastBlock , data);
    });

    it('Block sets its `data` to match the data passed to it', () => {
        expect(block.data).toEqual(data);
    });

    it('Block sets its `lastHash to match the hash of the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('generates a hash that matches the diffuculty of 3 zeros before the hash', () =>{
        expect(block.hash.substring(0,3)).toEqual('000');
        console.log(block.toString());
    });
});