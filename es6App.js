//                   ES6 WAY METHOD

class Book {
  // going to take in title author isbn
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI is where we put all the methods that deal with the user interface
class UI {

  addBookToList(book) {
    const list = document.getElementById('book-list')

    // create tr element
    const row = document.createElement('tr')

    // insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);

  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');

    // Add class to div
    div.className = `alert ${className}`;

    // Add text
    div.appendChild(document.createTextNode(message))

    // Get Parent
    const container = document.querySelector('.container')

    // Get Form
    const form = document.querySelector('#book-form')

    // Insert alert
    container.insertBefore(div, form)

    // Timeout after 3 sec aka remove notifications
    setTimeout(function () {
      document.querySelector('.alert').remove()
    }, 3000)

  }

  deleteBook(target) {
    if (target.className === 'delete') {
      // get parent element of deleted item and remove
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    // clears the fields after submiting
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

}




// LOCAL STORAGE CLASS
class Store {
  // GET BOOKS will take care of fetching books from LS
  static getBooks() {
    // initialize a var called books
    let books;

    // check LOCAL STORAGE... if not there null else
    if (localStorage.getItem('books') === null) {
      // if not there/null = empty array
      books = [];

    } else {
      //  then books is going to get book item from LS
      // we need it to be a JS object so parse it
      books = JSON.parse(localStorage.getItem('books'))

    }

    // then return books
    return books;

  }

  // will take care of displaying the book in the UI
  static displayBooks() {
    // displat the addBooks from beloe in the UI html
    // first we get the books
    const books = Store.getBooks()

    // loop through books with forEach
    books.forEach(function (book) {
      // Instantiate UI
      const ui = new UI;

      // Add book to UI
      ui.addBookToList(book);

    })

  }

  // Add book will add to LOCAL STORAGE
  static addBook(book) {
    // we use the class name cause its a static method
    const books = Store.getBooks();

    // push on to books
    books.push(book)

    // set LS with the new book      stringify the array
    localStorage.setItem('books', JSON.stringify(books))


  }

  // we need something unique to remove since we have no ID so we use the isbn
  static removeBook(isbn) {
    const books = Store.getBooks()

    // loop to remove
    books.forEach(function (book, index) {
      // if isbn is the one being passed through (isbn)
      if (book.isbn === isbn) {
        // splice index remove 1
        books.splice(index, 1)
      }
    });

    // Set local storgae again after running loop
    localStorage.setItem('books', JSON.stringify(books))

  }
}



//                    DOM LOAD EVENT
//when the DOMCont is loaded then we call Store.displayB func
document.addEventListener('DOMContentLoaded', Store.displayBooks);




// Event Listeners for adding books
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value


  // Instantiate book
  const book = new Book(title, author, isbn)

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert          'MESSAGE'         'CLASS'
    ui.showAlert('Please fill in all fields', 'error')

  } else {
    // Add book list
    ui.addBookToList(book);
    // Add to LOCAL STORAGE
    Store.addBook(book)

    // Show success
    ui.showAlert('Book Added!', 'success');

    // Clear fields
    ui.clearFields();

    console.log(ui);


  }

  e.preventDefault();
});


// Event Listeners for DELETE
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Remove From LOCAL STORAGE
  // icon.parentTD.prevEl(isbn).textCont(isbn#)
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show Message
  ui.showAlert('Book Removed!', 'success')

  e.preventDefault()

})
