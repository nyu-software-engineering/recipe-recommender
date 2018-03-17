const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Ingredient = new Schema ({
  name: String,
  quantity: Number, //will probably have to change/add this to be a measurement object
  
});

/*const Pantry = new Schema ({
  ingredients: [Ingredient]
});*/

const Recipe = new Schema ({
  id: Number,
  name: String,
  prepTime: Number,
  ingredients: [Ingredient],
  made: Boolean,
  favorited: Boolean,
  directions: [String],
  nutrition: [String] //check with team to see if this logic is correct
});

const User = new Schema ({
  id: Number,
  name: String,
  email: String,
  recipes: [Recipe],
  pantry: [Ingredient]
  
});
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
