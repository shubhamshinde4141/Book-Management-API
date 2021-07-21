const mongoose = require("mongoose");

// Creating a Author Schema 
const AuthorSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        minLength: 8,
        maxLength: 10,
    },
    books: [String],
});


// Create a Author Model 
const AuthorModel = mongoose.model("authors",AuthorSchema);

//Export to use in other files
module.exports = AuthorModel;