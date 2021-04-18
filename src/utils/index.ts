type Coordinate = {
  x: number
  y: number
}

export const initFields = (fieledSize: number, initialPosition: Coordinate) => {
  const fileds = []
  for (let i = 0; i < fieledSize; i++) {
    const cols = new Array(fieledSize).fill('')
    fileds.push(cols)
  }
  fileds[initialPosition.y][initialPosition.x] = 'snake'

  return fileds
}
