const mongoose = require("mongoose");

// Creating a Publication Schema 
const PublicationSchema = mongoose.Schema({
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


// Create a Publication Model 
const PublicationModel = mongoose.model("publications",PublicationSchema);

//Export to use in other files
module.exports = PublicationModel;