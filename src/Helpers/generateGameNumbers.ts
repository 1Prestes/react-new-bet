import { numberExists } from './numberExists'

function getRandomNumbers (max: number): number {
  return Math.ceil(Math.random() * max)
}

export function generateGameNumbers (
  amount: number,
  range: number,
  arr: number[]
): number[] {
  for (let i = 1; i <= amount; i++) {
    const number = getRandomNumbers(range)
    if (numberExists(arr, number)) {
      i--
    } else {
      arr.push(number)
    }
  }
  return arr
}
