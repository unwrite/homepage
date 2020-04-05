const POST_URL = 'https://api.producthunt.com/widgets/upcoming/v1/upcoming/please-stack/forms'

const emailForm = document.getElementById('form')
const emailField = document.getElementById('email')
const successMessage = document.getElementById('success')
const emailValidationIcon = document.getElementById('email-validation')
const emailValidationText = document.getElementById('email-invalid')
const submit = document.getElementById('submit')
var showError = false

emailField.addEventListener('keyup', checkEmail)

function checkEmail(event) {
  // If press enter
  if (event && event.keyCode === 13) {
    subscribe()
  }

  if (showError == true) {
    if (!validateEmail(emailField.value)) {
      emailValidationText.style.display = 'block'

      // Remove Success Classes
      emailField.classList.remove('is-success')
      emailValidationIcon.classList.remove('has-text-success')

      // Add Error Icon
      emailValidationIcon.innerHTML = '⚠️'
      emailField.classList.add('is-danger')
    } else {
      emailValidationText.style.display = 'none'

      // Remove Error Classes
      emailField.classList.remove('is-danger')

      // Add Success Classes
      emailField.classList.add('is-success')
      emailValidationIcon.classList.add('has-text-success')
      emailValidationIcon.innerHTML = '&#x2714'
    }
  }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

function subscribe() {
  if (validateEmail(emailField.value)) {
    submit.classList.add('is-loading')
    axios
      .post(
        POST_URL,
        {
          email: emailField.value
        }
      )
      .then(function(response) {
        successMessage.style.display = 'block'
        emailForm.style.display = 'none'
        submit.classList.remove('is-loading')
      })
      .catch(function(error) {
        successMessage.style.display = 'block'
        emailForm.style.display = 'none'
        submit.classList.remove('is-loading')
      })
  } else {
    showError = true
    checkEmail()
  }
}
