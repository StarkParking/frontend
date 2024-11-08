import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useReadContract } from '@starknet-react/core'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { MdOutlineGeneratingTokens } from 'react-icons/md'

import { ChevronLeft, Clock, Calendar, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import PARKING_ABI from '@/abi/parking.json'
import { SUPPORTED_TOKENS, Token } from '@/constants'

interface Duration {
  text: string
  value: number
}

const generateTimeSlots = (): Duration[] => {
  const timeSlots: Duration[] = [
    {
      text: '1 hour',
      value: 1
    },
    {
      text: '2 hours',
      value: 2
    },
    {
      text: '3 hours',
      value: 3
    },
    {
      text: '4 hours',
      value: 4
    },
    {
      text: '5 hours',
      value: 5
    }
  ]
  return timeSlots
}

const Booking = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [duration, setDuration] = useState('')
  const [token, setToken] = useState<Token | undefined>(undefined)
  const timeSlots = generateTimeSlots()

  const { data } = useReadContract({
    abi: PARKING_ABI,
    functionName: 'get_oracle_token_quote',
    args: [id]
  })

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
                Today, {format(new Date(), 'd MMM, y')}
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

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MdOutlineGeneratingTokens className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <p className="font-medium mb-2">Token</p>
              <Select value={token?.address} onValueChange={() => setToken}>
                <SelectTrigger className="w-full border-zinc-700">
                  <SelectValue placeholder="Select payment token" />
                </SelectTrigger>
                <SelectContent className="border-zinc-700">
                  {SUPPORTED_TOKENS.map(token => (
                    <SelectItem
                      key={`token-${token.address}`}
                      value={token.address}
                    >
                      <div className="flex items-center gap-2">
                        <token.icon />
                        <span>{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
