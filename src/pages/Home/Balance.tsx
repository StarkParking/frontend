import { Account, Contract } from 'starknet'

import Dots from '@/components/Dots'
import { PARKING_CONTRACT_ADDRESS, STRK_ADDRESS } from '@/constants'
import { useArgent } from '@/hooks/useArgent'
import { addZeroAfter0x } from '@/lib/utils'
import { useBalance } from '@starknet-react/core'
import ERC20_ABI from '@/abi/erc20'

function Balance() {
  const { account } = useArgent()
  const contract = new Contract(
    ERC20_ABI,
    PARKING_CONTRACT_ADDRESS,
    account as unknown as Account
  )
  // const { data, isLoading } = useBalance({
  //   address: addZeroAfter0x(address || ''),
  //   token: STRK_ADDRESS,
  //   watch: false
  // })

  return (
    <div className="mb-8 flex justify-between items-end">
      <div>
        <div className="text-sm opacity-80 mb-2">Your Balance</div>
        <div className="text-3xl font-bold">
          {/* {isLoading ? <Dots /> : <span>{data?.formatted} STRK</span>} */}
        </div>
      </div>
    </div>
  )
}

export default Balance
