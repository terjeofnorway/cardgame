
/**
 * Adds an event listener for when the submit button is clicked
 * at startup.
 */
function addSubmitEventListener() {
  document.getElementById('submitContact').addEventListener('click', validateFormFields);
}

/**
 * Look through all the fields and check if they
 * are valid. If not, each field gets a error message beneath.
 */
function validateFormFields() {
  // Find all the fields from the DOM
  var firstNameField = document.getElementById('firstName');
  var lastNameField = document.getElementById('lastName');
  var phoneField = document.getElementById('phone');
  var emailField = document.getElementById('email');

  // This may look a bit difficult at first, but spend some time understanding this.
  // The toggleErrorMessage takes two arguments: name and flag.
  // The flag (which can be true or false) is determined by the '===' operator and
  // will tell the toggleErrorMessage whether the error should be shown or hidden.
  toggleErrorMessage('firstNameError', firstNameField.value === '');
  toggleErrorMessage('lastNameError', lastNameField.value === '');
  toggleErrorMessage('phoneError', !validatePhone(phoneField.value));
  toggleErrorMessage('emailError', !validateEmail(emailField.value));
}

/**
 * Display or hide the error message related to the field that has an error.
 * @param name {String} the name of the error message div.
 * @param showMessage {Boolean} The flag indicating whether to show the error or hide it.
 */
function toggleErrorMessage(name, showMessage){
  document.getElementById(name).style.display = showMessage ? 'block' : 'none';
}

/**
 * Validates the email address. Note that this does not allow for email at
 * top level domains, ie firstname.lastname@flowers
 *
 * @param email {String} The email addressto be validated.
 * @returns {boolean} Flag indicating whether the email address is valid or not.
 */
function validateEmail(email) {
  var regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
}

/**
 * Validates the phone number which should allow the following patterns:
 * 111-111-1111
 * 111.111.1111
 * 111 111 1111
 *
 * @param phone {String} The phone number to be validated
 * @returns {boolean} Flag indicating whether the phone number is valid or not.
 */
function validatePhone(phone) {
  var regularExpression = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/gm;
  return regularExpression.test(String(phone));
}

/**
 * Self Invoking Function. See script.js for more information about
 * this technique.
 */
(function(){
  addSubmitEventListener()
})();