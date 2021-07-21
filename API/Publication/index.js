
// Prefix : /publications

// Include Router
const Router = require("express").Router();

// Import database Models 
const PublicationModels = require("../../database/publication");


//   Get a list of publications by using ISBN of a book
/*
Route :             /book/publication
Description :       Get List of Publications based on Book ISBN Number
Access :            PUBLIC 
Parameter :         ISBN Number 
Methods :           GET
*/

Router.get("/book/publication/:isbn", async (request, response) => {
    /*const getSpecificPublication = database.publications.filter((publication) => publication.books.includes(request.params.isbn));
     if ( getSpecificPublication.length == 0) {
         return response.json({ error: `No Publication Found who have Book ISBN as ${request.params.isbn}` });
     }
 
     return response.json({ publications:  getSpecificPublication });*/
 
 
     // Code To add data into MongoDB
     const getSpecificPublication = await PublicationModels.findOne({ books: request.params.isbn });
     return response.json({ publication: getSpecificPublication });
 
     
 
});
 


//  Add New Publications
/*
Route :             /publication/new
Description :       Add New Publications
Access :            PUBLIC 
Parameter :         NONE
Methods :           POST
*/
Router.post("/new", async (request, response) => {
    const { newPublication } = request.body;

    
    //database.publications.push(newPublication);
    //return response.json({ publicationss: database.publications });


    // Code TO add data into MongoDB
    const addNewPublication = await PublicationModels.create(newPublication);
    return response.json({ publications: addNewPublication, message: "New Publication Added !! " });
    
});



/// Update Publication (name) using its ID
/*
Route :             /book/update/publication
Description :       Update Publication Name
Access :            PUBLIC 
Parameter :         Publication ID
Methods :           PUT
*/

Router.put("/book/update/publications/:pubID", (request, response) => {
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

Router.put("/update/book/:isbn", (request, response) => {
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



// Delete boom from Publications
/*
Route :             /publication/delete/book
Description :        Delete boom from Publications 
Access :            PUBLIC 
Parameter :         book ISBN , Publication ID
Methods :           DELETE
*/

Router.delete("/delete/book/:isbn/:pubID", async (request, response) => {
    
    //update Book array in Publication database
     // Code to deal with MongoDB
 
     const updateBookInPublication = await PublicationModels.findOneAndUpdate(
         {
             id: parseInt(request.params.pubID),
         },
         {
             $pull: {
                 books: request.params.isbn,
             }
             
         },
         {
             new: true,
         }
 
     );
    
    
    
     //update Book array in Publication database
     /*database.publications.forEach((publication) => {
         if (publication.id === parseInt(request.params.pubID)) {
             const newBookList = publication.books.filter((book) => book !== request.params.isbn);
             publication.books = newBookList;
             return;
         } else {
             console.log("Not found");
         }
 
 
     });*/
 
     // update the Book database
    /* database.books.forEach((book) => {
         if (book.ISBN === request.params.isbn) {
             book.publications = 0;
             return;
         }
     });*/
 
 
     // Update the Book database
     const updatePublicationInBook = await BookModels.findOneAndUpdate(
         {
             ISBN: request.params.isbn,
         },
         {
             $pull: {
                 publications: parseInt(request.params.pubID),
             },
         },
         {
             new: true,
         }
     );
 
     return response.json({ books: updatePublicationInBook, publications: updateBookInPublication });
});
 
//Export Router
module.exports = Router;