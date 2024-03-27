import { BACKEND_URL } from "../config.js"

class User {
  #id = undefined
  #email = undefined

  constructor() {
    const userFromStorage = sessionStorage.getItem('user')
    if (userFromStorage) {
      const userObject = JSON.parse(userFromStorage)
      this.#id = userObject.id
      this.#email = userObject.email
    }
  }

  get id() {
    return this.#id
  }

  get email() {
    return this.#email
  }

  get isLoggedIn() {
    return this.#id !== undefined ? true : false
  }

  async login(email,password) {
    const data = JSON.stringify({email: email,password: password})
    const response = await fetch(BACKEND_URL + '/user/login',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: data
    })
    if (response.ok === true) {
      const json = await response.json()
      this.#id = json.id
      this.#email = json.email
      sessionStorage.setItem('user',JSON.stringify(json))
      return this
    } else {
      throw response.statusText
    }
  }

  async register(email,password) {
    const data = JSON.stringify({email: email,password: password})
    const response = await fetch(BACKEND_URL + '/user/register',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: data
    })
    if (response.ok === true) {
      const json = await response.json()
      return json.id
    } else {
      throw response.statusText
    }
  }

  logout() {
    this.#id = undefined
    this.#email = undefined
    sessionStorage.removeItem('user')
  }

}

export { User }