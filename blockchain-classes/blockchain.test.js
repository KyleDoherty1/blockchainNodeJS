const Blockchain = require('./blockchain');
const Block = require('./block');

//Blockchain test for blockchain class
describe('Blockchain', () => {
    
    //Create a local scope variable 'blockchain' for the test
    let blockchain, blockchain2;

    //Before each test insantiate 'blockchain' as a new Blockchain
    beforeEach(() => {
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });


    // **** UNIT TESTS ******

    //UNIT TEST 
    it('This blockchain starts with the gensis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesisBlock());
    });

    //UNIT TEST
    it('This blockchain adds a new block to the end of the chain', () => {
        const data = '1 vote for Trump';
        blockchain.addBlock(data);

        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    });

    //UNIT TEST
    it('Validate a  valid chain[]', () =>{
        blockchain2.addBlock('1 vote for Clinton');

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
    });

    //UNIT TEST
    it('Invalidates a chain where a genesis block has been tampered with', () =>{
        blockchain2.chain[0].data = 'Wrong data';

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    //UNIT TEST
    it('Invalidates a corrupt chain[]', () =>{
        blockchain2.addBlock('1 vote for Clinton');
        blockchain2.chain[1].data = '1 vote for Trump';

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    //UNIT TEST
     it('Chain is replaced with an updated valid chain', () =>{
        blockchain2.addBlock('1 vote for Clinton');

        blockchain.replaceChain(blockchain2.chain);

        expect(blockchain.chain).toEqual(blockchain2.chain);
    });

    //UNIT TEST
    it('Chain is not replaced if incoming chain is equal or less length', () =>{
        blockchain.addBlock('1 vote for Clinton');

        blockchain.replaceChain(blockchain2.chain);

        expect(blockchain.chain).not.toEqual(blockchain2.chain);
    });
});