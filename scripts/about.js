

function replaceText() {
  var div = document.getElementById('aboutText');
  var regex = /Magic/gi;
  var aboutText = div.innerHTML;

  div.innerHTML = aboutText.replace(regex, 'Something');;
}

function addClickEventListener(){
  var panelInfoTrigger = document.getElementById('moreInfoTrigger');
  panelInfoTrigger.addEventListener('click', togglePanelVisibility)
}

function togglePanelVisibility(){
  var panel = document.getElementById('moreInfoContent');

  // This will return either true or fase (called Boolean)
  var panelIsVisble = panel.style.display !== 'none';

  // Tip: This is called a ternary expression. It's a bit advanced,
  // you might stumble across it when reading code snippets and
  // solutions to problems online. You can read about ternaries here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  panel.style.display = panelIsVisble ? 'none' : 'block';
}



(function(){
  replaceText();
  addClickEventListener();
})();