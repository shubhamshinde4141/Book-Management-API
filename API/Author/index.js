
// Prefix : /author

// Include Router
const Router = require("express").Router();

// Import database Models 
const AuthorModels = require("../../database/author");








/*
Route :             /ar
Description :       Get List of Authors based on Author Name
Access :            PUBLIC 
Parameter :         Author Name 
Methods :           GET
*/
Router.get("/ar/:authorname", async (request, response) => {
   
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
Router.get("/book/:isbn", async (request, response) => {
    
    // Code to deal with MongoDB
    const getSpecificAuthor = await AuthorModels.findOne({ books: request.params.isbn });
    return response.json({ authors: getSpecificAuthor });
    
    
    /*const getSpecificAuthor = database.author.filter((author) => author.books.includes(request.params.isbn));
    if ( getSpecificAuthor.length == 0) {
        return response.json({ error: `No Author Found who have Book ISBN as ${request.params.isbn}` });
    }

    return response.json({ authors:  getSpecificAuthor });*/

});




//  Add New Author
/*
Route :             /author/new
Description :       Add New Author
Access :            PUBLIC 
Parameter :         NONE
Methods :           POST
*/
Router.post("/new", async (request, response) => {
    const { newAuthor } = request.body;
     //database.author.push(newAuthor);
    //return response.json({ authors: database.author });

    // Code to Add into mongoDB Database
    const addNewAuthor = await AuthorModels.create(newAuthor);
    return response.json({ books: addNewAuthor, message: "New Author Added !!" });
   
});

// Delete Author from a book
/*
Route :             /book/delete/author
Description :       Delete author from a book 
Access :            PUBLIC 
Parameter :         book ISBN , author ID
Methods :           DELETE
*/

Router.delete("/book/delete/author/:isbn/:authorID", async (request, response) => {
   
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

//Export Router
module.exports = Router;