/*
recipe.js contains all the paths that are POST login, AKA the homepage?!
*/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Recipe = mongoose.model('Recipe');
const Ingredient = mongoose.model('Ingredient');
const User = mongoose.model('User');

router.get('/', function(req, res, next) {
  res.redirect('/recipe/home');
});

//this will be /recipe/home --> right after login
router.get('/home', function(req, res, next){
    console.log('inside GET /recipe/home');
        if(req.user) {
            console.log(req.user);
            res.render('index', {user: req.user});

        } else {
            console.log('error');
            res.render('login', {message:'to see this page, you must have an account. Login or register below'});
        }

});

router.post('/home', function(req, res, next){
    if(req.user) {
        console.log(req.user);
        console.log('posting for /recipe/home');

        Recipe.findOne({id: 00002}, function(err, recipe){
        console.log("inside find recipe ", recipe.name);
        res.render('recipe', {recipe: recipe, user: req.user});

        }); 
    }else {
            console.log('error');
            res.render('login', {message:'to see this page, you must have an account. Login or register below'});
    }
});

//get page which allows a user to set up their pantry
router.get('/pantry', function(req, res, next) {
    if(req.user) {
        console.log(req.user);
        User.findOne({username: req.user.username}, function (err, user) {
            console.log("inside user trying to find ingredients");
            //create an array for ingredients with quantity over 0
            let ingredients = [];
            ingredients = user.pantry.filter((ele)=>{
                if(ele.quantity > 0){
                    return ele;
                }
            });
            res.render('pantry', {pantry: ingredients});
        });
    }else{
        res.render('login', {message: 'to see your pantry you must have an account. Login or register below'});
    }
});

//if a user creates their pantry (post), create ingredient objects in the database
router.post('/pantry', function(req, res) {
    User.findOne({username: req.user.username}, function (err, user) {
     
        let ingredients = req.body.ingredient; //array of ingredients
        let toInsert = [];

        console.log("THE INGREDIENT LIST OF REQ.BODY " + ingredients);
        toInsert.forEach((ele) => { //ele will be just the name of the ingredient
            let ing = {name: ele, quantity: 1};
            console.log("CURRENT ING OBJECT " + ing);
            toInsert.push(ing);
        });

        Ingredient.insertMany(toInsert, function(err, ingredient){
            if (err){
                console.log(err);
            } else {
                console.log("----made a thing?!");
            }
        });
/*/
        .save(function (err, ingredient) {
                if (err) {
                    console.log(err);
                }
                user.pantry.push(ingredient);
                user.save((err, user) => {
                    console.log("just saved");

                });
            });
            /*/
        res.redirect("/recipe/pantry");  
    });


});

function createIngredient (name, quanitity, user){

}

router.get('/inventory', function(req, res, next) {
    if(req.user) {
        console.log(req.query);
        console.log(req.user.pantry);
        User.findOne({username: req.user.username}, function (err, user) {
            console.log("inside user trying to find ingredients");
            //for ingredients with quantity over 0
            let ingredients = [];
            ingredients = user.pantry.filter((ele)=>{
                if(ele.quantity > 0){
                    return ele;
                }
            });
            res.render('inventory', {pantry: ingredients});
        });

    }else{
        res.render('login', {message: 'to see your pantry you must have an account. Login or register below'});
    }

});

router.get('/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/');
});


module.exports = router;
