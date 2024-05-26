import axios from 'axios';
import { useState, useEffect } from 'react';
import {IoMdArrowRoundBack} from "react-icons/io";
import { Link } from 'react-router-dom';

function Addbook() {
    const [book, setBook] = useState("");
    const [author, setAuthor] = useState("");
    const [avail, setAvail] = useState(true);
    const [year, setYear] = useState("");
    const [formValidation, setFormValidation] = useState(true);
    const [errMessage, setErrMessage] = useState('');
    const currYear = new Date().getFullYear();

    const [data, setData] = useState({
        bookName: "",
        authorName: "",
        availability: true,
        publishYear: 2000
    });

    const handleCreateEvent = () => {
        axios.post("http://localhost:5500/createbook", data)
            .then(response => {
                console.log(response);
                setErrMessage("Book added successfully");
            })
            .catch(err => {
                console.error(err);
                setErrMessage("Error adding book");
            });
    };

    useEffect(() => {
        setData({
            bookName: book,
            authorName: author,
            availability: avail,
            publishYear: year ? parseInt(year) : 0
        });
    }, [book, author, avail, year]);

    function showMsg() {
        if (book === "" || author === "" || year === "" || parseInt(year) > currYear) {
            setFormValidation(false);
            setErrMessage("Please Enter a Valid Input");
        } else {
            setFormValidation(true);
            setErrMessage("Book added successfully");
            handleCreateEvent();
        }
    }

    return (
        <div className="w-full h-screen bg-zinc-800 text-white absolute top-0 left-0 z-10">
            <div className='w-5/6 border border-white rounded-md p-8 mx-auto mt-10'>
                <Link to={'/'}>
                    <IoMdArrowRoundBack className="cursor-pointer hover:text-blue-600" />
                </Link>
                <form>
                    <div>
                        <label htmlFor="bookName">Book Name</label>
                        <input type="text" id="bookName" className="w-full p-2 bg-zinc-700" autoComplete='off' onChange={(e) => setBook(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="authorName">Author Name</label>
                        <input type="text" id="authorName" className="w-full p-2 bg-zinc-700" autoComplete='off' onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div>
                        <p>Is this book available?</p>
                        <label htmlFor="available-yes" className="cursor-pointer">
                            <input type="radio" name="availability" id="available-yes" value={true} className="cursor-pointer" onChange={() => setAvail(true)} checked={avail === true} /> Yes
                        </label>
                        <label htmlFor="available-no" className="ml-4 cursor-pointer">
                            <input type="radio" name="availability" id="available-no" value={false} className="cursor-pointer" onChange={() => setAvail(false)} checked={avail === false} /> No
                        </label>
                    </div>
                    <div>
                        <label htmlFor="publishedDate">Published Date</label>
                        <input type="number" id="publishedDate" className="w-full p-2 bg-zinc-700" autoComplete='off' onChange={(e) => setYear(e.target.value)} />
                    </div>
                    <p className={`font-bold ${formValidation ? 'text-green-700' : 'text-red-700'}`}>{errMessage}</p>
                    <button type="button" className="px-6 py-3 bg-blue-600 rounded-md mt-2 hover:bg-blue-700 font-bold" onClick={showMsg}>Add Book</button>
                </form>
            </div>
        </div>
    );
}

export default Addbook;
