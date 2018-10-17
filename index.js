document.addEventListener("DOMContentLoaded", function() {
  Controller.getBooks()
});

function render(book) {
  bookList = document.querySelector('ul#list')
  bookElem = document.createElement('li')
  bookElem.innerText = book.title
  bookElem.id = book.id
  bookElem.addEventListener('click', Controller.getBookInfo)
  bookList.appendChild(bookElem)
}

function showBook(data) {
  let panel = document.querySelector(`div#show-panel`)
  panel.innerHTML = ''

  // Create elems
  let header = document.createElement('h2')
  let desc = document.createElement('p')
  let img = document.createElement('img')
  let users = document.createElement('ul')
  let btn = document.createElement('button')

  // Assign properties to elems
  header.innerText = data.title
  desc.innerText = data.description
  img.src = data.img_url 
  data.users.forEach(user => {
    let li = document.createElement('li')
    li.id = user.id
    li.innerText = user.username
    users.appendChild(li)
  })

  btn.id = `btn-${data.id}`
  btn.innerText = 'Read Book'
  btn.addEventListener('click', Controller.readBook)

  // Append elems to DOM
  panel.appendChild(header)
  panel.appendChild(desc)
  panel.appendChild(img)
  panel.appendChild(users)
  panel.appendChild(btn)
}
