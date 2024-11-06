import { useState } from 'react'
import { IoMdWallet } from 'react-icons/io'
import { FaLocationDot } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Header() {
  const [location, setLocation] = useState('Sukabumi, Jawa barat')

  return (
    <div className="flex justify-between items-center mb-6 px-4 pt-4">
      <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 text-black gap-2">
        <FaLocationDot />
        <span>{location}</span>
      </div>
      <div className="relative rounded-full p-4 bg-gray-200">
        <Link to="/notifications">
          <IoMdWallet className="h-6 w-6 text-black" />
        </Link>
      </div>
    </div>
  )
}

export default Header
