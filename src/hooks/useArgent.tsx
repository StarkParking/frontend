import { initWallet } from '@/lib/contracts'
import { ArgentTMA, SessionAccountInterface } from '@argent/tma-wallet'
import { createContext, useContext, useEffect, useState } from 'react'

interface AccountContextType {
  account: SessionAccountInterface | undefined
  argentTMA: ArgentTMA
  isConnected: boolean
  connect: () => Promise<void>
  clearSession: () => Promise<void>
  address: string | undefined
}

const AccountContext = createContext<AccountContextType | undefined>(undefined)

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [account, setAccount] = useState<SessionAccountInterface | undefined>()
  const [isConnected, setIsConnected] = useState<boolean>(false)

  const argentTMA = initWallet()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await argentTMA.connect()

        if (!res) {
          setIsConnected(false)
          return
        }

        setAccount(res?.account)

        if (account?.getSessionStatus() !== 'VALID') {
          setIsConnected(false)
          return
        }

        setIsConnected(true)
      } catch (error) {
        console.error('Failed to connect')
      }
    })()
  })

  const connect = async () => {
    try {
      await argentTMA.requestConnection('starkparking_connection')
    } catch (error) {
      console.error('Connection failed:', error)
    }
  }

  const clearSession = async () => {
    await argentTMA.clearSession()
    setAccount(undefined)
    setIsConnected(false)
  }

  const value = {
    account,
    argentTMA,
    isConnected,
    connect,
    clearSession,
    address: account?.address
  }

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  )
}

export const useArgent = () => {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider')
  }
  return context
}
