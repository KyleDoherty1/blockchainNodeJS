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
});