import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import ParkingSpotGrid from './ParkingSpotGrid'

const ParkingSpotSelection = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <div className="container max-w-md mx-auto px-4 pt-8 space-y-6">
        <div className="flex items-center gap-4">
          <Button size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Choose a Spot {id}</h1>
        </div>

        <div className="rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-400">Available spots</p>
              <p className="text-2xl font-semibold">28</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm">Occupied</span>
              </div>
            </div>
          </div>
          <ParkingSpotGrid />
        </div>
      </div>
    </div>
  )
}

export default ParkingSpotSelection
