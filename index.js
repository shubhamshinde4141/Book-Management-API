// Import DOTENV and config it  ( IMportant Step ) 
require("dotenv").config();


const { response, json, request } = require("express");
const express = require("express");

//Import Database 
const database = require("./database/database");
const mongoose = require('mongoose');

// Import All Models  ( Book , Author , Publication)
const BookModels = require("./database/book");
const AuthorModels = require("./database/author");
const PublicationModels = require("./database/publication");





// Initialize Express
const booky = express();


//Configure Express
booky.use(express.json());



// Establish the connection to MangoDB Database
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log("Connection Established !!!!!!!!"));



//////////////////////////////////  ALL METHODS //////////////////////////////////






// ************** (GET Method) ********************

/*
Route :             / 
Description :       Get Data of all Books
Access :            PUBLIC 
Parameter :         NONE
Methods :           GET
*/ 
booky.get("/", async (request, response) => {

    const getAllBooks = await BookModels.find();
    return response.json({ getAllBooks });
});




/*
Route :             / 
Description :       Get Data of books based on ISBN
Access :            PUBLIC 
Parameter :         ISBN Number
Methods :           GET
*/ 
booky.get("/is/:isbn", async (request, response) => {

    // Code to deal with MongoDB
    const getSpecificBook = await BookModels.findOne({ ISBN: request.params.isbn });

    if (!getSpecificBook) {
        return response.json({ error: `No Book Found Of ISBN ${request.params.isbn}` });
    }

    return response.json({ book: getSpecificBook });



    //const getSpecificBook = database.books.filter((book) => book.ISBN === request.params.isbn);
    /*if (getSpecificBook.length == 0) {
        return response.json({ error: `No Book Found Of ISBN ${request.params.isbn}` });
    }*/

});





/*
Route :             /c
Description :       Get Data of books based on Category
Access :            PUBLIC 
Parameter :         Category of Book
Methods :           GET
*/
booky.get("/c/:category", async (request, response) => {
    //const getSpecificBook = database.books.filter((book) => book.category.includes(request.params.category));
    /*if (getSpecificBook.length == 0) {
        return response.json({ error: `No Book Found Of Category ${request.params.category}` });
    }*/


    // Code to deal with MongoDB
    const getSpecificBook = await BookModels.findOne({ category: request.params.category });

    return response.json({ book: getSpecificBook });

});




/*
Route :             /ar
Description :       Get List of Authors based on Author Name
Access :            PUBLIC 
Parameter :         Author Name 
Methods :           GET
*/
booky.get("/ar/:authorname", async (request, response) => {
   
   // Code To deal with MongoDB  
    const getSpecificAuthor = await AuthorModels.findOne({ name: request.params.authorname });
    return response.json({ authors: getSpecificAuthor });


    //const getSpecificBook = database.author.filter((authors) => authors.name === request.params.authorname);
    /*if (getSpecificBook.length == 0) {
        return response.json({ error: `No Author Found who has name ${request.params.authorname}` });
    }*/
    //const authorBooks = getSpecificBook.author.books;

});




/*
Route :             /author/book/
Description :       Get List of Authors based on Book ISBN Number
Access :            PUBLIC 
Parameter :         ISBN Number 
Methods :           GET
*/
booky.get("/author/book/:isbn", async (request, response) => {
    
    // Code to deal with MongoDB
    const getSpecificAuthor = await AuthorModels.findOne({ books: request.params.isbn });
    return response.json({ authors: getSpecificAuthor });
    
    
    /*const getSpecificAuthor = database.author.filter((author) => author.books.includes(request.params.isbn));
    if ( getSpecificAuthor.length == 0) {
        return response.json({ error: `No Author Found who have Book ISBN as ${request.params.isbn}` });
    }

    return response.json({ authors:  getSpecificAuthor });*/

});




//   Get a list of publications by using ISBN of a book
/*
Route :             /book/publication
Description :       Get List of Publications based on Book ISBN Number
Access :            PUBLIC 
Parameter :         ISBN Number 
Methods :           GET
*/

booky.get("/book/publication/:isbn", async (request, response) => {
   /*const getSpecificPublication = database.publications.filter((publication) => publication.books.includes(request.params.isbn));
    if ( getSpecificPublication.length == 0) {
        return response.json({ error: `No Publication Found who have Book ISBN as ${request.params.isbn}` });
    }

    return response.json({ publications:  getSpecificPublication });*/


    // Code To add data into MongoDB
    const getSpecificPublication = await PublicationModels.findOne({ books: request.params.isbn });
    return response.json({ publication: getSpecificPublication });

    

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
booky.post("/book/new", async (request, response) => {
    const { newBook } = request.body;

    //Add into mogoDB database
    const addNewBook = await BookModels.create(newBook);
    return response.json({ books: addNewBook, message: "New Book Added !!" });

    //database.books.push(newBook);
   // return response.json({ books: database.books });
});



//  Add New Author
/*
Route :             /author/new
Description :       Add New Author
Access :            PUBLIC 
Parameter :         NONE
Methods :           POST
*/
booky.post("/author/new", async (request, response) => {
    const { newAuthor } = request.body;
     //database.author.push(newAuthor);
    //return response.json({ authors: database.author });

    // Code to Add into mongoDB Database
    const addNewAuthor = await AuthorModels.create(newAuthor);
    return response.json({ books: addNewAuthor, message: "New Author Added !!" });
   
});



//  Add New Publications
/*
Route :             /publication/new
Description :       Add New Publications
Access :            PUBLIC 
Parameter :         NONE
Methods :           POST
*/
booky.post("/publication/new", async (request, response) => {
    const { newPublication } = request.body;

    
    //database.publications.push(newPublication);
    //return response.json({ publicationss: database.publications });


    // Code TO add data into MongoDB
    const addNewPublication = await PublicationModels.create(newPublication);
    return response.json({ publications: addNewPublication, message: "New Publication Added !! " });
    
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

booky.put("/book/update/title/:isbn", async (request, response) => {

    // Code Deal With MongoDB (Update Book Title)
    const updatedBook = await BookModels.findOneAndUpdate(
        {
            ISBN: request.params.isbn,
        },
        {
            title: request.body.bookTitle,
        },
        {
            new: true,
        }
    );
    return response.json({ books: updatedBook });


    /*database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            book.title = request.body.newBookTitle;
            return;
        }
    });*/
   // return response.json({ books: database.books });
});


/// Update Author of the Book 
/*
Route :             /book/update/author
Description :       Update Book Title
Access :            PUBLIC 
Parameter :         ISBN Number , authorID
Methods :           PUT
*/

booky.put("/book/update/author/:isbn/:authorID", async (request, response) => {

    // Update Book Database ( Code deal with MongoDB)
    const updateBookAuthor = await BookModels.findOneAndUpdate(
        {
            ISBN: request.params.isbn,
        },
        {
            $addToSet: {
                author: request.params.authorID,
            },
        },
        {
            new: true,
        }
    );

    // Update Author database ( Code to deal with MongoDB)
    const updateAuthor = await AuthorModels.findOneAndUpdate(
        {
            id: request.params.authorID,
        },
        {
            $addToSet: {
                books: request.params.isbn,  // ( addTOSet Ensure that the data should not be duplicated. If we enter same data it will not allow it)
            }
           
        },
        {
            new: true,
        }

    );
     
    
    /*database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            return book.author.push(parseInt(request.params.authorID));
        }
    });

    //Update Author database
    database.author.forEach((author) => {
        if (author.id === parseInt(request.params.authorID)) {
            return author.books.push(request.params.isbn);
        }
    });*/

    return response.json({ books: updateBookAuthor, authors: updateAuthor });
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
            return;
        }
    });

    return response.json({ books: database.books, publications: database.publications });
});


//////// ******* DELETE METHOD ************

// Delete Book from Database
/*
Route :             /book/delete
Description :       Delete Book
Access :            PUBLIC 
Parameter :         book ISBN
Methods :           DELETE
*/

booky.delete("/book/delete/:isbn", async (request, response) => {
// Code to deal with MongoDB
    const updatedBookDatabase = await BookModels.findOneAndDelete(
        {
            ISBN: request.params.isbn,
        }
    );
    return response.json({ books: updatedBookDatabase });



    /*const updatedBookDatabase = database.books.filter((book) => 
        book.ISBN !== request.params.isbn
    );
    database.books = updatedBookDatabase;
    return response.json({ books: database.books });*/
});


// Delete Author from a book
/*
Route :             /book/delete/author
Description :       Delete author from a book 
Access :            PUBLIC 
Parameter :         book ISBN , author ID
Methods :           DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorID", async (request, response) => {
   
    // Code To deal with MongoDB
    const updateBookData = await BookModels.findOneAndUpdate(
        {
            ISBN: request.params.isbn,
        },
        {
            $pull: {
                author: parseInt(request.params.authorID),
            },
        },
        {
            new: true,
        }
    );
    
    //update author array in Book database
    /*database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            const newAuthorList = book.author.filter((author) => author !== parseInt(request.params.authorID));
            book.author = newAuthorList;
            return;
        } else {
            console.log("Not found");
        }


    });*/


    // update the author database
    /*database.author.forEach((author) => {
        if (author.id === parseInt(request.params.authorID)) {
            const newBookList = author.books.filter((book) => book !== request.params.isbn);
            author.books = newBookList;
            return;
        }
    });*/


    // Update the author database
    const updateAuthorData = await AuthorModels.findOneAndUpdate(
        {
            id: parseInt(request.params.authorID),
        },
        {
            $pull: {
                books: request.params.isbn,
            },
        },
        {
            new: true,
        }
    );


    return response.json({ books: updateBookData, author:  updateAuthorData });
});


// Delete boom from Publications
/*
Route :             /publication/delete/book
Description :        Delete boom from Publications 
Access :            PUBLIC 
Parameter :         book ISBN , Publication ID
Methods :           DELETE
*/

booky.delete("/publication/delete/book/:isbn/:pubID", (request, response) => {
    
    //update Boom array in Publication database

    database.publications.forEach((publication) => {
        if (publication.id === parseInt(request.params.pubID)) {
            const newBookList = publication.books.filter((book) => book !== request.params.isbn);
            publication.books = newBookList;
            return;
        } else {
            console.log("Not found");
        }


    });

    // update the Book database
    database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            book.publications = 0;
            return;
        }
    });

    return response.json({ books: database.books, publications: database.publications });
});














// Server Started !!!!!!!
booky.listen(3000, () => console.log(" Server Started !!!!! 🚀🚀 "));



