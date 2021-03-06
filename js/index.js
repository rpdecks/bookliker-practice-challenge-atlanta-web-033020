document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");
    getListOfBooks()
});

function getListOfBooks(){
    fetch('http://localhost:3000/books')
    .then(function(response) {
        return response.json();
    })
    .then(function(response){
        listTheBooks(response)
    })
}

function listTheBooks(response){
    parent = document.getElementById('list')
    response.forEach(function(book){
        bookLi = document.createElement('li')
        bookLi.innerText = book.title
        bookLi.addEventListener('click', (event) => {
            expandBook(book)
        })
        parent.appendChild(bookLi)
    })
}

function expandBook(book) {
    let parent = document.getElementById('show-panel')
    let title = document.createElement('h3')
    title.innerText = book.title
    let book_img = document.createElement('img')
    book_img.src = book.img_url
    let desc = document.createElement('p')
    desc.innerText = book.description
    while ( parent.lastChild ) {
        parent.lastChild.remove()
    }
    parent.append(title, book_img, desc)
    let users = book.users;
    users.forEach(function(user){
        userUl = document.createElement('div')
        userUl.innerText = user.username
        parent.appendChild(userUl)
    })
    // create and add like button to page with listener for click
    likeBtn = document.createElement('btn')
    likeBtn.addEventListener('click', (event) => {
        likeBook(book)
    })
    likeBtn.innerText = 'Like'
    likeBtn.className = 'button'
    parent.appendChild(likeBtn)
}

function likeBook(book){
    const newUser = {id: 1, username: "pouros"} 
    found = book.users.find((user) => {
        return user.id === newUser.id
    })
    if ( found )
        book.users.splice(book.users.indexOf(found), 1)
    else
        book.users.push(newUser)
    const bookObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            users: book.users
        })
    }
    fetch(`http://localhost:3000/books/${book.id}`, bookObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(response){
        expandBook(response)
    })
}

array = [1, 2, 3, 4, 5]
let newary = array.map(function(element){
    return element * element
})
console.log(newary)

// let filAry = array.filter(function(element){
//     return element % 2 === 0
// })

let filAry = array.filter(e => e % 2 === 0)
console.log(filAry)

let sum = array.reduce((agg, e) => agg + e)
console.log(sum)