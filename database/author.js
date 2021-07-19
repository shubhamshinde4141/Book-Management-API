const mongoose = require("mongoose");

// Creating a Author Schema 
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});


// Create a Author Model 
const AuthorModel = mongoose.model("authors",AuthorSchema);

//Export to use in other files
module.exports = AuthorModel;