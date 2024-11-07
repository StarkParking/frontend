import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Parking {
  id: number
  name: string
  amount: number
  times: string[]
  image?: string
}

const parkings: Parking[] = [
  {
    id: 1,
    name: 'Westfield Mall',
    amount: -3.23,
    times: ['2:31 pm', '3:42 pm']
  },
  {
    id: 2,
    name: 'Posnania Mall',
    amount: -8.12,
    times: ['11:29 am', '2:18 pm']
  }
]
const LatestParkings = () => {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold mb-4">Your latest parkings</h2>
      {parkings.map(parking => (
        <Card key={parking.id} className="bg-white p-4">
          <div className="flex gap-4 justify-between">
            {parking.image ? (
              <img
                src={parking.image}
                alt={parking.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
            ) : (
              <Avatar className="h-24 w-24 rounded-lg bg-gray-100">
                <AvatarFallback className="text-2xl font-semibold text-gray-600">
                  {parking.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <h3 className="font-medium">{parking.name}</h3>
              <p className="text-gray-400">${parking.amount}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              {parking.times.map((time, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 min-w-[72px]"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      index === 0 ? 'border border-black' : 'bg-black'
                    }`}
                  />
                  <span className="text-sm text-gray-400">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
export default LatestParkings
