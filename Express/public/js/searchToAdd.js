function search(){
  // const ingsInput = document.querySelector("#ingredient-input");
  const ings = document.querySelectorAll("input.filled-in");
  
  document.querySelector("#ingredient-add").addEventListener("keyup", function() {
    const input = document.getElementById("ingredient-add");
    const filter = input.value.toLowerCase();
    const span = document.getElementsByClassName("ingredients-to-pick");
    const ingInputs = document.querySelectorAll("input");
   for (let i = 0; i < span.length; i++) {
     const ing = span[i].getElementsByTagName("span")[0]
     console.log(ingInputs[i].classList);
     if (ing.innerHTML.toLowerCase().indexOf(filter) > -1) {
       span[i].style.display = "";
     } else{
       span[i].style.display = "none";
     }
   }
});

}
document.addEventListener('DOMContentLoaded', search);
