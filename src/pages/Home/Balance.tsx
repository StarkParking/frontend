// import { useAccount } from '@/hooks/useAccount'
import { addZeroAfter0x } from '@/lib/utils'
import { useAccount, useBalance } from '@starknet-react/core'

function Balance() {
  // const { address } = useAccount()
  const { address } = useAccount()
  const { data, isFetching, isSuccess, error, status } = useBalance({
    address:
      '0x5c8a461c19dd577fe6257c9ec0376b87aa155acebd84f32a72d02b79bc67fd1', //: addZeroAfter0x(address || ''),
    token: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
    watch: false
  })

  console.log({ address, data, isFetching, isSuccess, error, status })

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
