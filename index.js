document.addEventListener("DOMContentLoaded", function(){
  fetchAllBooks()
});

function fetchAllBooks(){
  fetch(`http://localhost:3000/books`)
    .then(response => response.json())
    .then(json => {
      json.forEach(book => listBook(book))
    })
}

function listBook(book){
    let liElement = document.createElement("li")
    liElement.innerText = book.title
    liElement.id = `book-${book.id}`
    liElement.addEventListener('click', bookListener)

    document.querySelector("#list").appendChild(liElement)
}

function bookListener(){
    let id = event.currentTarget.id.split("-")[1]

    fetch(`http://localhost:3000/books/${id}`)
      .then(response => response.json())
      .then(book => {
        getLikersAndShowBook(book)
      })
}

function getLikersAndShowBook(book){
  let likers = []

  book.users.forEach(user => likers.push(user.username))
  showBook(book, likers)
}

function showBook(book, likers){
  document.querySelector("#show-panel").innerHTML = ""
  let divElement = document.createElement("div")

  //h2 - book title
  let h2Element = document.createElement("h2")
  h2Element.innerText = book.title
  divElement.appendChild(h2Element)

  //img - book pic
  let imgElement = document.createElement("img")
  imgElement.src = book.img_url
  divElement.appendChild(imgElement)

  //p - book description
  let pElement = document.createElement("p")
  pElement.innerText = book.description
  divElement.appendChild(pElement)

  //ul - add likers
  let ulElement = document.createElement("ul")
  ulElement.innerText = "Likers: "
  likers.forEach(liker => {
    let liElement = document.createElement("li")
    liElement.innerText = liker
    ulElement.appendChild(liElement)
  })
  divElement.appendChild(ulElement)

  //button
  let buttonElement = document.createElement("button")
  buttonElement.id = `likeBtn-${book.id}`
  buttonElement.innerText = "Like?"
  divElement.appendChild(buttonElement)
  buttonElement.addEventListener("click", likeListener)

  //append everything now
  document.querySelector("#show-panel").appendChild(divElement)
}

function likeListener(){
  let id = event.currentTarget.id.split("-")[1]
  let updatedUsersArray = []

  fetch(`http://localhost:3000/books/${id}`)
    .then(response => response.json())
    .then(book => {
      if(checkIfLiked(book)){
        alert("You already liked this book!")
      } else {
        updatedUsersArray.push(book.users)
        updatedUsersArray = updatedUsersArray.flat()
        updatedUsersArray.push({id: 1, username: "pouros"})
        postLike(id, updatedUsersArray)
      }
    })
}

function checkIfLiked(book){
  return book.users.some(user => user.id === 1)
}

function postLike(id, updatedUsersArray){
  let data = {users: updatedUsersArray}

  fetch(`http://localhost:3000/books/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify(data)})
      .then(response => response.json())
      .then(updatedBook => {
        getLikersAndShowBook(updatedBook)
      })
}
