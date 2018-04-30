function search(){
  const ings = document.querySelectorAll("recipe");

  document.querySelector("#recipe-show").addEventListener("keyup", function() {
    const input = document.getElementById("recipe-show");
    const filter = input.value.toLowerCase();
    const recipes = document.getElementsByClassName("recipe");
    const recipeNames = document.getElementsByClassName("recipe-name");
    console.log(recipeNames);
   for (let i = 0; i < recipeNames.length; i++) {
     const rec = recipeNames[i];
     console.log(recipes[i]);
     if (rec.innerHTML.toLowerCase().indexOf(filter) > -1) {
       recipes[i].style.display = "";
     } else{
       recipes[i].style.display = "none";
     }
   }
});

}
document.addEventListener('DOMContentLoaded', search);
