import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import MobileLayout from './components/MobileLayout'
import BottomNavigation from './components/BottomNavigation'

function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Toaster position="top-right" />
        <Header />
        <BottomNavigation />
      </MobileLayout>
    </BrowserRouter>
  )
}

export default App
