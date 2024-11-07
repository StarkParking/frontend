import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Car, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { useEffect, useState } from 'react'

// Fix for default marker icon in react-leaflet
const defaultIcon = new Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [48, 48],
  iconAnchor: [48, 48]
})

// Mock parking spots data - in a real app, this would come from an API
const parkingSpots = [
  {
    id: 1,
    name: 'Toserba Yogya Parking',
    position: [-6.9175, 106.9275], // Sukabumi coordinates
    available: 28,
    price: 4.2,
    address: 'Jl. R. E. Martadinata, Cikole, Sukabumi',
    distance: '0.5 km'
  },
  {
    id: 2,
    name: 'Jayanti Sukabumi Parking',
    position: [-6.9165, 106.9295],
    available: 45,
    price: 3.5,
    address: 'Jl. Gunungparang, Cikole, Sukabumi',
    distance: '0.8 km'
  },
  {
    id: 3,
    name: 'Mall Parking',
    position: [-6.9155, 106.9255],
    available: 15,
    price: 5.0,
    address: 'Jl. Pahlawan, Malang',
    distance: '1.2 km'
  }
]

const MapView = () => {
  const navigate = useNavigate()
  const [location, setLocation] = useState<[number, number]>([0, 0])

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const userLocation = [data.latitude, data.longtitude] as [
          number,
          number
        ]
        setLocation(userLocation)
      })
      .catch(error => {
        console.error('Error fetching location:', error)
        setLocation([0, 0])
      })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="container max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Parking Map</h1>
          </div>
        </div>
      </div>

      <MapContainer center={location} zoom={15} className="w-full h-[450px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {parkingSpots.map(spot => (
          <Marker
            key={spot.id}
            position={spot.position as [number, number]}
            icon={defaultIcon as any}
          >
            <Popup>
              <div className="p-2 space-y-3 min-w-[200px]">
                <h3 className="font-semibold text-lg">{spot.name}</h3>
                <p className="text-sm text-gray-600">{spot.address}</p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Car className="h-4 w-4" />
                    <span>{spot.available} spots</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{spot.distance}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    ${spot.price.toFixed(2)}/hr
                  </span>
                  <Button
                    size="sm"
                    onClick={e => {
                      e.stopPropagation()
                      navigate(`/parking/${spot.id}`)
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView
