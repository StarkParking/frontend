import EthSvg from '@/assets/eth.svg?react'
import STRKSvg from '@/assets/strk.svg?react'

export const RPC_URL = 'https://api.cartridge.gg/x/starknet/sepolia'
export const REDIRECT_URI = 'https://t.me/starkparking_bot/start'
export const POLICIES = [
  {
    target:
      '0x00d391abca7c9853d84f6c717e6a94b77d11836fb77a8edecfdbf60af59dc105',
    method: 'register_parking_lot',
    description: 'Register a parking spot'
  },
  {
    target:
      '0x00d391abca7c9853d84f6c717e6a94b77d11836fb77a8edecfdbf60af59dc105',
    method: 'book_parking',
    description: 'Create a booking for a parking spot'
  },
  {
    target:
      '0x00d391abca7c9853d84f6c717e6a94b77d11836fb77a8edecfdbf60af59dc105',
    method: 'end_parking',
    description: 'End a parking session'
  },
  {
    target:
      '0x00d391abca7c9853d84f6c717e6a94b77d11836fb77a8edecfdbf60af59dc105',
    method: 'extend_parking',
    description: 'Extend a parking session'
  }
]

export const PARKING_CONTRACT_ADDRESS =
  '0x0614d7b4cc2e63a4f325ae42be06cbcc0f709a3fc3396c316ea824cd6b169e36'
export const ETH_ADDRESS =
  '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
export const STRK_ADDRESS =
  '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d'

export interface Token {
  name: string
  symbol: string
  decimals: number
  address: `0x${string}`
  icon: React.FunctionComponent
}

export const SUPPORTED_TOKENS: Token[] = [
  {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    address: ETH_ADDRESS,
    icon: EthSvg
  },
  {
    name: 'Starknet Token',
    symbol: 'STRK',
    decimals: 18,
    address: STRK_ADDRESS,
    icon: STRKSvg
  }
]
