import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import MobileLayout from './components/MobileLayout'
import BottomNavigation from './components/BottomNavigation'
import { AccountProvider } from './hooks/useAccount'
import Home from './pages/Home'
import ParkingSpotSelection from './pages/ParkingSpotSelection'

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <MobileLayout>
          <Toaster position="top-right" />
          <Header />
          <div className=":uno: px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/parking/:id" element={<ParkingSpotSelection />} />
            </Routes>
          </div>
          <BottomNavigation />
        </MobileLayout>
      </BrowserRouter>
    </AccountProvider>
  )
}

export default App
