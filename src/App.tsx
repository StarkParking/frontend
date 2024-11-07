import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import MobileLayout from './components/MobileLayout'
import BottomNavigation from './components/BottomNavigation'
import { AccountProvider } from './hooks/useAccount'
import Home from './pages/Home'
import ParkingSpotSelection from './pages/ParkingSpotSelection'
import Booking from './pages/Booking'
import Sessions from './pages/Sessions'
import ParkingSession from './pages/ParkingSession'
import MapView from './pages/MapView'
import Profile from './pages/Profile'

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <MobileLayout>
          <Toaster position="top-right" />
          <Header />
          <div className="px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/parking/:id" element={<ParkingSpotSelection />} />
              <Route path="/booking/:spotId" element={<Booking />} />
              <Route path="/session/" element={<Sessions />} />
              <Route path="/session/:spotId" element={<ParkingSession />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <BottomNavigation />
        </MobileLayout>
      </BrowserRouter>
    </AccountProvider>
  )
}

export default App
