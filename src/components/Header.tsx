import { useEffect, useState } from 'react'
import { IoMdWallet } from 'react-icons/io'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosSettings } from 'react-icons/io'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '../hooks/useAccount'
import { useArgent } from '@/hooks/useArgent'

function Header() {
  const { account, connect } = useArgent()
  const [location, setLocation] = useState('Loading...')
  const navigate = useNavigate()

  const handleWalletButton = async () => {
    if (!account) {
      await connect()
    } else {
      navigate('/profile')
    }
  }

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const userLocation = `${data.city}, ${data.country}`
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
        {account ? (
          <IoIosSettings className="h-6 w-6 text-black" />
        ) : (
          <IoMdWallet className="h-6 w-6 text-black" />
        )}
      </Button>
    </div>
  )
}

export default Header
