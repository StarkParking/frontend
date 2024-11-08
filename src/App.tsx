import { useCallback } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Connector,
  StarknetConfig,
  jsonRpcProvider
} from '@starknet-react/core'
import { sepolia } from '@starknet-react/chains'
import ControllerConnector from '@cartridge/connector'

import Header from './components/Header'
import MobileLayout from './components/MobileLayout'
import BottomNavigation from './components/BottomNavigation'
import { AccountProvider } from './hooks/useAccount'
import Home from './pages/Home'
// import ParkingSpotSelection from './pages/ParkingSpotSelection'
import Booking from './pages/Booking'
import Sessions from './pages/Sessions'
import ParkingSession from './pages/ParkingSession'
import MapView from './pages/MapView'
import Profile from './pages/Profile'
import { POLICIES, RPC_URL } from './constants'

function App() {
  const rpc = useCallback(() => {
    return { nodeUrl: RPC_URL }
  }, [])

  const provider = jsonRpcProvider({ rpc })

  const connectors = [
    new ControllerConnector({
      rpc: rpc().nodeUrl,
      policies: POLICIES
    }) as never as Connector
  ]

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={provider}
      connectors={connectors}
    >
      <AccountProvider>
        <BrowserRouter>
          <MobileLayout>
            <Toaster position="top-right" />
            <Header />
            <div className="px-4">
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/parking/:id" element={<ParkingSpotSelection />} /> */}
                <Route path="/booking/:id" element={<Booking />} />
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
    </StarknetConfig>
  )
}

export default App
