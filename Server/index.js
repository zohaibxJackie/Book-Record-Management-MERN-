const express = require('express');
const app = express();
const bookModel = require("./public/bookSchema");
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello from backend");
})

app.post("/createbook", async (req, res) => {
    const obj = req.body
    console.log(obj)
    try {
        await bookModel.create({
            bookName: req.body.bookName,
            authorName: req.body.authorName,
            availability: req.body.availability,
            publishYear: req.body.publishYear
        })
    } catch (err) {
        res.send("something went wrong!");
        console.log(err);
    }
})

app.get("/showbooks", async (req, res) => {
    try {
        const books = await bookModel.find()
        res.send(books);
    } catch (err) {
        res.send("something went wrong!");
        console.log(err);
    }
})

app.delete('/deletebook/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await bookModel.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post("/updatebook/:id", async (req, res) => {
    const bookId = req.params;
    const updatedData = req.body;
    console.log("The updated data is", updatedData);

    try {
        const updatedBook = await bookModel.findByIdAndUpdate(bookId.id, updatedData, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: 'Book updated successfully', data: updatedBook });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred', error: err });
    }
});

app.get("/getonebook/:id", async (req, res) => {
    const { id } = req.params;
    console.log("server", id)
    try {
        const book = await bookModel.findById(id);
        if (!book) {
            return res.status(404).json({message: "Not Found"})
        }
        res.status(200).send(book);
    } catch (error) {
        res.status(404).json({message: "something went wrong!"});
        console.log(error);
    }
})

app.listen(5500);