class Candidate{
    constructor(nameIn, partyIn){
        this.name = nameIn;
        this.party = partyIn;
    }

    getName(){
        return this.name;
    }

    getParty(){
        return this.party;
    }
}

module.exports = Candidate;