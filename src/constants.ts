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
