import { useAccount } from '@/hooks/useAccount'
import { addZeroAfter0x } from '@/lib/utils'
import { useBalance } from '@starknet-react/core'

function Balance() {
  const { address } = useAccount()
  const { data, isFetching, isSuccess, error } = useBalance({
    address: addZeroAfter0x(address || ''),
    watch: false
  })

  console.log({ data, isFetching, isSuccess, error })

  return (
    <div className="mb-8 flex justify-between items-end">
      <div>
        <div className="text-sm opacity-80 mb-2">Your Balance</div>
        <div className="text-3xl font-bold">
          {isFetching && <span>Loading...</span>}
          {isSuccess && <span>{data?.formatted}</span>}
        </div>
      </div>
    </div>
  )
}

export default Balance
