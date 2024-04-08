import { Posts } from './class/Posts.js'
import { User } from './class/User.js'

const user = new User()
const posts = new Posts()

const posts_div = document.querySelector('div#posts')
const add_new_post_link = document.querySelector('a#add-new-post-link')
const modal_window = document.querySelector('div#modal')
const close_span = document.querySelector('span.close')

if (user.isLoggedIn) {
  add_new_post_link.style.display = "block"
}

const render_post_article = (post) => {
  const post_article = posts_div.appendChild(document.createElement('article'))
  post_article.setAttribute('data-key',post.id.toString())
  post_article.setAttribute('class','card post-article')
  render_post_title(post_article,post)
  render_post_by(post_article,post)
  render_post_p(post_article,post)
  render_commentcount(post_article,post)
  if (user.isLoggedIn) render_comment_field(post_article,post)
  
}

const render_post_title = (parent_element,post) => {
  const post_title = parent_element.appendChild(document.createElement('h3'))
  post_title.setAttribute('class','card-title')
  post_title.innerHTML = post.title
}

const render_post_by = (parent_element,post) => {
  const author_p = parent_element.appendChild(document.createElement('p'))
  author_p.innerHTML = `by ${post.author} ${post.formattedDate}`
}

const render_post_p = (parent_element,post) => {
  const post_p = parent_element.appendChild(document.createElement('p'))
  post_p.innerHTML = post.message  
  render_post_span(post_p,post)
}

const render_post_span = (parent_element,post) => {
  const post_span = parent_element.appendChild(document.createElement('span'))
  render_post_link(post_span,post)
}

const render_post_link = (parent_element,post) => {
  const post_a = parent_element.appendChild(document.createElement('a'))
  post_a.innerHTML = '<i class="bi bi-trash"></i>'
  post_a.addEventListener('click',(event) => {
    posts.removePost(post.id).then(removed_id => {
      const article_to_remove = document.querySelector(`[data-key='${removed_id}']`)
      if (article_to_remove) {
        posts_div.removeChild(article_to_remove)
      }
    }).catch(error => {
      alert(error)
    })
  })
}

const render_commentcount = (parent_element,post) => {
  const comment_p = parent_element.appendChild(document.createElement('p'))
  comment_p.setAttribute('id','comment' + post.id)
  comment_p.innerHTML = "Comments " + post.comments
  comment_p.addEventListener('click',()=> {
    render_comments(post)
    modal_window.style.display = 'block'
  })
}

const render_comments = (post) => {
  const comments_ul = document.querySelector('ul#comment-list')
  comments_ul.innerHTML = ""
  posts.getComments(post.id).then(comments => {
    comments.forEach(comment => {
      const li = document.createElement('li')
      li.innerHTML = comment.text + ' by ' + comment.author + ' ' + comment.formattedDate
      comments_ul.appendChild(li)
    })
  }).catch(error => {
    alert(error)
  })
}

const render_comment_field =(parent_element,post) => {
  const comment_textarea = parent_element.appendChild(document.createElement('textarea'))
  comment_textarea.addEventListener('keypress',(event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      const comment_text = comment_textarea.value

      const data = JSON.stringify({comment: comment_text,account_id:user.id,post_id:post.id})
      posts.addComment(data).then(count => {
        comment_textarea.value = ''
        document.querySelector('p#comment' + post.id).innerHTML = "Comments " + count
      }).catch(error => {
        alert(error)
      })   
    }
  })
}

close_span.addEventListener('click',() => {
  modal_window.style.display = 'none'
})

window.addEventListener('click',(event) => {
  if (event.target === modal_window) {
    modal_window.style.display = 'none'
  }
})

const getPosts = () => {
  posts.getPosts().then(post_objects => {
    post_objects.forEach(post_object => {
      render_post_article(post_object)
    });
  }).catch(error => {
    alert(error)
  })
}
/* 
message_input.addEventListener('keypress',(event) => {
  if (event.key === "Enter") {
    event.preventDefault()
    const message_text = message_input.value.trim()
    if (message_text!=='') {
      posts.addPost(message_text).then(post => {
        render_post_article(post)
        message_input.value = ''
        message_input.focus()
      })
    }
  }
}) */

getPosts()
