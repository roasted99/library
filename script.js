//constructor
function Book(title, author, pages, isbn) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isbn = isbn
}

function displayBook() {
    const books = getBooks();
    books.forEach(book => addBookToLibrary(book));
}

//add book to the table body
function addBookToLibrary(book) {
    const list = document.querySelector('#book-list')
    const row = document.createElement('tr')
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.isbn}</td>
    <td><input type="button" class="book-status" value="Read"></input></td>
    <td><button class="delete">X</button></td>
    `;

    list.appendChild(row);
}

function showAlert (message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form);

    //set timeout
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
}

function deleteBook(el) {
    if (el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
    }
}

function clearField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#isbn').value = '';
}

//local storage

function getBooks(){
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books
};

function addBooks(book){
    const books = getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
};

function removeBook(isbn) {
    const books = getBooks();
    books.forEach((book, index) => {
        if (book.isbn === isbn) {
            books.splice(index, 1)
    }});
    localStorage.setItem('books', JSON.stringify(books))
};

//Event to display book
document.addEventListener('DOMContentLoaded', displayBook());

//change status
const changeStatus = document.querySelectorAll('.book-status');
changeStatus.forEach(change => change.addEventListener('click', (e) => {
    if (e.target.value === 'Read') {
        e.target.value = 'Not Read';
    } else {
        e.target.value = 'Read';
    }
}));

//Event to add book
document.querySelector('#book-form').addEventListener('submit', e => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const isbn = document.querySelector('#isbn').value;

    //validate
    if (title === '' || author === '' || pages === '' || isbn === '') {
        showAlert('Please fill in all field', 'danger');
    } else {
        const book = new Book(title, author, pages, isbn);

        addBookToLibrary(book);

        //add book to storage
        addBooks(book);
    
        showAlert('Book Added', 'success');

        clearField();
    }
    
});

//delete book
document.querySelector('#book-list').addEventListener('click', e => {
    //remove book
    deleteBook(e.target);

    //remove book from storage 
    removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

    showAlert('Book Removed', 'success');
})


