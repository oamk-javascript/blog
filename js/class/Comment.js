class Comment {
  #id
  #text
  #date
  #author

  constructor(id,text,date,author) {
    console.log(id)
    this.#id = id
    this.#text = text
    this.#date = date
    this.#author = author
  }

  get id() {
    return this.#id
  }

  get text() {
    return this.#text
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
}

export { Comment }