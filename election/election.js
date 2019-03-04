class Election{
    constructor(nameIn, candidatesIn){
        this.candidates = candidatesIn;
        this.name = nameIn;
        this.result = [];
    }

    getName(){
        return this.name;
    }

    getCandidates(){
        return this.candidates;
    }

    getResults(){
        return this.result;
    }

    countVotes(){
        //TO-DO
    }
}

module.exports = Election;