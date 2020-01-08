// Populate card

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
return parent.appendChild(el);
}

let articles
let comments
let currentPage = 1
let page = 1
let limit = 10

let ApiURL = `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article?page=1&limit=10`

fetch(ApiURL).then((response) => {
  return response.json();
}).then((json) => {
  articles = json;
  initialize();
}).catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});

function viewContent(e){
  e.preventDefault()
  e.stopPropagation()
  const id = e.target.getAttribute('data-id');
  if(id) {
    openModal(e)
    articles.forEach(article => {
      const articleId = article.id
      if(articleId == id) {
        console.log(article.id)
        const attachTitle = document.getElementById('viewTitle')
        attachTitle.innerHTML = article.title

        const attachLink = document.getElementById('viewId')
        attachLink.href = article.url

        const attachImage = document.getElementById('viewImg')
        attachImage.src = article.avatar

        document.getElementById('commmentBtn'),addEventListener('click', submitComment)
         function submitComment() {
          const URL = `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${id}/comments`

        let comment = document.getElementById('commentText').value
        let avatar = document.getElementById('viewImg').src

        fetch(URL, {
          method: 'POST',
          headers: new Headers(),
          body: JSON.stringify({
            comment: comment,
            avatar: avatar
          })
        }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
        
        // alert('Article has been added!')
        // location.reload()
        }
      
        const URL = `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${id}/comments`
        fetch(URL).then((response) => {
          return response.json();
        }).then((json) => {
          comments = json
          if(id) {
            comments.forEach(comment => {
              const commentId = comment.id
              if(commentId) {
                const name = document.getElementById('commentName')
                name.innerHTML = comment.name

                const commentTextArea = document.getElementById('commentTxt')
                commentTextArea.innerHTML = comment.comment

                const commentImage = document.getElementById('commentImg')
                commentImage.src = comment.avatar
              }
            })
          }
        })
      }
    })
    }
}

function deleteArticle(e) {
  const id = e.target.getAttribute('data-id')
  if(id) {
    let url = `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    alert('Article has been Deleted!')
    location.reload();
  }
}


function openModal(e) {
  const modalId = e.target.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
}

function initialize() {
  const main = document.querySelector('main');
  

    const section = createNode('div');
    section.setAttribute('class', 'articles');

    const pagination_element = createNode('div')
    pagination_element.setAttribute('class', 'page-numbers')
    pagination_element.setAttribute('id', 'pagination')

    for(let article of articles){
      const card = createNode('div');
      card.setAttribute('class', 'card')

      const actionSection = createNode('div')
      actionSection.setAttribute('class', 'action-section')

      const delete_button = createNode('button');
      delete_button.setAttribute('class','delete-button')
      delete_button.setAttribute('data-id', article.id)
      delete_button.innerHTML = 'Trash'
      delete_button.setAttribute('id','delete')
      delete_button.addEventListener('click', deleteArticle)

      const view_button = createNode('button')
      view_button.setAttribute('class', 'view-button')
      view_button.setAttribute('data-id', article.id)
      view_button.setAttribute('data-open', 'modal2')
      view_button.addEventListener('click', viewContent)
      view_button.innerHTML = 'view'


      const h4 = createNode('h4')
      h4.innerHTML = truncateString(article.title.replace(article.title.charAt(0), article.title.charAt(0).toUpperCase()), 30)

      const link = createNode('a')
      link.setAttribute('class', 'article-link')
      link.setAttribute('href', `${article.url}`)
      link.setAttribute('target', '_blank')
      link.innerHTML = 'Visit Link'

      const imgContainer = createNode('div')
      imgContainer.setAttribute('class', 'card-bottom')

      const img = createNode('img')
      img.setAttribute('class', 'card-img')
      img.src = article.avatar

      const autorName = createNode('h4')
      autorName.setAttribute('class', 'author')

      if(article.author != undefined) {
        autorName.innerHTML = article.author;
      } else {
        let sortArray = ['Recee james', 'Habeeb Mac-iver', 'John Olubori', 'Charles Osuya', 'Ogu Chinedu', 'Osukalu Chukwuma', 'George Iwu', 'Ebuka Ezeh', 'Ekeh Jasper']
        let sortedNames = getRandom(sortArray, 1)[0]

        autorName.innerHTML = sortedNames
      }

      append(actionSection, view_button)
      append(actionSection, delete_button)
      append(card, actionSection)
      append(card, h4)
      append(card, link)
      append(card, imgContainer)
      append(imgContainer, img)
      append(imgContainer, autorName)
      append(section, card)
      append(section, pagination_element)
    }



  append(main, section)

}

document.getElementById('createForm').addEventListener('submit', createArticle)

function createArticle(event) {

  event.preventDefault();

  const URL = 'http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article'

  let author = document.getElementById('author').value
  let avatar = document.getElementById('avatar').value
  let title = document.getElementById('title').value
  let url = document.getElementById('url').value

  fetch(URL, {
    method: 'POST',
    headers: new Headers(),
    body: JSON.stringify({
      author: author,
      avatar: avatar,
      title: title,
      url:url
    })
  }).then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error))

  alert('Article has been added successfully')
  location.reload()
}

// Modal 
const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (const el of openEls) {
  el.addEventListener("click", openModal);
}

for (const el of closeEls) {
  el.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

document.addEventListener("click", e => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", e => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

// Truncate Long Text
function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

function getRandom(arr, n) {
  let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function paginateData(data_per_page, page) {
  fetch(ApiURL).then((response) => {
    return response.json();
  }).then((json) => {
    pagArticles = json;
  }).catch((err) => {
    console.log('Fetch problem: ' + err.message);
  });

  console.log()
  //   let loop_start = data_per_page * page
  // let paginatedItems = article.slice(loop_start, loop_start + data_per_page)
  // console.log(paginatedItems)
}

