const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const random = require('mongoose-simple-random');

const Ingredient = new Schema ({
  name: String,
  measure: Number, //will probably have to change/add this to be a measurement object
  unit: String, //e.g. gallons, cups, oz
});


const Recipe = new Schema ({
  id: Number,
  name: String,
  prepTime: Number,
  //totalTime: Number,
  ingredients: [Ingredient],
  made: Boolean,
  favorited: Boolean,
  directions: [String],
  description: [String],
  cuisine: [String],
  urlName: String,
  imgURL: String
  //nutrition: [String],
  //servings: Number
});
Recipe.plugin(random);

const User = new Schema ({
  id: Number,
  name: String,
  email: String,
  recipes: [Recipe],
  pantry: [Ingredient]
},   {
  usePushEach: true
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

db = mongoose.connection;
 
db.on("error", console.error.bind(console, "THIS ERROR WON'T SHOW"));

db.once("open", function() {
  console.log("Connected to MongoDB");
});

try {
  console.log("About to connect to MongoDB");
  //dbconf = 'mongodb://denisa:denisa@cluster0-6zr15.mongodb.net/test'; //driver 3.6 or later
  dbconf = 'mongodb://denisa:denisa@cluster0-shard-00-00-6zr15.mongodb.net:27017,cluster0-shard-00-01-6zr15.mongodb.net:27017,cluster0-shard-00-02-6zr15.mongodb.net:27017/Kitchuation_Data?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'; //driver 3.4 or later
  mongoose.connect(dbconf);
  console.log(mongoose.connection.readyState);
} catch (err) {
  console.error(err);
}

