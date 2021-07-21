
// Prefix : /publications

// Include Router
const Router = require("express").Router();

const BookModel = require("../../database/book");
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
    
 try {
      // Code To add data into MongoDB
      const getSpecificPublication = await PublicationModels.findOne({ books: request.params.isbn });
      return response.json({ publication: getSpecificPublication });
 } catch (error) {
     return response.json({ Error: error.message });
 }
 
    
    /*const getSpecificPublication = database.publications.filter((publication) => publication.books.includes(request.params.isbn));
     if ( getSpecificPublication.length == 0) {
         return response.json({ error: `No Publication Found who have Book ISBN as ${request.params.isbn}` });
     }
 
     return response.json({ publications:  getSpecificPublication });*/ 
 
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


    try {
        const { newPublication } = request.body;
    // Code TO add data into MongoDB
    const addNewPublication = await PublicationModels.create(newPublication);
    return response.json({ publications: addNewPublication, message: "New Publication Added !! " }); 
    } catch (error) {
        return response.json({ Error: error.message });
    }
   


    //database.publications.push(newPublication);
    //return response.json({ publicationss: database.publications });
    
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


    try {
       // Code to deal with MongoDB
    const updatePublicationTitle = PublicationModels.findOneAndUpdate(
        {
            id: parseInt(request.params.pubID),
        },
        {
            name: request.body.newPublicationName,
        },
        {
            new: true,
        }
    );

    return response.json({ publications: updatePublicationTitle }); 
    } catch (error) {
        return response.json({ Error: error.message });
    }
    

    /*database.publications.forEach((publication) => {
        if (publication.id === parseInt(request.params.pubID)) {
            publication.name =  request.body.newPublicationName;;
        }
        return;
       
    });*/

   
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
    

    try {
        // Code To deal with MongoDB

    //update publication data -
    const addNewBookInPublication = PublicationModels.findOneAndUpdate(
        {
            id: request.body.pubID,
        },
        {
            $addToSet: {
                books: request.params.isbn,
            }
        },
        {
            new: true,
        }
    );

        // Update Book Data - 
    const updatePublicationInBook = BookModels.findOneAndUpdate(
        {
            ISBN: request.params.isbn,
        },
        {
            publications: request.body.pubID,
        },
        {
            new: true,
        }

    );

    return response.json({ books: updatePublicationInBook , publications: addNewBookInPublication });
    } catch (error) {
        return response.json({ Error: error.message });
    }
    

   /* database.publications.forEach((publication) => {
        if (publication.id === request.body.pubID) {
            return publication.books.push(request.params.isbn);
        }

    });*/

    //update the book database

    /*database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            book.publications = request.body.pubID;
            return;
        }
    });*/

    
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
    
    try {
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
    } catch (error) {
        return response.json({ Error: error.message });
    }
    
    
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
});
 
//Export Router
module.exports = Router;