const { response, json, request } = require("express");
const express = require("express");

//Import Database 
const database = require("./database");


// Initialize Express
const booky = express();


//Configure Express
booky.use(express.json());



// ************** (GET Method) ********************

/*
Route :             / 
Description :       Get Data of all Books
Access :            PUBLIC 
Parameter :         NONE
Methods :           GET
*/ 
booky.get("/", (request, response) => {
    return response.json({ books: database.books });
});




/*
Route :             / 
Description :       Get Data of books based on ISBN
Access :            PUBLIC 
Parameter :         ISBN Number
Methods :           GET
*/ 
booky.get("/is/:isbn", (request, response) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === request.params.isbn);


    if (getSpecificBook.length == 0) {
        return response.json({ error: `No Book Found Of ISBN ${request.params.isbn}` });
    }

    return response.json({ book: getSpecificBook });

});





/*
Route :             /c
Description :       Get Data of books based on Category
Access :            PUBLIC 
Parameter :         Category of Book
Methods :           GET
*/
booky.get("/c/:category", (request, response) => {
    const getSpecificBook = database.books.filter((book) => book.category.includes(request.params.category));


    if (getSpecificBook.length == 0) {
        return response.json({ error: `No Book Found Of Category ${request.params.category}` });
    }

    return response.json({ book: getSpecificBook });

});


/*
Route :             /ar
Description :       Get List of Authors based on Author Name
Access :            PUBLIC 
Parameter :         Author Name 
Methods :           GET
*/
booky.get("/ar/:authorname", (request, response) => {
    const getSpecificBook = database.author.filter((authors) => authors.name === request.params.authorname);
    


    if (getSpecificBook.length == 0) {
        return response.json({ error: `No Author Found who has name ${request.params.authorname}` });
    }
    //const authorBooks = getSpecificBook.author.books;

    return response.json({ authors: getSpecificBook });

});


/*
Route :             /author/book/
Description :       Get List of Authors based on Book ISBN Number
Access :            PUBLIC 
Parameter :         ISBN Number 
Methods :           GET
*/
booky.get("/author/book/:isbn", (request, response) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(request.params.isbn));


    if ( getSpecificAuthor.length == 0) {
        return response.json({ error: `No Author Found who have Book ISBN as ${request.params.isbn}` });
    }

    return response.json({ authors:  getSpecificAuthor });

});



//   Get a list of publications by using ISBN of a book
/*
Route :             /book/publication
Description :       Get List of Publications based on Book ISBN Number
Access :            PUBLIC 
Parameter :         ISBN Number 
Methods :           GET
*/

booky.get("/book/publication/:isbn", (request, response) => {
    const getSpecificPublication = database.publications.filter((publication) => publication.books.includes(request.params.isbn));


    if ( getSpecificPublication.length == 0) {
        return response.json({ error: `No Publication Found who have Book ISBN as ${request.params.isbn}` });
    }

    return response.json({ publications:  getSpecificPublication });

});




// ********** (POST METHOD) *********


// Add New Book
/*
Route :             /book/new
Description :       Add New Book
Access :            PUBLIC 
Parameter :         NONE
Methods :           POST
*/
booky.post("/book/new", (request, response) => {
    const { newBook } = request.body;
    database.books.push(newBook);
    return response.json({ books: database.books });
});



//  Add New Author
/*
Route :             /author/new
Description :       Add New Author
Access :            PUBLIC 
Parameter :         NONE
Methods :           POST
*/
booky.post("/author/new", (request, response) => {
    const { newAuthor } = request.body;
    database.author.push(newAuthor);
    return response.json({ authors: database.author });
});



//  Add New Publications
/*
Route :             /publication/new
Description :       Add New Publications
Access :            PUBLIC 
Parameter :         NONE
Methods :           POST
*/
booky.post("/publication/new", (request, response) => {
    const { newPublication } = request.body;
    database.publications.push(newPublication);
    return response.json({ publicationss: database.publications });
});




// ************* (PUT Method) ************* 


/// Update Title of the Book 
/*
Route :             /book/update/title
Description :       Update Book Title
Access :            PUBLIC 
Parameter :         ISBN Number
Methods :           PUT
*/

booky.put("/book/update/title/:isbn", (request, response) => {
    database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            book.title = request.body.newBookTitle;
            return;
        }
    });
    return response.json({ books: database.books });
});


/// Update Author of the Book 
/*
Route :             /book/update/author
Description :       Update Book Title
Access :            PUBLIC 
Parameter :         ISBN Number , authorID
Methods :           PUT
*/

booky.put("/book/update/author/:isbn/:authorID", (request, response) => {

    // Update Book Database 
    database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            return book.author.push(parseInt(request.params.authorID));
        }
    });

    //Update Author database
    database.author.forEach((author) => {
        if (author.id === parseInt(request.params.authorID)) {
            return author.books.push(request.params.isbn);
        }
    });

    return response.json({ books: database.books, authors: database.author });
});


/// Update Publication (name) using its ID
/*
Route :             /book/update/publication
Description :       Update Publication Name
Access :            PUBLIC 
Parameter :         Publication ID
Methods :           PUT
*/

booky.put("/book/update/publications/:pubID", (request, response) => {
    database.publications.forEach((publication) => {
        if (publication.id === parseInt(request.params.pubID)) {
            publication.name =  request.body.newPublicationName;;
        }
        return;
       
    });
    return response.json({ publications: database.publications });
});




///Update/add new book to Publications 
/*
Route :             /publications/update/book
Description :       Update book in publications
Access :            PUBLIC 
Parameter :         book ISBN
Methods :           PUT
*/

booky.put("/publications/update/book/:isbn", (request, response) => {
    //update publication data
    database.publications.forEach((publication) => {
        if (publication.id === request.body.pubID) {
            return publication.books.push(request.params.isbn);
        }

    });

    //update the book database

    database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            book.publications = request.body.pubID;
        }
    });

    return response.json({ books: database.books, publications: database.publications });
})











// Server Started !!!!!!!
booky.listen(3000, () => console.log(" Server Started !!!!! "));



