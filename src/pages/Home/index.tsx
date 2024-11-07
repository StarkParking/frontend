import Balance from './Balance'
// import LatestParkings from './LastestParkings'
import ParkingCategories from './ParkingCategories'
import SearchBar from './SearchBar'

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
