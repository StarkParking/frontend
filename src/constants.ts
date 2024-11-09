import EthSvg from '@/assets/eth.svg?react'
import STRKSvg from '@/assets/strk.svg?react'

export const APPNAME = 'StarkParking MVP'
export const RPC_URL = 'https://api.cartridge.gg/x/starknet/mainnet'
export const REDIRECT_URI = 'https://t.me/starkparking_bot/start'

export const PARKING_CONTRACT_ADDRESS =
  '0x040a232b7ff87b58f3817f004b37a0e05164f81631bda2fd90c189cea53ad794'
export const ETH_ADDRESS =
  '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
export const STRK_ADDRESS =
  '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d'

export const ALLOWED_METHODS = [
  // {
  //   contract: ETH_ADDRESS,
  //   selector: 'approve'
  // },
  // {
  //   contract: STRK_ADDRESS,
  //   selector: 'approve'
  // },
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
]

export interface Token {
  name: string
  symbol: string
  decimals: number
  address: `0x${string}`
  icon: React.FunctionComponent
}

export const SUPPORTED_TOKENS: Token[] = [
  {
    name: 'Starknet Token',
    symbol: 'STRK',
    decimals: 18,
    address: STRK_ADDRESS,
    icon: STRKSvg
  },
  {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    address: ETH_ADDRESS,
    icon: EthSvg
  }
]
