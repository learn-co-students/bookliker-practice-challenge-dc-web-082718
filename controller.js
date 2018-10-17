class Controller {
  static getBooks() {
    fetch(`http://localhost:3000/books`)
    .then(res => res.json())
    .then(json => {
      json.forEach(book => {
        render(book)
      })
    })
  }

  static getBookInfo(event) {
    let id = event.target.id
    fetch(`http://localhost:3000/books/${id}`)
    .then(res => res.json())
    .then(json => showBook(json))
  }

  static readBook(event) {
    let id = event.target.id.split("btn-")[1]
    fetch(`http://localhost:3000/books/${id}`)
    .then(res => res.json())
    .then(json => {
      let result = json.users.find(user => user.id == 1)
       // Hard coded for the first user 'pouros'
      if (result === undefined) {
        let newUsers = json.users.push({"id": 1, "username": "pouros"})
        Controller.addSelfLike(json.id, newUsers)
      } else {
        alert("You've already liked this book dummy!")
      }
    })
  }

  static addSelfLike(bookID, newUsers) {
    fetch(`http://localhost:3000/books/${bookID}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "users": newUsers
      })
    })
    .then(res => res.json())
    .then(json => showBook(json))
  }
}
