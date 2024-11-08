import Dots from '@/components/Dots'
import { STRK_ADDRESS } from '@/constants'
import { useAccount } from '@/hooks/useAccount'
import { addZeroAfter0x } from '@/lib/utils'
import { useBalance } from '@starknet-react/core'

function Balance() {
  const { address } = useAccount()
  const { data, isLoading } = useBalance({
    address: addZeroAfter0x(address || ''),
    token: STRK_ADDRESS,
    watch: false
  })

  return (
    <div className="mb-8 flex justify-between items-end">
      <div>
        <div className="text-sm opacity-80 mb-2">Your Balance</div>
        <div className="text-3xl font-bold">
          {isLoading ? <Dots /> : <span>{data?.formatted} STRK</span>}
        </div>
      </div>
    </div>
  )
}

export default Balance
