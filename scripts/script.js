// Tip: Constants that never change are written in capitals as a convention
// This is to let other developers know that the value of this constant
// will never change throughout the program. ES2015+ offer 'const' as a
// built in word, but for now, we're using var.
var API_BASE_URL = 'https://api.magicthegathering.io/v1/cards';

function loadCardsFromAPI(filterBySearch) {
  fetch(API_BASE_URL)
  .then(result => result.json())
  .then(result => gather(result.cards, filterBySearch))
  .catch(err => console.log(err));
}

/**
 * Gather all the information and the card list you need.
 * @param allCards {Array} The list of all the fetched cards.
 * @param filterBySearch {String} A string to filter.
 */
function gather(allCards, filterBySearch) {
  var cardsToBeDisplayed = [];
  // First, prepare the cards. If any filtering (search) is needed
  // this is the time to do that!

  // If the filterBySearch string has a value, try and search for this!
  if(filterBySearch) {
    cardsToBeDisplayed = allCards.filter(card => card.name.toLowerCase().indexOf(filterBySearch.toLowerCase()) !== -1);
  } else {
    cardsToBeDisplayed = allCards;
  }

  // Build the elements that will hold all the cards.
  var app = document.getElementById('row2');

  // Clear the element first so that all cards are gone.
  app.innerHTML = null;
  var div1 = createSingleElement('div', 'cards', 'col-sm-12');

  // Loop through all the cards and append each card one by one
  // into the div1.
  // Tip: It's not wrong to se a for(i=0;i<cards.length;i++), but I
  // think this method is easier to read, and code readability is important.
  cardsToBeDisplayed.forEach(card => {
    div1.appendChild(buildSingleCard(card));
  });

  // If nothing was found, create a message telling the user!
  if(cardsToBeDisplayed.length === 0) {
    var nothingMessage = document.createElement('div');
    nothingMessage.textContent = 'Nothing was found!';
    div1.appendChild(nothingMessage);
  }

  app.appendChild(div1);
}

/**
 * This function builds a single card based on the object you put in, and
 * can be used for both card in a list or a single card in the card-specific
 * page.
 *
 * @param card (Object) The object representing one single card.
 */
function buildSingleCard(card){
  // Create all the elements we need to build the card
  var div2 = createSingleElement('div', null, 'col-sm-4');
  var div3 = createSingleElement('div', null, 'card-container');

  var h4 = document.createElement('h4');
  var img = document.createElement('img');

  var a = createSingleElement('a', null, 'btn btn-success');
  a.setAttribute('href', 'card-specific.html?id=' + card.id);

  // Populate the elements with any dynamic data that
  // we need in order to display the card.
  img.src = card.imageUrl;
  a.textContent = 'View More';
  h4.textContent = card.name;

  // Start putting all the elements together
  div3.appendChild(h4);
  div3.appendChild(img);
  div3.appendChild(a);
  div2.appendChild(div3);

  // Finally, return the card that we built. div2 is the outer-most
  // that holds the entire card together.
  return div2;
}

function createSingleElement(type, id, elementClasses){
  var element = document.createElement(type);
  element.setAttribute('class', elementClasses);
  if(id){
    element.setAttribute('id', id);
  }
  return element;
}

function addSearchEventListener() {
  document.getElementById('searchButton').addEventListener('click', doCardSearch);
}

function doCardSearch(event) {
  event.preventDefault();
  var searchString = document.getElementById('search').value;
  loadCardsFromAPI(searchString);
}



/**
 * Tip: Below is what is called a Self Invoking Function. As soon as the javascript
 * file is loaded, any instructions inside the function will run.
 *
 * In our app, we want to immediately load cards from the API in order to
 * display them.
 *
 * This is an alternative to put the onLoad-method in the body and ensures that
 * the entire JS file is infact loaded before reaching the bottom where the
 * Self Invoking Function is placed.
 *
 * Notice that a SIF is recognizable by outter parentheses and a final parentheses
 * closure at the end.
 */

(function() {
  loadCardsFromAPI();
  addSearchEventListener();
})();