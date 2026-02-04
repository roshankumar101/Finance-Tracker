import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SplitingPage from "./pages/SplittingPage"


const App = () => {
  return (
    <div className="w-full h-screen text-white bg-gray-950">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/splitting' element={<SplitingPage />} />
      </Routes>
    </div>
  )
}

export default App