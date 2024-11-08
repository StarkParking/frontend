import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from 'react'
import {
  cloudStorage,
  useLaunchParams,
  miniApp,
  openLink
} from '@telegram-apps/sdk-react'
import * as Dojo from '@dojoengine/torii-wasm'
import encodeUrl from 'encodeurl'
import { CartridgeSessionAccount } from '../lib/account-wasm/account_wasm'
import { REDIRECT_URI, RPC_URL, POLICIES } from '@/constants'

const KEYCHAIN_URL = 'https://x.cartridge.gg'

interface AccountStorage {
  username: string
  address: string
  ownerGuid: string
  transactionHash?: string
  expiresAt: string
}

interface SessionSigner {
  privateKey: string
  publicKey: string
}

interface AccountContextType {
  accountStorage: AccountStorage | undefined
  sessionSigner: SessionSigner | undefined
  account: CartridgeSessionAccount | undefined
  openConnectionPage: () => void
  clearSession: () => void
  address: string | undefined
  username: string | undefined
}
const AccountContext = createContext<AccountContextType | undefined>(undefined)

// AccountProvider component that manages account state and session handling
export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // Get Telegram Mini App launch parameters and utilities
  const { initData } = useLaunchParams()
  const storage = cloudStorage

  // State for storing account and session information
  const [accountStorage, setAccountStorage] = useState<AccountStorage>()
  const [sessionSigner, setSessionSigner] = useState<SessionSigner>()

  // Effect to initialize session signer and load stored account data
  useEffect(() => {
    // Try to load existing session signer from storage
    storage.getItem('sessionSigner').then(signer => {
      if (signer) {
        return setSessionSigner(JSON.parse(signer) as SessionSigner)
      }

      // If no signer exists, create new key pair
      const privateKey = Dojo.signingKeyNew()
      const publicKey = Dojo.verifyingKeyNew(privateKey)

      const newSigner = { privateKey, publicKey }
      storage.setItem('sessionSigner', JSON.stringify(newSigner))
      setSessionSigner(newSigner)
    })

    // Load stored account data if it exists
    storage.getItem('account').then(account => {
      if (account) {
        const parsedAccount = JSON.parse(account) as AccountStorage
        // Validate required account fields
        if (
          !parsedAccount.address ||
          !parsedAccount.ownerGuid ||
          !parsedAccount.expiresAt
        ) {
          return storage.deleteItem('account')
        }
        setAccountStorage(parsedAccount)
      }
    })
  }, [storage])

  // Effect to handle account data from Mini App launch parameters
  useEffect(() => {
    if (!initData?.startParam) return

    // Parse and store account data from launch parameters
    const cartridgeAccount = JSON.parse(
      atob(initData.startParam)
    ) as AccountStorage
    storage.setItem('account', JSON.stringify(cartridgeAccount))
    setAccountStorage(cartridgeAccount)
  }, [initData, storage])

  // Create CartridgeSessionAccount instance when account and signer are available
  const account = useMemo(() => {
    if (!accountStorage || !sessionSigner) return

    return CartridgeSessionAccount.new_as_registered(
      RPC_URL,
      sessionSigner.privateKey,
      accountStorage.address,
      accountStorage.ownerGuid,
      Dojo.cairoShortStringToFelt('SN_TESTNET'),
      {
        expiresAt: Number(accountStorage.expiresAt),
        policies: POLICIES
      }
    )
  }, [accountStorage, sessionSigner])

  // Function to open connection page for account setup
  const openConnectionPage = () => {
    // Create new signer if none exists
    if (!sessionSigner) {
      const privateKey = Dojo.signingKeyNew()
      const publicKey = Dojo.verifyingKeyNew(privateKey)

      const newSigner = { privateKey, publicKey }
      storage.setItem('sessionSigner', JSON.stringify(newSigner))
      setSessionSigner(newSigner)
      return
    }

    // Open keychain URL with session parameters
    openLink(
      encodeUrl(
        `${KEYCHAIN_URL}/session?public_key=${
          sessionSigner.publicKey
        }&redirect_uri=${REDIRECT_URI}&redirect_query_name=startapp&policies=${JSON.stringify(
          POLICIES
        )}&rpc_url=${RPC_URL}`
      )
    )
    miniApp.close()
  }

  // Function to clear current session data
  const clearSession = () => {
    storage.deleteItem('sessionSigner')
    storage.deleteItem('account')
    setSessionSigner(undefined)
    setAccountStorage(undefined)
  }

  // Context value containing account state and functions
  const value = {
    accountStorage,
    sessionSigner,
    account,
    openConnectionPage,
    clearSession,
    address: accountStorage?.address,
    username: accountStorage?.username
  }

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  )
}

export const useAccount = () => {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider')
  }
  return context
}
