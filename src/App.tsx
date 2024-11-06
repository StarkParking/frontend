import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import MobileLayout from './components/MobileLayout'
import BottomNavigation from './components/BottomNavigation'

function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Toaster position="top-right" />
        <BottomNavigation />
      </MobileLayout>
    </BrowserRouter>
  )
}

export default App
