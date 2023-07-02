let bookList = []

function Book (bookName, authorName, status) {
    this.bookName = bookName,
    this.authorName = authorName,
    this.status = status
}

const bookDisplay = document.querySelector(".book-display")
const bookName = document.querySelector("#bookName")
const authorName = document.querySelector("#authorName")
const status = document.querySelector("#status")

checkLocalStorage()
renderBookList()

document.querySelector(".book-form").addEventListener("submit", (e) => {
    e.preventDefault()
    addBook()
    updateLocalStorage()
    clearForm()
    
})

document.querySelector("#clear-btn").addEventListener("click", (e) => {
    if (confirm("Are you sure you want to clear all books?")) {
        clearBooks()
        updateLocalStorage()
        renderBookList()
    }
})

bookDisplay.addEventListener("click", (e) => {
    if (e.target.textContent == "Delete") {
        if (confirm("Are you sure you want to delete this book?")) {
            deleteBook(e)
            updateLocalStorage()
        }
    }
    if (e.target.classList.contains("status-btn")) {
        updateStatus(e)
        updateLocalStorage()
    }
})

function checkLocalStorage() {
    if (localStorage.getItem("bookList")) {
      bookList = JSON.parse(localStorage.getItem("bookList"))
    }     
}

function updateLocalStorage() {
    localStorage.setItem("bookList", JSON.stringify(bookList))
}

function renderBookList() {
    bookDisplay.textContent = ""
    let index = 0
    for (let book of bookList) {
        bookDisplay.insertAdjacentHTML("beforeend", createBookDiv(book, index))
        index+=1
    }
}

function createBookDiv(book, index) {
    let btnColor = ""
    if (book.status === "Read") {
        btnColor = "darkgreen"
    }
    else {
        btnColor = "orange"
    }
    const bookDiv = `
    <div data-index="${index}">
        <p>Book Name: ${book.bookName}</p>
        <p>Author Name: ${book.authorName}</p>
        <button class="status-btn" style="background-color:${btnColor}">${book.status}</button>
        <button class="delete-btn">Delete</button>
    </div>
    `
    return bookDiv
}

function addBook() {
    let newBook = new Book (bookName.value, authorName.value, status.value)
    index = bookList.push(newBook) - 1 
    bookDisplay.insertAdjacentHTML("beforeend", createBookDiv(newBook, index))
}

function clearForm() {
    bookName.value = ""
    authorName.value = ""
    status.value = "Not read"
}

function clearBooks() {
    bookList = []
}

function deleteBook (e) {
    currentIndex = e.target.parentNode.getAttribute("data-index")
    bookList.splice(currentIndex, 1)
    e.target.parentNode.remove()
    const allBookDivs = document.querySelectorAll(".book-display div") 
    for (let i = currentIndex; i < allBookDivs.length; i++) {
        allBookDivs[i].setAttribute("data-index", `${i}`)
    }
}

function updateStatus (e) {
    index = e.target.parentNode.getAttribute("data-index")
    if (e.target.textContent === "Read") {
        e.target.textContent = "Not read"       
        bookList[index].status = "Not read"
        e.target.setAttribute('style', "background-color: orange")
    }
    else {
        e.target.textContent = "Read"
        bookList[index].status = "Read"
        e.target.setAttribute('style', "background-color: darkgreen")    
    }
}