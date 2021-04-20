export function numberExists (arr: number [], number: number): boolean {
  return arr.some(function (currentValue) {
    return currentValue === number
  })
}
