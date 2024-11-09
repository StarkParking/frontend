import { ArgentTMA, type SessionAccountInterface } from '@argent/tma-wallet'
import {
  cairo,
  shortString,
  type Call,
  type Calldata,
  type Contract,
  type RawArgs
} from 'starknet'
import toast from 'react-hot-toast'
import {
  ALLOWED_METHODS,
  APPNAME,
  PARKING_CONTRACT_ADDRESS,
  REDIRECT_URI,
  STRK_ADDRESS
} from '@/constants'

export const initWallet = () =>
  ArgentTMA.init({
    environment: 'sepolia',
    appName: APPNAME,
    appTelegramUrl: REDIRECT_URI,
    sessionParams: {
      allowedMethods: [
        {
          contract: PARKING_CONTRACT_ADDRESS,
          selector: 'book_parking'
        },
        {
          contract: PARKING_CONTRACT_ADDRESS,
          selector: 'end_parking'
        },
        {
          contract: PARKING_CONTRACT_ADDRESS,
          selector: 'extend_parking'
        }
      ],
      validityDays: 90
    }
  })

export async function executeContractAction(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calldata: any[],
  successMessage: string,
  errorMessage: string
) {
  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: calldata
  }

  try {
    if (!calldata) return false
    const fees = await account?.estimateInvokeFee([call])

    console.log({ ...calldata })

    const tx = await contract[action](...calldata, {
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined
    })

    await argentTMA.provider.waitForTransaction(tx.transaction_hash)
    toast.success(successMessage)
    return true
  } catch (error) {
    console.error(`Error performing ${action}:`, error)
    toast.error(errorMessage)
    return false
  }
}
