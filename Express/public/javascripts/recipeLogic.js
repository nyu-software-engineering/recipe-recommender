//do I have to extend or  do something that links this to db.js ???
const Recipe = mongoose.model('Recipe');

function generateRecipe(){

    /*console.log("= JSON.parse(basicRecipe1");
    //console.log(recipeData[0].name);
    let div = document.createElement("div");
    div.innerHTML = '<h1>MAKE MAC N CHEESE</h1>';
    document.body.appendChild(div);*/

    //under the assumption that a recipe object is currently in your database
    //to add hardcoded recipe to your database:
    /*
	db.recipes.insert({"id":00001, "name": "Mac and Cheese", "prepTime": 30, "ingredients":
	{"macaroni": 1, "butter": 0.25, "cheese": 2, "milk": 1}, "made":false, "favorite": false,
	"directions":{"Put macaroni in a bowl":1, "Mix in cheese, butter, and milk":2, "Cook at medium
	heat for 30 min":3}, "nutrition":{"calories":630, "fat":"33.6g", "protein":"26.5g", "sodium":"77mg"}})
    */
    Recipe.findOne({id: 00001}, function(err, recipe){
    	console.log("inside find recipe ", recipe.name);
        let dl = document.createElement("dl");
        dl = recipe.name;
        document.body.appendChild(dl);
    });

    //There has to be something that I'm missing with linking together the database
    //and the webpage/js and html files. do I have to somehow access the collection
    //where I have the recipe saved?
};
