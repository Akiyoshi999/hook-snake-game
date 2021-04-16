export const initFields = (fieledSize: number) => {
  const fileds = []
  for (let i = 0; i < fieledSize; i++) {
    const cols = new Array(fieledSize).fill('')
    fileds.push(cols)
  }

  return fileds
}
