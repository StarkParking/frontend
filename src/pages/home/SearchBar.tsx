import { Input } from '@/components/ui/input'
import { IoIosSearch } from 'react-icons/io'

function SearchBar() {
  return (
    <div className="relative mb-6">
      <Input
        placeholder="Search for a parking spot"
        className="h-[40px] px-4 bg-gray-100 border-0 rounded-full"
      />
      <IoIosSearch
        className="absolute right-3 top-2 text-black-200"
        size={24}
      />
    </div>
  )
}

export default SearchBar
