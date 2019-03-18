var _ = require('underscore');

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

    addCandidateVote(id){
        var candidate = this.getCandidateById(id);
        candidate.addVote();
        console.log(candidate.getName());
    }

    getCandidateById(id){
         return this.candidates.find(function (o) { return o.id == id; })
    }

    countVotes(){
        //TO-DO
    }
}

module.exports = Election;