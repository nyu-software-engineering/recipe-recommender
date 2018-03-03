/*
recipe.js contains all the paths that are POST login, AKA the homepage?!
*/
let express = require('express');
let router = express.Router();

// Require controller modules.
//NOTE: naming semantics 
let recipe_controller = require('../controllers/recipeController');

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
	console.log('posting for /recipe/home');
    res.render('index', {user: req.user});
});


module.exports = router;
