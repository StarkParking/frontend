import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronLeft, Plus, Wallet } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { FaExternalLinkAlt } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useAccount } from '@/hooks/useAccount'

interface Vehicle {
  plate: string
  model: string
}

const Profile = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [newVehicle, setNewVehicle] = useState({ plate: '', model: '' })
  const [isAddingVehicle, setIsAddingVehicle] = useState(false)
  const { address, openConnectionPage, clearSession } = useAccount()

  const handleAddVehicle = () => {
    if (!newVehicle.plate || !newVehicle.model) {
      toast.error('Please fill in all vehicle details')
      return
    }
    setVehicles([...vehicles, newVehicle])
    setNewVehicle({ plate: '', model: '' })
    setIsAddingVehicle(false)
    toast.success('Vehicle added successfully')
  }

  const handleSaveProfile = () => {
    if (!name || !email || !phone) {
      toast.error('Please fill in all required fields')
      return
    }
    // Here you would typically save to backend
    toast.success('Profile updated successfully')
  }

  const handleConnectWallet = () => {
    openConnectionPage()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-md mx-auto px-4 pt-8 pb-20 space-y-6">
        <div className="flex items-center gap-4">
          <Button size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1234567890"
              />
            </div>
            <Button onClick={handleSaveProfile} className="w-full">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicles</CardTitle>
            <CardDescription>Manage your registered vehicles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {vehicles.map((vehicle, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
              >
                <div>
                  <p className="font-medium">{vehicle.plate}</p>
                  <p className="text-sm text-gray-500">{vehicle.model}</p>
                </div>
              </div>
            ))}

            {isAddingVehicle ? (
              <div className="space-y-4">
                <Input
                  placeholder="License Plate"
                  value={newVehicle.plate}
                  onChange={e =>
                    setNewVehicle({ ...newVehicle, plate: e.target.value })
                  }
                />
                <Input
                  placeholder="Car Model"
                  value={newVehicle.model}
                  onChange={e =>
                    setNewVehicle({ ...newVehicle, model: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddVehicle} className="flex-1">
                    Add Vehicle
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingVehicle(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsAddingVehicle(true)}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Vehicle
              </Button>
            )}
          </CardContent>
        </Card>

        {!address ? (
          <Card>
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
              <CardDescription>Connect your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                onClick={handleConnectWallet}
                className="w-full"
              >
                <Wallet className="w-4 h-4 mr-2" /> Connect Wallet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
              <CardDescription>Your wallet address</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="break-all mb-2">{address}</p>
              <div>
                <a
                  href={`https://voyager.online/contract/${address}`}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <span>View on explorer</span>
                  <FaExternalLinkAlt />
                </a>
              </div>
              <Button variant="destructive" onClick={clearSession}>
                Disconnect
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Profile
