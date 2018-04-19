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

function ingredientInPantry(pantry, ingObj){
    let size = pantry.length;
    for(let i=0; i < size; i++){
        console.log("**pantry item: " + pantry[i]);
        if (pantry[i].name === ingObj.name){
            console.log("same name found - returning true");
            return true;
        }
    }
    console.log("no duplicate found - returning false");
    return false;
}
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

            if (!ingredientInPantry(user.pantry, ing)){
                user.pantry.push(ing);
            }
            
        });
        } else {
            let ing = {
                name: ingredients,
                quantity: 3,
                }
            if (!ingredientInPantry(user.pantry, ing)){
                user.pantry.push(ing);
            }
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

router.post('/pantry/update', function (req, res) {
    console.log(req.body.ingredient); //should have the name of the ingredient we're changing
    User.findOne({username: req.user.username}, function (err, user){

        MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});
    })
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

router.get('/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/');
});


router.get('/:id', function(req, res, next){
    console.log(req.params.id);
    Recipe.findOne({id: req.params.id}, function(err, recipe){
        console.log("inside find recipe slug");
        if(err){
            console.log('err finding recipe-details');
        }
        res.render('recipe-details',{recipe:recipe});
    });
});



module.exports = router;
