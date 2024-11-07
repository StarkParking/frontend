import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addZeroAfter0x(input: string): `0x${string}` {
  if (input.startsWith('0x') && input.length === 66) {
    return input as `0x${string}`
  }
  return input.replace(/^0x/, '0x0') as `0x${string}`
}
