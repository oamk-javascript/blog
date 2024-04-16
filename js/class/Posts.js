import { BACKEND_URL } from '../config.js'
import { Post } from './Post.js'
import { Comment } from './Comment.js'

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

  /* addPost = (data) => {
    return new Promise(async(resolve, reject)=> {
      fetch(BACKEND_URL + '/new',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: data
      })
      .then(response => response.json())
      .then(json => {
        resolve(this.#addToArray(json.id,json.message))
      }),(error => {
        reject(error)
      })
    })
  } */

  async addPost(formData,token) {
    const response = await fetch(BACKEND_URL + '/new',{
      method: 'post',
      //headers: {'Content-Type':'application/json'},
      headers: {Authorization: token},
      body: formData
    })

    if (response.ok === true) {
      const json = await response.json()
      return this.#addToArray(json.id,json.message)
    } else {
      throw response.statusText
    }
  }

  async getComments (post_id) {
    const response = await fetch(BACKEND_URL + '/comments/' + post_id)
    if (response.ok === true) {
      const json = await response.json()
      const comments = []
      json.forEach(node => {
        const comment = new Comment(node.id,node.comment_text,node.saved,node.email)
        comments.push(comment)
      })

      return comments
    } else {
      throw response.statusText
    }
  }


  async addComment(data) {
    const response = await fetch(BACKEND_URL + '/comment',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: data
    })

    if (response.ok === true) {
      const json = await response.json()
      return json
    } else {
      throw response.statusText
    }
  }

  async removePost(id,token)  {
    const response = await fetch(BACKEND_URL + '/delete/' + id,{
      method: 'delete',
      headers: {Authorization: token},
    })

    if (response.ok === true) {
      this.#removeFromArray(id)
      return id
    } else {
      throw response.statusText
    }
  }

  #readJson = (json) => {
    json.forEach(node => {
      const post = new Post(node.id,node.title,node.message,node.image_name,node.saved,node.email,node.comment_count)
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