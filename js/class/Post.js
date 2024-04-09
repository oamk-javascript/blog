class Post {
  #id
  #title
  #message
  #image
  #date
  #author
  #comments

  constructor(id,title,message,image,date,author,comments) {
    this.#id = id
    this.#title = title
    this.#message = message
    this.#image = image
    this.#date = date
    this.#author = author
    this.#comments = comments
  }

  get id() {
    return this.#id
  }

  get title() {
    return this.#title
  }

  get message() {
    return this.#message
  }

  get image() {
    return this.#image
  }

  get date() {
    return this.#date
  }

  get formattedDate() {
    const date_from_database = new Date(this.#date) 
    const day = date_from_database.getDate()
    const month = date_from_database.getMonth()
    const year = date_from_database.getFullYear()
    return `${day}.${month}.${year}`
  }

  get author() {
    return this.#author
  }

  get comments() {
    return this.#comments
  }
}

export { Post }