type Coordinate = {
  x: number
  y: number
}
// [{x:17,y:17}]
// type snakeObject = object[]

const getFoodPosition = (
  fieldSize: number,
  excludes: Array<Coordinate>
): Coordinate => {
  for (;;) {
    console.log(typeof excludes, excludes)
    const x = Math.floor(Math.random() * (fieldSize - 2)) + 1
    const y = Math.floor(Math.random() * (fieldSize - 2)) + 1
    const conflict = excludes.some(
      (item: Coordinate) => item.x === x && item.y === y
    )
    if (!conflict) {
      return { x, y }
    }
  }
}

export const initFields = (fieledSize: number, snake: Coordinate) => {
  const fileds = []
  for (let i = 0; i < fieledSize; i++) {
    const cols = new Array(fieledSize).fill('')
    fileds.push(cols)
  }
  fileds[snake.y][snake.x] = 'snake'

  const food = getFoodPosition(fieledSize, [snake])
  fileds[food.x][food.y] = 'food'

  return fileds
}
