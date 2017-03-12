"use strict";

var util = require('util');
var logger = require('./../common/apputils').logger;

var VotesFunctions = function(){
	
	var userVoteCount = {}; // { userid: count, userId: count }
	var candidateVoteCount = {}; // { candidateId: count }
	
    //curl -vX POST http://localhost:3000/votes --header "Content-Type: application/json"
    var cast = function(req, res) {
        logger.debug('[VotesFunctions.cast] IN');

		// ballots => { userid: candidateId, userId:candidateId , ...}
		console.log(" ### FRED - req.body" + req.body);
		
        var ballots = req.body;
		var processor = processVotes(ballots);
		process.nextTick(processor.f);
		res.status(200).end();

        logger.debug('[VotesFunctions.cast] OUT');
    };
	
	//curl -vX POST http://localhost:3000/results --header "Content-Type: application/json"
    var results = function(req, res) {
        logger.debug('[VotesFunctions.results] IN');

		// ballots => { userid: candidateId, userId:candidateId , ...}
		var returnedBallots = { 
			"user-1": "candidate-1", 
			"user-2": "candidate-2",
			"user-3": "candidate-3",
			"user-4": "candidate-4",
			"user-5": "candidate-5"
		};
		
		//res.status(200).json({"result": o});
		res.send(200).json(returnedBallots);
		res.end();
		
        logger.debug('[VotesFunctions.results] OUT');
    };
	
	/**
	 * Process all votes cast.
	 * @params {String} v - the total number of votes.
	 * @return {Function} f.
	 */
	var processVotes = function(v) {
		
		var votes = v;		
		var f = function(){
		
			var vote;
			Object.keys(votes).forEach(function(userId) {
				
				if(!userVoteCount[userId]) {
					userVoteCount[userId] = 0;
				}
				
				if(userVoteCount.userId < 3){				
					userVoteCount.userId++;
					var candidateId = votes[userId];
					
					if(!candidateVoteCount[candidateId]) {
						candidateVoteCount[candidateId] = 0;
					}				
					candidateVoteCount[candidateId]++;
				}	
			});	
		}		
		return { f: f };
	}
   
    return {
        cast: cast,
		results: results
    };

}();

module.exports = VotesFunctions;
