import { User } from './class/User.js'

const login_link_a = document.querySelector('a#login-link')

const user = new User()

if (user.isLoggedIn) {
  login_link_a.innerHTML = "Logout"
  login_link_a.href="logout.html"
} else {
  login_link_a.innerHTML = "Login"
  login_link_a.href="login.html"
}