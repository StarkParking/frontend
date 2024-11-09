import { Account, Contract } from 'starknet'

import { PARKING_CONTRACT_ADDRESS, STRK_ADDRESS } from '@/constants'
import { useArgent } from '@/hooks/useArgent'
import ERC20_ABI from '@/abi/erc20'
import { useEffect, useState } from 'react'
import Dots from '@/components/Dots'
import { formatUnits } from 'viem'

function Balance() {
  const { account } = useArgent()
  const [balance, setBalance] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const contract = new Contract(
    ERC20_ABI,
    STRK_ADDRESS,
    account as unknown as Account
  )

  useEffect(() => {
    ;(async () => {
      if (account) {
        try {
          setIsLoading(true)

          const balance = await contract.balance_of(account.address)

          setBalance(balance)
        } catch (error) {
          console.error('Could not load balance')
        } finally {
          setIsLoading(false)
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mb-8 flex justify-between items-end">
      <div>
        <div className="text-sm opacity-80 mb-2">Your Balance</div>
        <div className="text-3xl font-bold">
          {isLoading ? (
            <Dots />
          ) : (
            <span>
              {Number(formatUnits(BigInt(balance), 18)).toFixed(3)} STRK
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Balance
