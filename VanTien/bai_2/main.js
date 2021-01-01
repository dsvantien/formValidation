const form = document.getElementById('form');
const userid = document.getElementById('userid');
const password = document.getElementById('password');
const name = document.getElementById('name');
const address = document.getElementById('address');
const country = document.getElementById('country');
const zipcode = document.getElementById('zipcode');
const male = document.getElementById('male');
const english = document.getElementById('english');
const email = document.getElementById('email');


// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}


// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//check gender, language
function checkCheckbox(input,name) {
    const radios = document.getElementsByName(name);
    let formValid = false;
    let i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        i++;        
    }
    if (!formValid) showError(input,`${name} is required`);
    return formValid;
}
// check select contry field
/*function checkCountry(input,message){
    select = document.getElementById('select'); 
    if (select.value) {
      return true;
    }
    showError(input,message);
    return false;
}*/

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();
  checkRequired([userid, password,name,country,zipcode,email]);
  checkLength(userid, 5, 12);
  checkLength(password, 7, 12);
  checkEmail(email);
  checkCheckbox(male,'gender');
  checkCheckbox(english,'language');
  checkCountry(country,'country is required');
});
