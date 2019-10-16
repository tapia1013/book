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

    // Show success
    ui.showAlert('Book Added!', 'success');

    // Clear fields
    ui.clearFields();

  }

  e.preventDefault();
});


// Event Listeners for DELETE
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Show Message
  ui.showAlert('Book Removed!', 'success')

  e.preventDefault()

})
