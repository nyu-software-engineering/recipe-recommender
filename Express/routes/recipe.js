/*
recipe.js contains all the paths that are POST login, AKA the homepage?!
*/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Recipe = mongoose.model('Recipe');

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

        Recipe.findOne({id: 00001}, function(err, recipe){
        console.log("inside find recipe ", recipe.name);
        res.render('index', {recipe: recipe, user: req.user});

        }); 
    }else {
            console.log('error');
            res.render('login', {message:'to see this page, you must have an account. Login or register below'});
    }
});

router.get('/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/');
});


module.exports = router;
