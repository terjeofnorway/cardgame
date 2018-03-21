// refer to question 2 before development starts for scope document
// get URL query string
var API_BASE_URL = 'https://api.magicthegathering.io/v1/cards';

function getQueryStringValue (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function loadSingleCardFromAPI(id) {
  fetch(API_BASE_URL + '/' + id)
  .then(result => result.json())
  .then(result => {
      if(result.card){
        displayCard(result.card)
      } else {
        displayErrorMessage();
      }
  })
  .catch(err => console.log(err));
}

function loadCard(){
    var id = getQueryStringValue("id");

    if(!id){
        displayErrorMessage();
    } else {
        loadSingleCardFromAPI(id);
    }
}

function displayErrorMessage() {
    var errorMessage = document.createElement('div');
    errorMessage.textContent = 'ID is missing or no card was found!';

    document.querySelector('.container').appendChild(errorMessage);
}

function displayCard(card) {
    // Create the image
    var cardImageHolder = document.getElementById('cardImage');
    var img = document.createElement('img');
    img.src = card.imageUrl;
    cardImageHolder.appendChild(img);

    var name = document.createElement('h2');
    name.textContent = card.name;

    var about = document.createElement('div');
    about.innerHTML = '<b>About: </b>' + card.text;

    var rarity = document.createElement('div');
    rarity.innerHTML = '<b>Rarity: </b>' + card.rarity;

    var color = document.createElement('div');
    color.innerHTML = '<b>Color(s): </b>' + card.colors.join(', ');

    var cardDetails = document.getElementById('cardDetails');
    cardDetails.appendChild(name);
    cardDetails.appendChild(about);
    cardDetails.appendChild(rarity);
    cardDetails.appendChild(color);
}


(function() {
  loadCard();
})();

