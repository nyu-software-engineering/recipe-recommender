/*
recipe.js contains all the paths that are POST login, AKA the homepage?!
*/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//const FuzzySearch = require('fuzzy-search'); //remove comments if trying to do fuzzy search

const Recipe = mongoose.model('Recipe');
const Ingredient = mongoose.model('Ingredient');
const User = mongoose.model('User');

router.get('/', function(req, res, next) {
  res.redirect('/recipe/home');
});

//this will be /recipe/home --> right after login

router.get('/home', function(req, res){
    console.log('inside GET /recipe/home');
        if(req.user) {
            console.log(req.user);
            Recipe.findRandom({}, {}, {limit: 50}, function(err, results) {
              if (!err) {
                //fuzzy seach each result... 
                //if it uses pantry objects, then push that value on to the recipe result recipe.pantryMatch = true
                //else, do nothing

                results.forEach((recipe) => {
                    console.log("current recipe's ingredients: ", recipe.ingredients);
                    //FUZZY SEARCH -- DON'T THINK LIBRARY IS WORKING
                    // const searcher = new FuzzySearch(ele, ['ingredients.name'], { //this is the "HAYSTACK"
                    //       caseSensitive: false,
                    //     });
                    //    req.user.pantry.some(function(ing){
                    //         console.log("using '.some' to look through pantry for " + ing.name);
                    //         const result = searcher.search(ing.name);
                    //         console.log("result is " + result);
                    //         if(result){
                    //             console.log("**** ingredient contains " + ing.name);
                    //             ele.pantryMath = true;
                    //             return;
                    //         }
                    //     });
                

                    recipe.ingredients.forEach((ele) => { //brute force... yikers
                        let pantry = req.user.pantry; 
                        let eleNameLower = ele.name.toLowerCase();

                        console.log("recipe " + recipe.name + " being sent into some");
                        pantry.some(ingredientInRecipe.bind(this, recipe, eleNameLower));
                       
                    });
                        

                });
                //console.log(results);
                 res.render('index', {recipe: results, user: req.user});
              }
        });
        } else {
            console.log('error');
            res.render('login', {message:'to see this page, you must have an account. Login or register below'});
        }

});

function ingredientInRecipe(recipe, recipeIng, pantryIng){
    let pantryName = pantryIng.name.toLowerCase();
    // console.log("current pantry ing ", pantryName);
    // console.log("current recipe ing ", recipeIng);
    if(recipeIng.includes(pantryName)){
        console.log("**** recipe's ing contains " + pantryName);
        recipe.pantryMatch = true;
        return true;
    } 
}

router.get('/details/:id', function(req, res, next){
    console.log(req.params.id);
    Recipe.findOne({_id: req.params.id}, function(err, recipe){
        console.log("inside find recipe slug");
        if(err){
            console.log('err finding recipe-details');
        }
        res.render('recipe-details',{recipe:recipe});
    });
});

// router.post('/home', function(req, res){
//     if(req.user) {
//         console.log(req.user);
//         console.log('posting for /recipe/home');
//
//         Recipe.find({}, function(err, recipe){
//         console.log("inside find recipe ", recipe.length);
//         res.render('recipe', {recipe: recipe.splice(0,21), user: req.user});
//
//         });
//     }else {
//             console.log('error');
//             res.render('login', {message:'to see this page, you must have an account. Login or register below'});
//     }
// });


//get page which allows a user to set up their pantry
router.get('/pantry', function(req, res, next) {
    if(req.user) {
        //console.log(req.user);
        User.findOne({username: req.user.username}, function (err, user) {
            //console.log("inside user trying to find ingredients");
            //create an array for ingredients with quantity over 0
            let ingredients = [];
            ingredients = user.pantry.filter((ele)=>{
                let quantity = ele.quantity == undefined ?  ele.measure : ele.quantity;
                if(quantity > 0){
                    return ele;
                }
            });
            res.render('pantry', {pantry: ingredients});
        });
    }else{
        res.render('login', {message: 'to see your pantry you must have an account. Login or register below'});
    }
});

function ingredientInPantry(pantry, ingObj){ //if duplicate is found, quantity and unit are updated
    let size = pantry.length;
    for(let i=0; i < size; i++){
        if (pantry[i].name === ingObj.name){
            return true;
        }
    }
    return false;
}

function changeQuantityAndUnit(user, pantry, ingObj, newQuantity, newUnit){
    //console.log("trying to change, new quantity is " + newQuantity);
    let size = pantry.length;
    for(let i=0; i < size; i++){
        if (pantry[i].name == ingObj.name){
            console.log("**********found a duplicate ingredient " + ingObj.name);
            if (pantry[i].measure !== newQuantity || pantry[i].unit !== newUnit){
                console.log("passed in quantity = " + newQuantity);
                pantry[i].quantity = newQuantity;
                console.log("____ NEW QUANTITY " + pantry[i].quantity);
                console.log("passed in unit = " + newUnit);
                pantry[i].unit = newUnit;
                console.log("____ NEW UNIT " + pantry[i].unit);
                //user.markModified('pantry');
            }
        }
    }
    user.markModified('pantry');
}

//if a user creates their pantry (post), create ingredient objects in the database
router.post('/pantry', function(req, res) {

    if (req.user) {
        User.findOne({username: req.user.username}, function (err, user) {
            //console.log("inside post /pantry")
            let ingredients = req.body.ingredient; //array of ingredient names
            let measures = req.body.measure;
            let units = req.body.unit;
            let toInsert = [];
            console.log(ingredients);
            console.log(measures);
            console.log(units);
            if(ingredients instanceof Array){
                for(let i=0; i < ingredients.length; i++){
                    console.log("       entering for loop of new ingredients passed in");
                    console.log(ingredients[i]);
                    console.log(measures[i]);
                    console.log(units[i]);

                    let ing = {
                        name: ingredients[i],
                        measure: measures[i],
                        unit: units[i]
                    }
                    if (!ingredientInPantry(user.pantry, ing)){
                        console.log("NOT A DUPLICATE, ADDING NEW ING");
                       user.pantry.push(ing); 
                    } else{
                        console.log("DUPLICATE BASED ON NAME: current measure is " + measures[i]);
                        changeQuantityAndUnit(user, user.pantry, ing, measures[i], units[i]);
                        console.log("did change persist? " + ing.name, ing.measure, ing.unit);
                        user.save(function(err){
                            if (err){
                                console.log(err);
                            }else{
                                //console.log("user is saved");
                            }
                        })
                    }
                }

            //     ingredients.forEach((ele) => {
            //     let ing = {
            //         name: ele,
            //         measure: 3,
            //         }

            //     if (!ingredientInPantry(user.pantry, ing)){
            //         user.pantry.push(ing);
            //     }
                
            //      });
            } else {
                let ing = {
                    name: ingredients,
                    measure: measures,
                    unit: units
                    }
                if (!ingredientInPantry(user.pantry, ing, measures[i], units[i])){
                    user.pantry.push(ing);
                }
            }

            //console.log("outside of for loop");
            user.save((err, user) => {
                if(err){
                    console.log(err);
                }
               // console.log("just saved");
                //console.log(user);
                    });

            });
            res.redirect("/recipe/home");
    } else{
        console.log("couldn't find a user");
        res.render('index', {message: 'To see your pantry you must have an account. Login or register below.'});
    }

    });
    //if a user creates their pantry (post), create ingredient objects in the database
 router.post('/inventory', function(req, res) {
        User.findOne({username: req.user.username}, function (err, user) {

            let ingredients = req.body.ingredient; //array of ingredient names
            console.log(req.body.ingredient);
            let units = ["cups","oz","lbs"];
            let toInsert = [];
            if(ingredients instanceof Array){
                ingredients.forEach((ele) => {
                let ing = {
                    name: ele,
                    measure: Math.floor(Math.random() * 16),
                    unit: units[Math.floor(Math.random() * 3)]
                    }

                if (!ingredientInPantry(user.pantry, ing)){
                    user.pantry.push(ing);
                }

            });
            } else {
                let ing = {
                    name: ingredients,
                    measure: Math.floor(Math.random() * 16),
                    unit: units[Math.floor(Math.random() * 4)]
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
            res.redirect("/recipe/inventory");
        });

router.post('/pantry/update', function (req, res) {
    //console.log(req.body.ingredient); //should have the name of the ingredient we're changing
    User.findOne({username: req.user.username}, function (err, user){
        MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});
    })
});

router.post('/inventory/update', function (req, res) {
    console.log(req.body.ingredient); //should have the name of the ingredient we're changing
    User.findOne({username: req.user.username}, function (err, user){
        MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});
    })
});

router.post('/inventory/delete', function(req, res){
  User.findOne({username: req.user.username}, function(err, user){
    //console.log("inside delete: \n", user.pantry);
    const ingredients = req.body.ingredient;
    console.log("ingredients inside delete", ingredients + "  ");
    if(ingredients === undefined){
      res.redirect('/recipe/inventory');
    }
    else{
      if(ingredients.constructor.name === 'Array'){
        for(let i = 0; i < ingredients.length; i++){
          user.pantry = user.pantry.filter(function(e){
            return e.name != ingredients[i];
            });
        }
      }
      else{
        if(ingredients !== ""){
          user.pantry = user.pantry.filter(function(e){
            return e.name != ingredients;
            });
        }
      }
      user.save((err, user) => {
          if(err){
              console.log(err);
          }
          //console.log("saved!!!");
      });
    //  ingredients = [];
    res.redirect("/recipe/inventory");
  }
    });
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
                if(ele.measure > 0){
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
