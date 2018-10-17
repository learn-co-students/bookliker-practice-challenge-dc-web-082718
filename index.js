let Me = "Angelica";
let myId = 1;

document.addEventListener("DOMContentLoaded", function() {

  getAllBooks();
});

function getAllBooks(){
  fetch("http://localhost:3000/books").
  then(res => res.json()).
  then(data => {data.forEach(book => renderBook(book))})
}


function renderBook(book){
  let id = book.id;
  let title = book.title;

  let listUL = document.getElementById('list');

  let bookLI = document.createElement('li');
  bookLI.innerText = book.title
  bookLI.id = book.id;
  bookLI.addEventListener('click', getBookDetails)

  listUL.appendChild(bookLI);
}


function getBookDetails(e){
  let id = e.currentTarget.id;
  fetch(`http://localhost:3000/books/${id}`).
  then(res => res.json()).
  then(book => showBookDetails(book))
}


function showBookDetails(book){
  let showDiv = document.getElementById('show-panel');

  showDiv.innerHTML = ""


  let id = book.id;
  let title = book.title;
  let desc = book.description;
  let url = book.img_url;

  let usersWithId = book.users;

  let usersNames = [];
// debugger
  book.users.forEach(user => {
    let name = user.username;
    usersNames.push(` ${name}`)
  })


  let h2 = document.createElement('h2');
  h2.innerText = title;

  let h6 = document.createElement('h6');
  h6.innerText = desc;

  let thumb = document.createElement('img');
  thumb.src = url;

  let h5 = document.createElement('h5');
  h5.classList.add('likedBy');
  h5.innerText = `Liked By: ${usersNames}`;

  let hidden = document.createElement('p')

  usersWithId.forEach(user => {
    hidden.innerText += `{id: ${user.id}, username: ${user.username}}\n`
  } )


  hidden.style.visibility = "hidden"
  let button = document.createElement('button');
  if (!h5.innerText.includes(Me)){
    button.innerText = "like";
  } else {
    button.innerText = "unlike";

  }
  button.id = id;
  button.addEventListener('click', likeBook)

  showDiv.appendChild(thumb);
  showDiv.appendChild(h2);
  showDiv.appendChild(button);
  showDiv.appendChild(h6);
  showDiv.appendChild(h5);
  showDiv.appendChild(hidden);
}


function likeBook(e){

  let id = e.target.id;
  // let users = e.target.parentElement.lastElementChild.innerHTML.split("<br>")
  // users = users.slice(0, users.length-1)
  // users += "{id: 1, username: Angelica}"


   let likedBy = document.querySelector('.likedBy')

  if (!likedBy.innerText.includes(Me)){

    fetch(`http://localhost:3000/books/${id}`).then(res => res.json()).then(data => {
// debugger
      data.users.push({id: myId, username: Me})

      fetch(`http://localhost:3000/books/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            "users" : data.users
          })
        }).
        then(res => res.json()).
        then(data => showBookDetails(data))
      }

    )


  } else {
    fetch(`http://localhost:3000/books/${id}`).then(res => res.json()).then(data => {
      data.users.pop()

      fetch(`http://localhost:3000/books/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            "users" : data.users
          })
        }).
        then(res => res.json()).
        then(data => showBookDetails(data))
      }
    )

  }
}
