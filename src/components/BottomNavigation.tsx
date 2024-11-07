import { GoHomeFill } from 'react-icons/go'
import { FaStopwatch, FaCircleUser } from 'react-icons/fa6'
import { FaRegMap } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

function BottomNavigation() {
  const location = useLocation()

  return (
    <div className="fixed bottom-0 left-1/2 bg-black border-t py-4 max-w-[430px] w-full -translate-x-1/2 z-99999">
      <div className="container max-w-md mx-auto flex justify-between px-4">
        {[
          { icon: GoHomeFill, label: 'Home', to: '/' },
          { icon: FaStopwatch, label: 'Sessions', to: '/session' },
          { icon: FaRegMap, label: 'Map', to: '/map' },
          { icon: FaCircleUser, label: 'Profile', to: '/profile' }
        ].map(({ icon: Icon, label, to }) => {
          const linkClassName =
            (label === 'Home' && location.pathname === '/') ||
            (label !== 'Home' && location.pathname.includes(to))
              ? 'text-lime-400'
              : 'text-gray-400'
          return (
            <Link key={label} to={to} className="flex flex-col items-center">
              <Icon className={`h-6 w-6 ${linkClassName}`} />
              <span className={`text-xs mt-1 ${linkClassName}`}>{label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation
