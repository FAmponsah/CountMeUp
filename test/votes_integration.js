"use strict";
process.env.MODE = 'TEST';
var baseFolder = '../src';

var request = require('supertest');
var chai = require('chai');
var assert = require('chai').assert;
var expect = require('chai').expect;
var uuid = require('uuid');

var testutils = require(baseFolder + '/common/testutils');

describe('collections endpoints tests', function() {

	before(function(done) {
		app = require(baseFolder + '/index.js');
		done();
    });
	
    var app;
    var ENDPOINT = '/votes';
    var ballots = {
		"user-1": "candidate-1", 
		"user-2": "candidate-2",
		"user-3": "candidate-3",
		"user-4": "candidate-4",
		"user-5": "candidate-5"
	};
		
    it('should test 5 different users voting for 5 different candidates', function(done) {
        this.timeout(10000);
		
        request(app).post(ENDPOINT + '/cast')
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.send(ballots)
		.expect(200)
		.end(function(err, res) {
			if (err) {
				console.log(err);
				return done(err);
			}	
			done();
		});
    });
	
	it('should fail with 404 error', function(done) {
        this.timeout(10000);
        request(app).get(ENDPOINT + '/result')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(404)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
				var obj = res.body.result;
                assert.isFalse(obj != null);
                done();
            });
    });

});
