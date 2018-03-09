//do I have to extend or  do something that links this to db.js ???
const User = mongoose.model('User');

function generateRecipe(){
    /*console.log("= JSON.parse(basicRecipe1");
    //console.log(recipeData[0].name);
    let div = document.createElement("div");
    div.innerHTML = '<h1>MAKE MAC N CHEESE</h1>';
    document.body.appendChild(div);*/

    const id = 1;
    Recipe.recipe.findOne(id: reqid, function(err, recipe){
        let dl = document.createElement("dl");
        dl = recipe;
        document.body.appendChild(dl);
    });
    
    //There has to be something that I'm missing with linking together the database 
    //and the webpage/js and html files. do I have to somehow access the collection
    //where I have the recipe saved?
};