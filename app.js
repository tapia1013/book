//              ES5 WAY METHOD

// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}



// UI Constructor... set of prototype methods to do like add book to list and delete book and alert etc...
// UI Constructor is going to be simple cause we wont be passing anything in its an empty function
function UI() { }

// create a prototype ADD BOOK TO LIST
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list')

  // Create aT <tr></tr> element
  const row = document.createElement('tr')

  // INSERT COLS ... take <tr></tr> and append
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `

  // APPEND TO SHOW
  list.appendChild(row)

}

// SHOW ALERT
UI.prototype.showAlert = function (message, className) {
  // create div.... construct the element
  const div = document.createElement('div')

  // Add classes name
  div.className = `alert ${className}`

  // Add text with textnode
  div.appendChild(document.createTextNode(message));

  // Insert into dom...... GET PARENT
  const container = document.querySelector('.container')

  // Get form
  const form = document.querySelector('#book-form');

  // take parent container with insertBefore insert alert
  container.insertBefore(div, form);

  // disappear after 3 seconds aka timeOut
  setTimeout(function () {
    // grab alert class and remove it
    document.querySelector('.alert').remove();
  }, 3000)
}


// CLear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';

}



// Event Listeners
document.getElementById('book-form').addEventListener('submit', function (e) {

  // GET FORM VALUES
  // what do we want to happen when we submit
  // first we get the fields
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;


  // Instantiate book makes a new object with info
  const book = new Book(title, author, isbn);

  //Instantiate a UI object
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {

    // Error alert     v message               error class
    ui.showAlert('Please fill in all fields', 'error');

  } else {

    // Add book from new Book to html list
    ui.addBookToList(book);


    // Show alert if success/ book added
    ui.showAlert('Book Added!', 'success')

    // Clear fields after adding to page with appendChild
    ui.clearFields()

  }

  e.preventDefault();
})

