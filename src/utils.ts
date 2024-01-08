export function padNum(num: number, maxDigit: number) {
  return num.toString().padStart(maxDigit, '0')
}
