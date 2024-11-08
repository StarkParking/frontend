import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { HiCurrencyDollar } from 'react-icons/hi2'
import { TbClockHour3Filled } from 'react-icons/tb'
import { PiCarSimpleFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

interface ParkingSpot {
  id: number
  name: string
  address: string
  price: number
  minutes: number
  available: number
  image?: string
}

const parkingSpots: Record<string, ParkingSpot[]> = {
  nearest: [
    {
      id: 1,
      name: 'Toserba Yogya Parking',
      address: 'Jl. R. E. Martadinata, Cikole, Sukabumi',
      price: 4.2,
      minutes: 4,
      available: 28
    },
    {
      id: 2,
      name: 'Jayanti Sukabumi Parking',
      address: 'Jl. Gunungparang, Cikole, Sukabumi',
      price: 3.5,
      minutes: 6,
      available: 45
    }
  ],
  malls: [
    {
      id: 3,
      name: 'Westfield Mall',
      address: 'Jl. R. E. Martadinata, Cikole, Sukabumi',
      price: 4.0,
      minutes: 4,
      available: 150
    },
    {
      id: 4,
      name: 'Shopping Center',
      address: 'Jl. R. E. Martadinata, Cikole, Sukabumi',
      price: 3.5,
      minutes: 4,
      available: 85
    }
  ],
  parkgo: [],
  hubs: []
}

interface ParkingSpotsProps {
  category: string
}

const ParkingSpots = ({ category }: ParkingSpotsProps) => {
  const spots = parkingSpots[category] || []
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      {spots.map(spot => (
        <Card
          key={spot.id}
          className="bg-white p-4 cursor-pointer"
          onClick={() => navigate(`/booking/${spot.id}`)}
        >
          <div className="flex gap-4 mb-4">
            {spot.image ? (
              <img
                src={spot.image}
                alt={spot.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
            ) : (
              <Avatar className="h-24 w-24 rounded-lg bg-gray-100">
                <AvatarFallback className="text-2xl font-semibold text-gray-600">
                  {spot.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">
                {spot.name}
              </h3>
              <p className="text-gray-500 text-sm mb-3">{spot.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <HiCurrencyDollar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">
                <span className="text-gray-900 font-medium">${spot.price}</span>
                /hr
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TbClockHour3Filled className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">
                <span className="text-gray-900 font-medium">
                  {spot.minutes}
                </span>{' '}
                minutes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <PiCarSimpleFill className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">
                <span className="text-gray-900 font-medium">
                  {spot.available}
                </span>{' '}
                Available
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default ParkingSpots
