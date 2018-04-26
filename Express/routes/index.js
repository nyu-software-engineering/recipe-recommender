/*
index.js contains all the paths that aren't specific to a user... aka homepage, login,
and registration pages.

res.render points to a corresponding file in views. so res.render('index') looks for 
index.hbs in /views ... any variables can be passed in through this line as well.
*/


//testing jenkins -denisa vataksi


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');

// get home page
router.get('/', function(req, res, next) {
    if(req.user){
        console.log('session username is ' + req.user.username);
        res.render('index', {user: req.user, title: 'Recipe Finder' });
    }else{
      console.log("no session username");
        res.render('index', { title: 'Recipe Finder' });
    }

});

//get registration page on register button click
router.get('/register', function(req, res, next){
    res.render('register');
});

//if a user registers (post), create new user object in database
router.post('/register', function(req, res) {
    User.register(new User({username:req.body.username, name: req.body.name, email: req.body.email}),
        req.body.password, function(err, user){
            if (err) {
                // NOTE: error? send message back to registration...
                //TODO: expand this
                console.log(err);
                res.render('register',{message:'Your registration information is not valid'});
            } else {
                // NOTE: once you've registered, you should be logged in automatically
                // ...so call authenticate if there's no error
                passport.authenticate('local')(req, res, function() {
                    res.render('index', {user: user});
                });
            }
        });
});


//login to account
router.get('/login', function(req, res, next) {
    res.render('login');
});

//when a user logins, authenticate and pass info if neccesary
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err,user) {
        if(user) {
            // NOTE: using this version of authenticate requires us to
            // call login manually
            req.logIn(user, function(err) {
                res.redirect('/recipe/home');
            });
        } else {
            res.render('login', {message:'Your login or password is incorrect.'});
        }
    })(req, res, next);

});


module.exports = router;
