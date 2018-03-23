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
  res.send('respond with a resource');
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
    console.log(req.body.ingredient);
    User.findOne({username: req.user.username}, function (err, user) {
        req.body.ingredient.forEach(function(ingr){ //TODO: this is wrong, because forEach is synchronous.
                                                    //need to use promises? right now only saves one ingredient
            new Ingredient({
                name: ingr,
                quantity: 1

            }).save(function (err, ingredient) {
                if (err) {
                    console.log(err);
                }
                user.pantry.push(ingredient);
                user.save((err, user) => {
                    console.log("just saved");

                });
            }); 
        })
        res.redirect("/recipe/home");  
    });

});

router.get('/inventory', function(req, res) {
    console.log(req.query);
    res.render('inventory', {ingredients: req.user.pantry});

});

router.get('/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/');
});


module.exports = router;
