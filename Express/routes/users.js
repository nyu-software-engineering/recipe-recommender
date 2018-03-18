let express = require('express');
let router = express.Router();

/*
users.js contains all the paths that ARE specific to a user... aka once they're logged in
note that the url changes to be /users/PATH 

This isn't in use yet, but if there's a "manage account" button, it'll be sent here
*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//TO EDIT A USER PROFILE
router.get('/manage', function(req, res, next){
    console.log('inside GET /user/manage');
        if(req.user) {
            console.log(req.user);
            res.render('index', {user: req.user});

        } else {
            console.log('error');
            res.render('login', {message:'to see this page, you must have an account. Login or register below'});
        }

});

router.post('/manage', function(req, res, next){
	console.log

});

module.exports = router;
