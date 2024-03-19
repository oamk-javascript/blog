class Post {
  #id
  #message

  constructor(id,message) {
    this.#id = id
    this.#message = message
  }

  getId() {
    return this.#id
  }

  getMessage() {
    return this.#message
  }
}

export { Post }