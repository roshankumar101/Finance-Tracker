import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {

  const [page, setPage] = useState(true)

  return (
    <div className='w-full px-4 sm:px-10 py-5 bg-slate-700'>
        <div className='flex justify-between items-center'>
            <Link to='/' className='text-2xl font-black'>Finance Tracker</Link>
            <Link to={`${page? '/splitting': '/'}`} className='px-4 py-1 bg-green-600 text-lg font-medium active:scale-90 uppercase rounded-lg transition-all duration-300' onClick={()=> setPage(!page)}>{page? 'Split bill': 'Summary'}</Link>
        </div>
    </div>
  )
}

export default Navbar