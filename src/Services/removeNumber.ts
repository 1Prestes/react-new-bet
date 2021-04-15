
export function removeNumber (arr: number[], currentNumber: number): number[] {
  return (arr = arr.filter(function (number) {
    return number !== currentNumber
  }))
}
