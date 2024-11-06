import { useEffect, useState } from 'react'
import { IoMdWallet } from 'react-icons/io'
import { FaLocationDot } from 'react-icons/fa6'
import { Button } from './ui/button'
import { useAccount } from '../hooks/useAccount'
import { useNavigate } from 'react-router-dom'

function Header() {
  const { address, openConnectionPage } = useAccount()
  const [location, setLocation] = useState('Loading...')
  const navigate = useNavigate()

  const handleWalletButton = () => {
    if (!address) {
      openConnectionPage()
    } else {
      navigate('/profile')
    }
  }

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const userLocation = `${data.city}`
        setLocation(userLocation)
      })
      .catch(error => {
        console.error('Error fetching location:', error)
        setLocation('Unknown location')
      })
  }, [])

  return (
    <div className="flex justify-between items-center mb-6 px-4 pt-4">
      <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 text-black gap-2">
        <FaLocationDot />
        <span>{location}</span>
      </div>
      <Button variant="secondary" onClick={handleWalletButton}>
        <IoMdWallet className="h-6 w-6 text-black" />
      </Button>
    </div>
  )
}

export default Header
