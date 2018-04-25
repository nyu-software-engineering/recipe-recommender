function favorite(){
  const favButton = document.querySelector('.fav-form');
  favButton.addEventListener('click', function(evt){
    evt.preventDefault();
    favButton.classList.toggle('clicked');
  });
}

document.addEventListener('DOMContentLoaded', favorite);
