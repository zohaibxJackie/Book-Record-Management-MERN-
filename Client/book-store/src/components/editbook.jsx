import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";
import axios from "axios";


function Editbook() {
  const {updateId} = useParams();
  const [data, setData] = useState({
    bookName: "",
    authorName: "",
    availability: true,
    publishYear: 2000
  });
  // set the default
  const [oldBook, setOldBook] = useState({
    bookName: "",
    authorName: "",
    publishYear: false
  });
  const [book, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [avail, setAvail] = useState(true);
  const [year, setYear] = useState(2000);
  const [success, setSuccess] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:5500/getonebook/${updateId}`)
     .then(response => setOldBook(response.data))
     .catch(error => console.error(error));
  }, [])
  useEffect(() => {
    setData(
      {
        bookName: book,
        authorName: author,
        availability: avail,
        publishYear: year
      }
    )
  }, [book, author, avail, year])

  // send the post request
  const handleUpdateEvent = () => {
    const url = `http://localhost:5500/updatebook/${updateId}`;
    axios.post(url, data)
     .then(response => response.status === 200 ? setSuccess("Book updated successfully") : setSuccess("Error in updating book"))
     .catch( err => console.error(err))
  }


  return (
    <div className="w-full h-screen bg-zinc-800 text-white absolute top-0 left-0 z-10">
      <div className="w-5/6 border border-white rounded-md p-8 mx-auto mt-10">
        <Link to={'/'}>
          <IoMdArrowRoundBack className="cursor-pointer hover:text-blue-600" />
        </Link>
        <form>
          <div>
            <label htmlFor="bookName">Book Name</label>
            <input type="text" id="bookName" className="w-full p-2 bg-zinc-700" value={oldBook.bookName} onChange={(e) => {setBook(e.target.value)} } required />
          </div>
          <div>
            <label htmlFor="authorName">Author Name</label>
            <input type="text" id="authorName" className="w-full p-2 bg-zinc-700" value={oldBook.authorName} onChange={(e) => {setAuthor(e.target.value)}} required />
          </div>
          <div>
            <p>Is this book available?</p>
            <label htmlFor="available-yes" className="cursor-pointer">
              <input type="radio" name="availability" id="available-yes" value="true" className="cursor-pointer" onChange={(e) => {setAvail(e.target.value)}} checked={oldBook.availability === true} /> Yes
            </label>
            <label htmlFor="available-no" className="ml-4 cursor-pointer">
              <input type="radio" name="availability" id="available-no" value="false" className="cursor-pointer" onChange={(e) => {setAvail(e.target.value)}} checked={oldBook.availability === false} /> No
            </label>
          </div>
          <div>
            <label htmlFor="publishedDate">Published Date</label>
            <input type="text" id="publishedDate" className="w-full p-2 bg-zinc-700" value={oldBook.publishYear} onChange={(e) => {setYear(e.target.value)}} required />
          </div>
          <p className={`font-bold ${success === 'Book updated successfully' ? 'text-green-700' : 'text-red-700'}`}>{success}</p>
          <button type="button" className="px-6 py-3 bg-blue-600 rounded-md mt-2 hover:bg-blue-700 font-bold" onClick={() => {handleUpdateEvent()}}>Change</button>
        </form>
      </div>
    </div>
  )
}

export default Editbook;