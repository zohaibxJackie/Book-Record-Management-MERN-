const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/BookStore");

const bookSchema = mongoose.Schema({
    bookName: String,
    authorName: String,
    availability: Boolean,
    publishYear: Number,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("book", bookSchema);