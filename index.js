// Populate card

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
return parent.appendChild(el);
}

let articles

let ApiURL = 'http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article'

fetch(ApiURL).then((response) => {
  return response.json();
}).then((json) => {
  articles = json;
  console.log(articles)
  initialize();
}).catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});

function initialize() {
  const main = document.querySelector('main');
  

    const section = createNode('div');
    section.setAttribute('class', 'articles');

    for(let article of articles){
      const card = createNode('div');
      card.setAttribute('class', 'card')

      console.log(article.id,article.author)

      const h4 = createNode('h4')
      h4.innerHTML = truncateString(article.title, 30)

      const link = createNode('a')
      link.setAttribute('class', 'article-link')
      link.setAttribute('href', `${article.url}`)
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

      append(card, h4)
      append(card, link)
      append(card, imgContainer)
      append(imgContainer, img)
      append(imgContainer, autorName)
      append(section, card)
    }



    append(main, section)

}

// Modal 
const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
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