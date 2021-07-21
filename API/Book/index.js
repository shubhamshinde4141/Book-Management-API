// Prefix :  /book


const Router = require("express").Router();

// Import database Models 
const BookModels = require("../../database/book");

/*
Route :             / 
Description :       Get Data of all Books
Access :            PUBLIC 
Parameter :         NONE
Methods :           GET
*/ 
Router.get("/", async (request, response) => {

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
Router.get("/is/:isbn", async (request, response) => {

    try {
        // Code to deal with MongoDB
    const getSpecificBook = await BookModels.findOne({ ISBN: request.params.isbn });

    if (!getSpecificBook) {
        return response.json({ error: `No Book Found Of ISBN ${request.params.isbn}` });
    }

    return response.json({ book: getSpecificBook });
    } catch (error) {
        return response.json({ Error: error.message });
    }
    



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
Router.get("/c/:category", async (request, response) => {
    
    try {
        // Code to deal with MongoDB
    const getSpecificBook = await BookModels.findOne({ category: request.params.category });

    return response.json({ book: getSpecificBook });
        
    } catch (error) {
        return response.json({ Error: error.message });
    }

    

    //const getSpecificBook = database.books.filter((book) => book.category.includes(request.params.category));
    /*if (getSpecificBook.length == 0) {
        return response.json({ error: `No Book Found Of Category ${request.params.category}` });
    }*/

});





// Add New Book
/*
Route :             /book/new
Description :       Add New Book
Access :            PUBLIC 
Parameter :         NONE
Methods :           POST
*/
Router.post("/new", async (request, response) => {
    try {
    
    const { newBook } = request.body;
    //Add into mogoDB database
    const addNewBook = await BookModels.create(newBook);
    return response.json({ books: addNewBook, message: "New Book Added !!" });
        
    } catch (error) {
        return response.json({ Error: error.message });
    }
    

    //database.books.push(newBook);
   // return response.json({ books: database.books });
});





/// Update Title of the Book 
/*
Route :             /book/update/title
Description :       Update Book Title
Access :            PUBLIC 
Parameter :         ISBN Number
Methods :           PUT
*/

Router.put("/update/title/:isbn", async (request, response) => {


    try {
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

    } catch (error) {
        return response.json({ Error: error.message }); 
    }
   

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

Router.put("/update/author/:isbn/:authorID", async (request, response) => {

    try {
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
     
        return response.json({ books: updateBookAuthor, authors: updateAuthor });
        
    } catch (error) {
        return response.json({ Error: error.message }); 
    }
    

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
});





// Delete Book from Database
/*
Route :             /book/delete
Description :       Delete Book
Access :            PUBLIC 
Parameter :         book ISBN
Methods :           DELETE
*/

Router.delete("/delete/:isbn", async (request, response) => {
    try {
         // Code to deal with MongoDB
         const updatedBookDatabase = await BookModels.findOneAndDelete(
            {
                ISBN: request.params.isbn,
            }
        );
        return response.json({ books: updatedBookDatabase });
    } catch (error) {
        return response.json({ Error: error.message });
    }
   
    
    
    
        /*const updatedBookDatabase = database.books.filter((book) => 
            book.ISBN !== request.params.isbn
        );
        database.books = updatedBookDatabase;
        return response.json({ books: database.books });*/
});
    




module.exports = Router;