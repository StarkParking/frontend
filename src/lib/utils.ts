import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addZeroAfter0x(input: string) {
  if (input.startsWith('0x') && input.length === 66) {
    return input
  }
  return input.replace(/^0x/, '0x0')
}
