import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, Clock, Calendar, Car } from 'lucide-react'
import { toast } from 'react-hot-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useState } from 'react'

interface Duration {
  text: string
  value: number
}

const generateTimeSlots = (): Duration[] => {
  const timeSlots: Duration[] = [
    {
      text: '30 mins',
      value: 30
    },
    {
      text: '1 hour',
      value: 60
    },
    {
      text: '2 hours',
      value: 120
    },
    {
      text: '3 hours',
      value: 180
    },
    {
      text: '4 hours',
      value: 240
    },
    {
      text: '5 hours',
      value: 300
    }
  ]
  return timeSlots
}

const Booking = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [duration, setDuration] = useState('')
  const timeSlots = generateTimeSlots()

  const handleBooking = () => {
    if (!duration) {
      toast.error('Please select parking duration')
      return
    }

    toast.success('Booking confirmed!')
    navigate('/')
  }

  return (
    <div className="container max-w-md mx-auto px-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button size="icon" className="text-white" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">Booking Details</h1>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-gray-400">Selected Spot</p>
          <p className="text-2xl font-bold">#{id}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium mb-2">How Long?</p>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="w-full border-zinc-700">
                    <SelectValue placeholder="Select parking duration" />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-700">
                    {timeSlots.map(time => (
                      <SelectItem
                        key={`checkin-${time.value}`}
                        value={time.value.toString()}
                      >
                        {time.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-sm text-gray-400">
                Today, {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Car className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">Vehicle</p>
              <p className="text-sm text-gray-400">Car - ABC 123</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">Total Amount</span>
            <span className="text-2xl font-bold">$8.40</span>
          </div>
          <Button
            className="w-full bg-black hover:bg-gray-800"
            onClick={handleBooking}
          >
            Confirm Booking
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Booking
