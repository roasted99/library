let myLibrary = [
    {
        title: '1984',
        author: 'George Orwell',
        pages: 298,
        isbn: 9780451524935
    },
    {
        title: 'The Alchemist',
        author: 'Paul Coelho',
        pages: 208,
        isbn: 125132351351
    }
];

//constructor
function Book(title, author, pages, isbn) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isbn = isbn
}

function displayBook() {
    const books = myLibrary;
    books.forEach(book => addBookToLibrary(book));
}

//add book to the table body
function addBookToLibrary(book) {
    const list = document.querySelector('#book-list')
    const row = document.createElement('tr')
    row.innerHTML = `
    <td>1.</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.isbn}</td>
    <td><input type="button" class="book-status" value="Read"></input></td>
    <td><button class="delete">X</button></td>
    `;

    list.appendChild(row);
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

//Event to display book
document.addEventListener('DOMContentLoaded', displayBook());

//Event to add book
document.querySelector('#book-form').addEventListener('submit', e => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, pages, isbn);

    addBookToLibrary(book);

    clearField();
})

//delete book
document.querySelector('#book-list').addEventListener('click', e => {
    deleteBook(e.target)
})

//change status
const changeStatus = document.querySelectorAll('.book-status');
changeStatus.forEach(change => change.addEventListener('click', (e) => {
    if (e.target.value === 'Read') {
        e.target.value = 'Not Read';
    } else {
        e.target.value = 'Read';
    }
}));
