let myLibrary = [
    {
        number: 1,
        title: '1984',
        author: 'George Orwell',
        pages: 298,
        isbn: 9780451524935
    },
    {
        number: 2,
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
    <td>Read</td>
    <td><button class="delete">X</button></td>
    `;

    list.appendChild(row);
}

//Event to display book
document.addEventListener('DOMContentLoaded', displayBook());