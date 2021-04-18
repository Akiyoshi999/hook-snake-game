import React, { useCallback, useEffect, useState } from 'react'
import Button from './components/Button'
import Field from './components/Field'
import ManipulationPanel from './components/ManipulationPanel'
import Navigation from './components/Navigation'
import { getFoodPosition, initFields } from './utils'

const initialPosition = { x: 17, y: 17 }
const initialValues = initFields(35, initialPosition)
const defaultInterval = 100
const defaultDifficulty = 3
const Difficulty = [1000, 700, 500, 300, 100]

// 定数宣言
// ゲームの状態
const GameStatus = Object.freeze({
  init: 'init',
  playing: 'playing',
  suspend: 'suspend',
  gameover: 'gameover',
})

// スネークの進行方向
const Direction = Object.freeze({
  up: 'up',
  right: 'right',
  left: 'left',
  down: 'down',
})

// スネークの進行方向変更の可否判定
const OppositeDirection = Object.freeze({
  up: 'down',
  right: 'left',
  left: 'right',
  down: 'up',
})

// スネーク
const Delta = Object.freeze({
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
})

// キーバインド
const DirectionKeyCodeMap = Object.freeze({
  37: Direction.left,
  38: Direction.up,
  39: Direction.right,
  40: Direction.down,
})

let timer = undefined
const unsubscribe = () => {
  if (!timer) {
    return
  }
  clearInterval(timer)
}

function App() {
  /**
   * useStateの宣言
   */
  const [fields, setFields] = useState(initialValues)
  const [body, setBody] = useState([])
  const [status, setStatus] = useState(GameStatus.init)
  const [tick, setTick] = useState(0)
  const [difficulty, setDifficulty] = useState(defaultDifficulty)
  const [directrion, setDirection] = useState(Direction.up)

  /**
   * 関数の宣言
   */
  const onStart = () => setStatus(GameStatus.playing)
  const onSuspend = () => setStatus(GameStatus.suspend)

  const onRestart = () => {
    timer = setInterval(() => {
      setTick((tick) => tick + 1)
    }, defaultInterval)
    setStatus(GameStatus.init)
    setBody([initialPosition])
    setDirection(Direction.up)
    setFields(initFields(35, initialPosition))
  }

  // 進行方向変更
  const onChangeDirection = useCallback(
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

  const onChangeDifficulty = useCallback(
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

  // スネークがぶつかっているか判定
  const isCollision = (fieldSize, position) => {
    if (position.y < 0 || position.x < 0) {
      return true
    }
    if (position.y > fieldSize - 1 || position.x > fieldSize - 1) {
      return true
    }
    return false
  }

  const isEatingMyself = (fields, position) => {
    return fields[position.y][position.x] === 'snake'
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
      onChangeDirection(newDirection)
    }
    document.addEventListener('keydown', handleKeyDown)
    // リソースの無駄遣い防止のため、イベント登録解除
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onChangeDirection])

  // 検証用
  // console.log('direction :', directrion)

  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation
          length={body.length}
          difficulty={difficulty}
          onChangeDifficulty={onChangeDifficulty}
        />
      </header>
      <main className="main">
        <Field fields={fields} />
      </main>
      <footer className="footer">
        <Button
          status={status}
          onStart={onStart}
          onSuspend={onSuspend}
          onRestart={onRestart}
        />
        <ManipulationPanel onChange={onChangeDirection} />
      </footer>
    </div>
  )
}

export default App
