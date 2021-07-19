const mongoose = require("mongoose");

// Creating a Publication Schema 
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});


// Create a Publication Model 
const PublicationModel = mongoose.model("publications",PublicationSchema);

//Export to use in other files
module.exports = PublicationModel;