let bookData = [];
let user1 = {"id":1, "username":"pouros"};

document.addEventListener("DOMContentLoaded", function()
{
  fetch('http://localhost:3000/books')
    .then(response => response.json())
      .then(data =>
      {
        bookData = data;
        let div = document.getElementById('list-panel');

        data.forEach(object =>
        {
          let btn = document.createElement('btn');
          // li.innerHTML = `
          //   <button id='${object['id']}'>'${object['title']}'</button>
          // `;
          btn.id = object['id'];
          btn.innerText = object['title'];
          btn.addEventListener('click', addButtonListener);
          div.appendChild(btn);
        });
      });
});

function addButtonListener()
{
  let btn = event.currentTarget;
  let index = btn.id - 1;
  console.log(btn.id)
  let element = document.getElementById('show-panel');
  element.innerHTML = '';
  let image = document.createElement('img');
  image.src = bookData[index]['img_url'];
  element.appendChild(image);
  let paragraph = document.createElement('p');
  paragraph.innerText = bookData[index]['description'];
  element.appendChild(paragraph);

//   <a target="_blank" href="img_forest.jpg">
//   <img src="img_forest.jpg" alt="Forest">
// </a>

  let ul = document.createElement('ul');
  bookData[index]['users'].forEach(object =>
  {
    let li = document.createElement('li');
    li.innerText = object['username'];
    ul.appendChild(li);
  });
  element.appendChild(ul);
  let likeBtn = document.createElement('button');
  likeBtn.id = `${btn.id}likeBtn`;
  likeBtn.innerText = "Like"
  likeBtn.addEventListener('click', addLikeBtnListener);
  element.appendChild(likeBtn);

};

function addLikeBtnListener()
{
  let btn = event.currentTarget;
  likeBook(parseInt(btn.id));
}

function likeBook(id)
{
  debugger;
  let index = id - 1;
  let likedUsers = bookData[index]['users'].push(user1);
  likedUsers = {'users': likedUsers}
  fetch(`http://localhost:3000/books/${id}`,
  {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(likedUsers)
  })
    .then(response => response.json())
      .then(data => console.log(data));
}
