function search(){
  // const ingsInput = document.querySelector("#ingredient-input");
  const ings = document.querySelectorAll("input.filled-in");
    document.addEventListener('click', function(el){
      if(el.target.tagName === "SPAN"){
         el.target.classList.toggle("checkedOff");
      }
    });

  document.querySelector("#ingredient-input").addEventListener("keyup", function() {
    const input = document.getElementById("ingredient-input");
    const filter = input.value.toLowerCase();
    const span = document.getElementsByClassName("ingredients-to-pick");
    const ingInputs = document.querySelectorAll("input");
   for (let i = 0; i < span.length; i++) {
     const ing = span[i].getElementsByTagName("span")[0]
     console.log(ingInputs[i].classList);
     if (ing.innerHTML.toLowerCase().indexOf(filter) > -1 && !ing.classList.contains("checkedOff")) {
       span[i].style.display = "";
     } else if(!ing.classList.contains("checkedOff")){
       span[i].style.display = "none";
     }
   }
});

}
document.addEventListener('DOMContentLoaded', search);
