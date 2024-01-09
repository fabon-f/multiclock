import { Temporal } from 'temporal-polyfill'

export function padNum(num: number, maxDigit: number) {
  return num.toString().padStart(maxDigit, '0')
}

export function toRoman(num: number) {
  if (num >= 4000) {
    throw new Error(`Number too large: ${num}`)
  }
  const d1000 = Math.floor(num / 1000)
  const d100 = Math.floor((num % 1000) / 100)
  const d10 = Math.floor((num % 100) / 10)
  const d1 = num % 10
  const r1000 = ['', 'M', 'MM', 'MMM']
  const r100 = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
  const r10 = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']
  const r1 = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return r1000[d1000]! + r100[d100]! + r10[d10]! + r1[d1]!
}

export function vernalEquinox(year: number) {
  // https://astronomy.stackexchange.com/questions/43283/accuracy-of-calculating-the-vernal-equinox
  // days from 2000-01-01T00:00:00Z
  const days = 79.313 + 365.2422 * (year - 2000)
  const seconds = Math.floor(days * 24 * 60 * 60)
  return Temporal.Instant.from('2000-01-01T00:00:00Z').add({ seconds })
}

export function autumnalEquinox(year: number) {
  const days = 265.712 + 365.2422 * (year - 2000)
  const seconds = Math.floor(days * 24 * 60 * 60)
  return Temporal.Instant.from('2000-01-01T00:00:00Z').add({ seconds })
}
