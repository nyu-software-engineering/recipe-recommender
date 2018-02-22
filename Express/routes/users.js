let express = require('express');
let router = express.Router();
/*
users.js contains all the paths that ARE specific to a user... aka once they're logged in
note that the url changes to be /users/PATH 
*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//just testing to make sure it works
router.get('/authenticated', function(req, res, next){
    console.log('inside GET /authenticated');
        if(req.user) {
            console.log(req.user);
            res.render('index', {user: req.user});

        } else {
            console.log('error');
            res.render('login', {message:'to see this page, you must have an account. Login or register below'});
        }

});

module.exports = router;
