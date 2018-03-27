const app = require("../app.js");
const mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost/hw05');
const Recipe = mongoose.model('Recipe');
const User = mongoose.model('User');

const request = require("request"),
    assert = require('assert'),
    base_url = "http://localhost:3000/";

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);


describe("Get Homepages Test", function(){
    describe("GET /", function() {

        it("returns status code 200", function() {
            request.get(base_url, function(error, response, body) {
                console.log('inside test 1', response.statusCode);
                assert.equal(200, response.statusCode);
                done();

            });

        });

    });

    describe("GET /login", function(){

        it("returns status code 200", function(){
            request.get("http://localhost:3000/login", function(error, response, body){
                //console.log(error);
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });

    describe("GET /register", function(){

        it("returns status code 200", function(){
            request.get("http://localhost:3000/register", function(error, response, body){
                //console.log(error);
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });

});

describe("Require Login For Recipe home page", function(){
    describe("GET /recipe/home", function() {

        it("re-routes to login page", function() {
            request.get("http://localhost:3000/new/rather/general", function(error, response, body) {
                console.log('inside test 2', response.message);
                assert.equal('to see this page, you must have an account. Login or register below', response.message);
                done();

            });

        });

    });

});


describe("Get Recipe Pages test", function(){

    it("GET /recipe/home", function(){
        request.get("http://localhost:3000/recipe/home", function(error,response,body){
            //console.log(error)
            assert.equal(200, resopnse.statusCode);
            done();
        });
        
    });

    it("GET /recipe/pantry", function(){
        request.get("http://localhost:3000/recipe/pantry", function(error,response,body){
            //console.log(error)
            assert.equal(200, resopnse.statusCode);
            done();
        });
        
    });

});

describe("Recipes should be correctly saved", function(){

    it('should be able to find the rather in the database', function(done){
        let recipe = new Recipe({
            id: 0004,
            name: "mac n cheese",
            prepTime: 01,
            ingredients: {"macaroni": 1, "butter": 0.25, "cheese": 2, "milk": 1},
            made: false,
            favorited: false,
            directions: "Put macaroni in a bowl, Mix in cheese, butter, and milk, Cook at medium heat for 30 min"

        }).save(function(err, recipe){
            console.log('making new recipe');

            if(!err){
                done();
            }else{
                console.log(err);
            }

        });
        Recipe.findOne({id: 0004}, function(err, recipe){
            assert.equal("mac n cheese", recipe.name);
        });
    });
});