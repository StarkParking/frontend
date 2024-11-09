import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { customAlphabet } from 'nanoid'
import { useContract, useReadContract } from '@starknet-react/core'
import { Account, cairo, Contract, shortString } from 'starknet'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { MdOutlineGeneratingTokens } from 'react-icons/md'
import { Abi, formatUnits } from 'viem'
import { Loader2 } from 'lucide-react'
import ERC20_ABI from '@/abi/erc20'

import { ChevronLeft, Clock, Calendar, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import PARKING_ABI from '@/abi/parking'
import {
  ETH_ADDRESS,
  PARKING_CONTRACT_ADDRESS,
  STRK_ADDRESS,
  SUPPORTED_TOKENS,
  Token
} from '@/constants'
import Dots from '@/components/Dots'
// import { useAccount } from '@/hooks/useAccount'
import { useArgent } from '@/hooks/useArgent'
import { executeContractAction } from '@/lib/contracts'

interface Duration {
  text: string
  value: number
}

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  16
)

const generateTimeSlots = (): Duration[] => {
  const timeSlots: Duration[] = [
    {
      text: '1 hour',
      value: 1
    },
    {
      text: '2 hours',
      value: 2
    },
    {
      text: '3 hours',
      value: 3
    },
    {
      text: '4 hours',
      value: 4
    },
    {
      text: '5 hours',
      value: 5
    }
  ]
  return timeSlots
}

const Booking = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const timeSlots = generateTimeSlots()

  const [token, setToken] = useState<Token | undefined>(undefined)
  const [allowance, setAllowance] = useState(BigInt(0))
  const [needApprove, setNeedApprove] = useState(false)

  const [quote, setQuote] = useState(BigInt(0))
  const [duration, setDuration] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isBooking, setIsBooking] = useState(false)

  const { account, argentTMA } = useArgent()

  const tokenContract = new Contract(
    ERC20_ABI,
    token?.address ?? STRK_ADDRESS,
    account as unknown as Account
  )

  const parkingContract = new Contract(
    PARKING_ABI,
    PARKING_CONTRACT_ADDRESS,
    account as unknown as Account
  )

  useEffect(() => {
    ;(async () => {
      if (id && token && duration && account) {
        try {
          setIsLoading(true)
          const _quote = await parkingContract.get_oracle_token_quote(
            cairo.uint256(id),
            token.address,
            duration
          )
          setQuote(_quote)

          const allowance = await tokenContract.allowance(
            account.address,
            PARKING_CONTRACT_ADDRESS
          )

          setNeedApprove(allowance < _quote)
        } catch (error) {
          console.error('Could not load quote price')
        } finally {
          setIsLoading(false)
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, id, token])

  const bookingId = useMemo(() => nanoid(), [])

  const onTokenChange = (e: string) => {
    const _token = SUPPORTED_TOKENS.find(t => t.address === e)
    setToken(_token)
  }

  const handleApprove = async () => {
    setIsApproving(true)

    try {
      if (!account) return

      if (quote === BigInt(0)) {
        toast.error('Can not approve 0')
      }

      const result = await executeContractAction(
        tokenContract,
        account,
        argentTMA,
        'approve',
        [
          PARKING_CONTRACT_ADDRESS,
          cairo.uint256(quote + (quote * BigInt(1)) / BigInt(100))
        ],
        'Approval Successful!',
        'Approval Failed!'
      )

      setNeedApprove(!result)
    } catch (error) {
      toast.error('Please try again')
      console.log(error)
    } finally {
      setIsApproving(false)
    }
  }

  const handleBooking = async () => {
    if (!id) return

    if (!duration) {
      toast.error('Please select parking duration')
      return
    }

    if (!token) {
      toast.error('Please select payment token')
      return
    }

    setIsBooking(true)

    try {
      if (!account) return

      const result = await executeContractAction(
        parkingContract,
        account,
        argentTMA,
        'book_parking',
        [
          shortString.encodeShortString(bookingId),
          cairo.uint256(1),
          token.address,
          shortString.encodeShortString('00883'), // TODO: get from server
          1
        ],
        'Booking confirmed!',
        'Booking failed'
      )

      if (result) {
        navigate('/sessions')
      }
    } catch (error) {
      toast.error('Please try again')
      console.log(error)
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button size="icon" className="text-white" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">Booking Details</h1>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-gray-400">Selected Spot</p>
          <p className="text-2xl font-bold">#{id}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium mb-2">How Long?</p>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="w-full border-zinc-700">
                    <SelectValue placeholder="Select parking duration" />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-700">
                    {timeSlots.map(time => (
                      <SelectItem
                        key={`checkin-${time.value}`}
                        value={time.value.toString()}
                      >
                        {time.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-sm text-gray-400">
                Today, {format(new Date(), 'd MMM, y')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Car className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">Vehicle</p>
              <p className="text-sm text-gray-400">Car - ABC 123</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MdOutlineGeneratingTokens className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <p className="font-medium mb-2">Token</p>
              <Select value={token?.address} onValueChange={onTokenChange}>
                <SelectTrigger className="w-full border-zinc-700">
                  <SelectValue placeholder="Select payment token" />
                </SelectTrigger>
                <SelectContent className="border-zinc-700">
                  {SUPPORTED_TOKENS.map(token => (
                    <SelectItem
                      key={`token-${token.address}`}
                      value={token.address}
                    >
                      <div className="flex items-center gap-2">
                        <token.icon />
                        <span>{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">Total Amount</span>
            {isLoading ? (
              <Dots />
            ) : (
              <span className="text-2xl font-bold">
                {token ? (
                  <span>
                    {Number(formatUnits(quote, token.decimals)).toFixed(
                      token.address === ETH_ADDRESS ? 5 : 2
                    )}{' '}
                    {token.symbol}
                  </span>
                ) : (
                  <span>0</span>
                )}
              </span>
            )}
          </div>
          {needApprove ? (
            <Button
              disabled={isApproving}
              className="w-full bg-black hover:bg-gray-800"
              onClick={handleApprove}
            >
              {isApproving ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Approving...</span>
                </>
              ) : (
                <span>Approve</span>
              )}
            </Button>
          ) : (
            <Button
              disabled={isBooking || !duration || !token}
              className="w-full bg-black hover:bg-gray-800"
              onClick={handleBooking}
            >
              {isBooking ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Confirming...</span>
                </>
              ) : (
                <span>Confirm Booking</span>
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Booking
