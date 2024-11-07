import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

const spots = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  isOccupied: Math.random() > 0.7
}))

const ParkingSpotGrid = () => {
  const navigate = useNavigate()
  const handleSpotSelect = (spotId: number) => {
    navigate(`/booking/${spotId}`)
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {spots.map(spot => (
        <Button
          key={spot.id}
          variant="outline"
          disabled={spot.isOccupied}
          className={cn(
            'h-12 w-full',
            spot.isOccupied
              ? 'bg-red-500/20 hover:bg-red-500/20 border-red-500/50'
              : 'bg-green-500/20 hover:bg-green-500/30 border-green-500/50'
          )}
          onClick={() => handleSpotSelect(spot.id)}
        >
          {spot.id}
        </Button>
      ))}
    </div>
  )
}

export default ParkingSpotGrid
