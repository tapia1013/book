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
  console.log(book);

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

  // Add book from new Book to html list
  ui.addBookToList(book)





  e.preventDefault();
})