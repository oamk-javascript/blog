import { User } from "./class/User.js";

const user = new User()
const email_input = document.querySelector('#user-email')
const password_input = document.querySelector('#password')

document.querySelector('#signup-button').addEventListener('click',(event) => {
  event.preventDefault()
  const email = email_input.value
  const password = password_input.value

  user.register(email, password).then(user => {
    window.location.href="login.html"
  }).catch(error => {
    alert(error)
  })
})