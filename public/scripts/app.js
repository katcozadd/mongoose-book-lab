console.log("Sanity Check: JS is working!");
var $booksList;
var allBooks = [];

$(document).ready(function(){

  $booksList = $('#bookTarget');
  $.ajax({
    method: 'GET',
    url: '/api/books',
    success: handleSuccess,
    error: handleError
  });

  $('.create').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/books',
      data: $('#newBookForm').serialize(),
      success: newBookSuccess,
      error: newBookError
    });
  });

  $('.save').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/books',
      data: $('#newBookForm').serialize(),
      success: saveBookSuccess,
      error: saveBookError
    });
  });

  $booksList.on('click', '.updateBtn', function() {
    console.log('clicked update button to,  /api/books/'+$(this).attr('data-id'));
    $.ajax({
      method: 'PUT',
      url: '/api/books/'+$(this).attr('data-id'),
      success: updateBookSuccess,
      error: updateBookError
    });
  });

  $booksList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to,  /api/books/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/books/'+$(this).attr('data-id'),
      success: deleteBookSuccess,
      error: deleteBookError
    });
  });

});

function getBookHtml(book) {
  return `<hr>
          <p>
            <b>${book.title}</b>
            by ${book.author}
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${book._id}>Delete</button>
            <button type="button" name="button" class="updateBtn btn btn-warning pull-right" data-id=${book._id}>Update</button>
          </p>`;
}

function getAllBooksHtml(books) {
  return books.map(getBookHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $booksList.empty();

  // pass `allBooks` into the template function
  var booksHtml = getAllBooksHtml(allBooks);

  // append html to the view
  $booksList.append(booksHtml);
};

function handleSuccess(json) {
  allBooks = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#bookTarget').text('Failed to load books, is the server working?');
}

function newBookSuccess(json) {
  $('#newBookForm input').val('');
  allBooks.push(json);
  render();
}

function newBookError() {
  console.log('newbook error!');
}


function updateBookSuccess(json) {
  // var book = json;
  // console.log(json);
  var book = json;
  console.log('update book', book);
  // find the book with the correct ID and remove it from our allBooks array
  $('input[name="title"]').val(book.title);
  $('input[name="author"]').val(book.author);


  // for(var index = 0; index < allBooks.length; index++) {
  //   if(allBooks[index]._id === bookId) {
  //     allBooks.splice(index, 1);
  //     break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
  //   }
  // }
  // render();
}

function updateBookError() {
  console.log('updatebook error!');
}


function saveBookSuccess(json) {
  var book = json;
  console.log(json);
  console.log('save book', book);



  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allBooks.length; index++) {
    if(allBooks[index].title === book.title) {
      allBooks.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function saveBookError() {
  console.log('savebook error!');
}


function deleteBookSuccess(json) {
  // var book = json;
  // console.log(json);
  var bookId = json;
  console.log('delete book', bookId);
  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allBooks.length; index++) {
    if(allBooks[index]._id === bookId) {
      allBooks.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteBookError() {
  console.log('deletebook error!');
}
