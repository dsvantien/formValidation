const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

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

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

//jquery
$(document).ready(function() {
            const username = $('#username');
            const email = $('#email');
            const password = $('#password');
            const password2 = $('#password2');

            const showError = (input, message) => {
                input.parent().find('small').text(message).css('color', 'red');
                input.parent().find('input').css('border-color', 'red');

            }
            const showSucess = (input) => {
                input.parent().find('input').css('border-color', 'green');
            }
            const checkvalidation = (arrInput) => {
                $.each(arrInput, (index, input) => {
                    if (input.val() === "") {
                        showError(input, `${input.attr('id')} is required`);
                    } else {
                        showSucess(input);
                    }
                })
            }
            const checkLength = (arrInput, min, max) => {
                $.each(arrInput, (index, input) => {
                    if (input.val().length < min) {
                        showError(input, `${input.attr('id')} as least ${min} character`);
                    } else if (input.val().length > max) {
                        showError(input, `${input.attr('id')} must be smaller than ${max} character`);
                    } else {
                        showSucess(input);
                    }
                })
            }
            const checkMatchPassword = (input1, input2) => {
                if (input1.val() !== input2.val()) {
                    showError(input1, 'password not match');
                    showError(input2, 'password not match');
                } else {
                    showSucess(input1);
                    showSucess(input2);
                }
            }
            const validateEmail = (input) => {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(input.val().trim())) {
                    showError(input, 'invalid email');
                } else {
                    showSucess(input);
                }
            }
            $('form').submit(function(e) {
                e.preventDefault();
                checkvalidation([username, email, password, password2])
                checkLength([username, password], 3, 30);
                checkMatchPassword(password, password2);
                validateEmail(email);
            })

        });
