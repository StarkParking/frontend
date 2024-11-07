import Balance from './Balance'
import ParkingCategories from './ParkingCategories'
import SearchBar from './SearchBar'
// import LatestParkings from './LastestParkings'

function Home() {
  return (
    <div>
      <Balance />
      <SearchBar />
      <ParkingCategories />
      {/* <LatestParkings /> */}
    </div>
  )
}

export default Home
