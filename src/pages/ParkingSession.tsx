import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { MapPin, Home, Timer, Wallet, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const ParkingSession = () => {
  const { spotId } = useParams()
  const navigate = useNavigate()
  const [remainingTime, setRemainingTime] = useState(1200) // 20 minutes in seconds
  const [progress, setProgress] = useState(75) // 75% of time remaining

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-md mx-auto px-4 pt-8 space-y-8">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Parking Session
        </h1>

        <div className="relative mx-auto">
          <Progress value={progress} />
        </div>

        <div className="text-center space-y-2">
          <div className="text-5xl font-bold text-gray-900">
            {formatTime(remainingTime)}
          </div>
          <p className="text-gray-500">Remaining Parking Time</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Slot {spotId}
              </p>
              <div className="flex gap-8 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Arrive after</p>
                  <p className="text-gray-900">10:00 AM</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Exit before</p>
                  <p className="text-gray-900">11:00 AM</p>
                </div>
              </div>
            </div>
            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              1 Hours
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-green-500 text-green-500 hover:bg-green-50"
            onClick={() => toast.success('Vehicle location shared!')}
          >
            <MapPin className="mr-2 h-4 w-4" /> Find My Vehicle
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => navigate(`/extend/${spotId}`)}
          >
            Extend Time
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => {
              toast.success('Parking session ended')
              navigate('/')
            }}
          >
            End Parking
          </Button>
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
          <div className="container max-w-md mx-auto">
            <div className="flex justify-between px-8 py-4">
              <Button variant="ghost" size="icon">
                <Home className="h-6 w-6 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon">
                <Timer className="h-6 w-6 text-green-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <Wallet className="h-6 w-6 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkingSession
