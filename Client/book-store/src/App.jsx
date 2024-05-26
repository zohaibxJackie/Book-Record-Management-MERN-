import { Route, Routes } from "react-router-dom";
import Editbook from "./components/editbook";
import Home from "./components/home"
import Addbook from "./components/addbook";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit-book-info/:updateId' element={<Editbook />} />
        <Route path='/add-new-book' element={<Addbook />} />
      </Routes>
    </div>
  )
}

export default App;