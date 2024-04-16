import { User } from "./class/User.js";
import { Posts } from "./class/Posts.js";

const user = new User()
const posts = new Posts()

const title_input = document.querySelector('input#title')
const message_textarea = document.querySelector('textarea#message')
const file_input = document.querySelector('input[type=file]')

document.querySelector('button#save-button').addEventListener('click',(event) => {
  event.preventDefault()
  const title = title_input.value
  const message = message_textarea.value

  const formData = new FormData()
  formData.append('title',title)
  formData.append('message',message)
  formData.append('account_id',user.id)
  formData.append('image',file_input.files ? file_input.files[0] : null)

  //const json = JSON.stringify({title: title,message: message,account_id:user.id})

  if (title!=='' && message!=='') {
    posts.addPost(formData,user.token).then(post => {
      window.location.href="index.html"
    }).catch(error => {
      alert(error)
    })
  } else {
    alert('Post must have title and message!')
  }
})