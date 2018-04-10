const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Ingredient = new Schema ({
  name: String,
  quantity: Number, //will probably have to change/add this to be a measurement object
  unit: String
});

const Recipe = new Schema ({
  id: Number,
  name: String,
  prepTime: Number,
  totalTime: Number,
  ingredients: [Ingredient],
  made: Boolean,
  favorited: Boolean,
  directions: [String],
  cuisine: [String],
  nutrition: [String],
  servings: Number
});

Recipe.methods.iterateIngredients = function() {
  var ingredient_list = this.ingredients;
  var result = "Ingredients in" + this.name + "recipe:\n";
  for (var i = 0; i < ingredient_list.length; i++) {
    result.concat(ingredient_list[i].quantity + " " + ingredient_list[i].name + "\n");
  }
  return result;
}

const User = new Schema ({
  id: Number,
  name: String,
  email: String,
  recipes: [Recipe],
  pantry: [Ingredient]
  
});

User.methods.iterateRecipes = function() {
  var recipe_list = this.recipes;
  for (var i = 0; i < recipe_list.length; i++) {
    console.log(recipe_list[i].name);
  }
}

User.methods.iteratePantryItems = function() {
  var pantry_list = this.ingredients;
  var result = "Items in " + this.name + "'s pantry:\n";

  for (var i = 0; i < pantry_list.length; i++) {
    result.concat(pantry_list[i].quantity + " " + pantry_list[i].name + ",");
  }
  return result;
}

//keep track of username and password for each user instance
User.plugin(passportLocalMongoose);

mongoose.model('User', User);
mongoose.model('Ingredient', Ingredient);
//mongoose.model('Pantry', Pantry);
mongoose.model('Recipe', Recipe);

/* is the environment variable, NODE_ENV, set to PRODUCTION? NOT SURE IF WE NEED THIS YET
if (process.env.NODE_ENV == 'PRODUCTION') {
    // if we're in PRODUCTION mode, then read the configration from a file
    // use blocking file io to do this...
    var fs = require('fs');
    var path = require('path');
    var fn = path.join(__dirname, 'config.json');
    var data = fs.readFileSync(fn);

    // our configuration file will be in json, so parse it and set the
    // conenction string appropriately!
    var conf = JSON.parse(data);
    var dbconf = conf.dbconf;
} else {
    // if we're not in PRODUCTION mode, then use
    dbconf = 'mongodb://localhost/hw05';
}
*/

dbconf = 'mongodb://localhost/Rrecommender';
mongoose.connect(dbconf);
