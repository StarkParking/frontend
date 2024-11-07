import { Card } from '@/components/ui/card'
import { Clock, MapPin, Car } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ParkingSession {
  id: number
  spotId: number
  startTime: string
  endTime: string
  location: string
  status: 'active' | 'completed' | 'expired'
  price: number
}

// Mock data - In a real app, this would come from an API
const mockSessions: ParkingSession[] = [
  {
    id: 1,
    spotId: 101,
    startTime: '2024-02-20T10:00:00',
    endTime: '2024-02-20T11:00:00',
    location: 'Toserba Yogya Parking',
    status: 'active',
    price: 4.2
  },
  {
    id: 2,
    spotId: 102,
    startTime: '2024-02-19T14:00:00',
    endTime: '2024-02-19T16:00:00',
    location: 'Jayanti Sukabumi Parking',
    status: 'completed',
    price: 7.0
  },
  {
    id: 3,
    spotId: 103,
    startTime: '2024-02-18T09:00:00',
    endTime: '2024-02-18T10:00:00',
    location: 'Mall Parking',
    status: 'expired',
    price: 3.5
  }
]

const Sessions = () => {
  const navigate = useNavigate()

  const getStatusColor = (status: ParkingSession['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-100'
      case 'completed':
        return 'text-blue-500 bg-blue-100'
      case 'expired':
        return 'text-red-500 bg-red-100'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="min-h-screen">
      <div className="container max-w-md mx-auto px-4 pt-8 space-y-6">
        <h1 className="text-2xl font-bold">Parking Sessions</h1>

        <div className="space-y-4">
          {mockSessions.map(session => (
            <Card
              key={session.id}
              className="p-4 cursor-pointer"
              onClick={() => navigate(`/session/${session.spotId}`)}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {session.location}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Spot #{session.spotId}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(
                      session.status
                    )}`}
                  >
                    {session.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <div className="text-sm">
                      <p>Start: {formatDate(session.startTime)}</p>
                      <p>End: {formatDate(session.endTime)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{session.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <Car className="h-4 w-4" />
                    <span className="text-sm">${session.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sessions
