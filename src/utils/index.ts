type Coordinate = {
  x: number
  y: number
}

/**
 *エサの座標を決定する関数
 * @param fieldSize {number}フィールドのサイズ
 * @param excludes {Array<Coordinate>}エサを配置しない場所
 * @returns {Coordinate} エサの座標
 */
export const getFoodPosition = (
  fieldSize: number,
  excludes: Array<Coordinate>
): Coordinate => {
  for (;;) {
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

/**
 * 初期のフィールドを宣言する関数
 * @param fieledSize {number} フィールドサイズ
 * @param snake {Coordinate} スネークの座標
 */
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
