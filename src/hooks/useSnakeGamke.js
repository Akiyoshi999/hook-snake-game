import { useCallback, useEffect, useState } from 'react'
import {
  defaultDifficulty,
  defaultInterval,
  Delta,
  Difficulty,
  Direction,
  DirectionKeyCodeMap,
  GameStatus,
  initialPosition,
  initialValues,
  OppositeDirection,
} from '../constants'
import {
  getFoodPosition,
  initFields,
  isCollision,
  isEatingMyself,
} from '../utils'

let timer = null
const unsubscribe = () => {
  if (!timer) {
    return
  }
  clearInterval(timer)
}

const useSnakeGame = () => {
  const [fields, setFields] = useState(initialValues)
  const [body, setBody] = useState([])
  const [status, setStatus] = useState(GameStatus.init)
  const [tick, setTick] = useState(0)
  const [difficulty, setDifficulty] = useState(defaultDifficulty)
  const [directrion, setDirection] = useState(Direction.up)

  /**
   * 関数の宣言
   */
  const start = () => setStatus(GameStatus.playing)
  const stop = () => setStatus(GameStatus.suspend)

  const reload = () => {
    timer = setInterval(() => {
      setTick((tick) => tick + 1)
    }, defaultInterval)
    setStatus(GameStatus.init)
    setBody([initialPosition])
    setDirection(Direction.up)
    setFields(initFields(fields.length, initialPosition))
  }

  // 進行方向変更
  const updateDirection = useCallback(
    (newDirection) => {
      if (status !== GameStatus.playing) {
        return
      }
      if (OppositeDirection[directrion] === newDirection) {
        return
      }
      setDirection(newDirection)
    },
    [directrion, status]
  )

  const updateDifficulty = useCallback(
    (difficulty) => {
      if (status !== GameStatus.init) {
        return
      }
      if (difficulty < 1 || difficulty > Difficulty.length) {
        return
      }
      setDifficulty(difficulty)
    },
    [status, difficulty]
  )

  // スネークの進行
  const handleMoving = () => {
    const { x, y } = body[0]
    const newPosition = {
      x: x + Delta[directrion].x,
      y: y + Delta[directrion].y,
    }
    if (
      isCollision(fields.length, newPosition) ||
      isEatingMyself(fields, newPosition)
    ) {
      unsubscribe()
      return false
    }
    const newBody = [...body]
    // 次のポジションがfoodでない場合、bodyの末尾を空文字でリセット
    if (fields[newPosition.y][newPosition.x] !== 'food') {
      const removingTrack = newBody.pop()
      fields[removingTrack.y][removingTrack.x] = ''
    } else {
      const food = getFoodPosition(fields.length, [...newBody, newPosition])
      fields[food.y][food.x] = 'food'
    }
    fields[newPosition.y][newPosition.x] = 'snake'
    newBody.unshift(newPosition)

    setBody(newBody)
    setFields(fields)
    return true
  }

  /**
   * useEffect
   */
  useEffect(() => {
    setBody([initialPosition])

    // ゲームの中の時間を管理する
    const interval = Difficulty[difficulty - 1]
    timer = setInterval(() => {
      setTick((tick) => tick + 1)
    }, interval)
    return unsubscribe //return コンポーネントが削除される時に実行する関数
  }, [difficulty])

  /**
   * 時間を監視し、進行可能であればスネークを動かす
   */
  useEffect(() => {
    if (!body.length === 0 || status !== GameStatus.playing) {
      return
    }
    const canContinue = handleMoving()
    if (!canContinue) {
      unsubscribe()
      setStatus(GameStatus.gameover)
    }
  }, [tick])

  /**
   * 1. レンダリング後、コールバックを実行する
   * 2. status,directionが変更される
   * 3. クリーン関数が呼ばれ、イベント解除
   * 4. ２回目のイベント登録
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      const newDirection = DirectionKeyCodeMap[e.keyCode]
      if (!newDirection) {
        return
      }
      updateDirection(newDirection)
    }
    document.addEventListener('keydown', handleKeyDown)
    // リソースの無駄遣い防止のため、イベント登録解除
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [updateDirection])

  return {
    body,
    difficulty,
    fields,
    status,
    start,
    stop,
    reload,
    updateDirection,
    updateDifficulty,
  }
}

export default useSnakeGame
