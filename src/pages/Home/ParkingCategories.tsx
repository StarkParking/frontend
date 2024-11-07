import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { MapPin, Building2, TreePine, Network } from 'lucide-react'
import ParkingSpots from './ParkingSpots'

const categories = [
  { icon: MapPin, value: 'nearest', label: 'Nearest', active: true },
  { icon: Building2, value: 'malls', label: 'Malls' },
  { icon: TreePine, value: 'parkgo', label: 'Park&Go' },
  { icon: Network, value: 'hubs', label: 'Hubs' }
]

const ParkingCategories = () => {
  return (
    <Tabs defaultValue="nearest" className="w-full mb-6">
      <TabsList className="grid grid-cols-4 gap-2 bg-transparent h-auto p-0 mb-6">
        {categories.map(({ icon: Icon, label, value }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="flex flex-col gap-2 h-auto py-4 data-[state=active]:bg-lime data-[state=active]:text-black bg-zinc-900 text-white"
          >
            <Icon className="h-6 w-6" />
            <span className="text-sm">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map(({ value }) => (
        <TabsContent key={value} value={value}>
          <ParkingSpots category={value} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default ParkingCategories
