
// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////


//require express in our app
const express = require('express'),
  bodyParser = require('body-parser'),
  db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//initialize variable to use for our environment port
var port = 3000;




////////////////////
//  ROUTES
///////////////////


// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find(function(err, books){
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  db.Book.findOne({_id: req.params.id}, function(err, books) {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(books);
  });
});


// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  console.log('books create', req.body);
  var newBook = req.body;
  db.Book.create(newBook);
  res.json(newBook);
});


// update book
app.put('/api/books/:id', function(req,res){
  // get book id from url params (`req.params`)
  console.log('books update', req.params);

  db.Book.findOne({_id: req.params.id}, function(err, books) {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    console.log(books);
    res.json(books);
  });

  // find the index of the book we want to remove
  // var updateBookIndex = books.findIndex(function(element, index) {
  //   return (element._id === parseInt(req.params.id)); //params are strings
  // });
  // console.log('updating book with index', deleteBookIndex);
  // var bookToUpdate = books[deleteBookIndex];
  // books.splice(updateBookIndex, 1, req.params);
  //res.json(req.params);
});


// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);

  db.Book.findOneAndRemove({_id: req.params.id}, function(err, books) {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }

    // get the id of the book to delete
    let bookToDelete = req.params.id;
    console.log(bookToDelete);

    res.json(bookToDelete);
  });
});

app.listen(port, ()=> {
  console.log(`App is locked and loaded on ${port}`);
});
