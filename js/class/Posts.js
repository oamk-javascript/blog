import { BACKEND_URL } from '../config.js'
import { Post } from './Post.js'

class Posts {
  #posts = []
  
  getPosts = () => {
    return new Promise(async(resolve,reject)=> {
      fetch(BACKEND_URL)
      .then(response => response.json())
      .then(json => {
        this.#readJson(json)
        resolve(this.#posts)
      }),(error) => {
        reject(error)
      }
    })
  }

  addPost = (message_text) => {
    return new Promise(async(resolve, reject)=> {
      const json = JSON.stringify({message:message_text})
      fetch(BACKEND_URL + '/new',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: json
      })
      .then(response => response.json())
      .then(json => {
        resolve(this.#addToArray(json.id,message_text))
      }),(error => {
        reject(error)
      })
    })
  }

  removePost = (id) => {
    return new Promise(async(resolve, reject)=> {
      fetch(BACKEND_URL + '/delete/' + id,{
        method: 'delete'
      })
      .then(response => response.json())
      .then(json => {
        this.#removeFromArray()
        resolve(id)
      }),(error => {
        reject(error)
      })
    })
  }

  #readJson = (json) => {
    json.forEach(node => {
      const post = new Post(node.id,node.message)
      this.#posts.push(post)
    });
  }

  #addToArray = (id,message_text) => {
    const post = new Post(id,message_text)
    this.#posts.push(post)
    return post
  }

  #removeFromArray = (id) => {
    const arrayWithoutRemoved = this.#posts.filter(post => post.id !== id)
    this.#posts = arrayWithoutRemoved
  }
}

export { Posts }