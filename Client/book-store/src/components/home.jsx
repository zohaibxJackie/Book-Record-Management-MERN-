import { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdAddBox } from "react-icons/md";

const Home = () => {
    const [bookData, setBookData] = useState([]);
    const [bookId, setBookId] = useState("");

    useEffect(() => {
        if (!bookId) return;

        try {
            const url = `http://localhost:5500/deletebook/${bookId}`;
            const options = {
                method: 'DELETE',
            }
            console.log("the book id is", bookId);

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log("success", data)
                })
                .catch(err => {
                    console.error("error", err);
                })
            // This will filter all the elements which does not pass the test. means the current id which is recived in bookId will be removed and other will be not
            setBookData(bookData.filter(elem => bookId !== elem._id))
        } catch (error) {
            console.error(error);
        }
    }, [bookId])

    // this loads the initial cards by get request
    useEffect(() => {
        fetch("http://localhost:5500/showbooks")
            .then(response => response.json())
            .then(data => setBookData(data))
    }, [])

    return (
        <div className='min-h-screen w-full bg-zinc-800'>
            <h1 className='text-white text-4xl text-center py-4'>Welcome To Our Book Library</h1>
            <div className="container w-full px-4 flex flex-wrap gap-4">
                {/* the curly braces means we are returning the values */}
                {bookData.map((e, index) => (
                    <div key={index} className="card w-40 text-white border border-white p-4 rounded-md shadow-md bg-zinc-900 grid">
                        <p className='font-bold'>Book name:</p>
                        <p>{e.bookName}</p>
                        <p className='font-bold'>Author name:</p>
                        <p>{e.authorName}</p>
                        <p className='font-bold'>Availabilty:</p>
                        <p>{e.availability ? "Yes" : "Sorry"}</p>
                        <p className='font-bold'>Year of Publish:</p>
                        <p>{e.publishYear}</p>
                        <div className="icons flex gap-4">
                            <Link to={`/edit-book-info/${e._id}`}>
                                <FaEdit className='cursor-pointer hover:text-blue-600' />
                            </Link>
                            <FaTrash className='cursor-pointer hover:text-red-600' onClick={() => { setBookId(e._id); }} />
                        </div>
                    </div>
                ))}
                <Link to={'/add-new-book'}>
                    <span><MdAddBox className='text-white cursor-pointer hover:text-blue-500' /></span>
                </Link>
            </div>
        </div>
    )
}

export default Home;