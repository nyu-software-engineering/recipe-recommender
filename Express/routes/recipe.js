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
     
        let ingredients = req.body.ingredient; //array of ingredient names
        console.log(req.body.ingredient);
        let toInsert = [];
        if(ingredients instanceof Array){
            ingredients.forEach((ele) => {
            let ing = {
                name: ele,
                quantity: 3,
                }
            //console.log(ing);
            user.pantry.push(ing);
        });

        } else {
            let ing = {
                name: ingredients,
                quantity: 3,
                }
            user.pantry.push(ing);
        }
        
        //console.log("outside of for loop");
        user.save((err, user) => {
            if(err){
                console.log(err);
            }
            //console.log("just saved");
            //console.log(user);
                });
    
        });
        res.redirect("/recipe/pantry");  
    });

router.get('/delete/:pantry', function(req, res, next){

});

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

router.get('/logout', function(req, res){ //TODO: Why is this redierecting to mac n cheese?
    console.log('logging out');
    req.logout();
    res.redirect('/');
});

router.get('/:slug', function(req, res, next){
    console.log("inside slug function");
        Recipe.findOne({id:0002}, function(err, recipe){
            console.log("INSIDE SLUG");
            console.log(req.params);
            console.log(recipe);

            res.render('viewRecipeContents', {recipe: recipe, user: req.user, slug: req.params.slug});
        });
        
    });



module.exports = router;
