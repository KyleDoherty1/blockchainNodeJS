class Candidate{
    constructor(nameIn, partyIn){
        this._id = Candidate.counter;
        this.name = nameIn;
        this.party = partyIn;
        this.votes = 0;
    }

    getName(){
        return this.name;
    }

    getParty(){
        return this.party;
    }

    get id() {
        return this._id;
    }

    static get counter() {
        Candidate._counter = (Candidate._counter || 0) + 1;
        return Candidate._counter;
    }

    addVote(){
        this.votes += 1;
    }

    resetVote(){
        this.votes = 0;
    }
}

module.exports = Candidate;