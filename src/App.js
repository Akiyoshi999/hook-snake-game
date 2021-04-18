import React, { useEffect, useState } from 'react'
import Button from './components/Button'
import Field from './components/Field'
import ManipulationPanel from './components/ManipulationPanel'
import Navigation from './components/Navigation'
import { initFields } from './utils'

const initialPosition = { x: 17, y: 17 }
const initialValues = initFields(35, initialPosition)
const defaultInterval = 100

const GameStatus = Object.freeze({
  init: 'init',
  playing: 'playing',
  suspend: 'suspend',
  gameover: 'gameover',
})

let timer = undefined
const unsubscribe = () => {
  if (!timer) {
    return
  }
  clearInterval(timer)
}

function App() {
  const [fields, setFields] = useState(initialValues)
  const [position, setPotision] = useState()
  const [status, setStatus] = useState(GameStatus.init)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    setPotision(initialPosition)
    // ゲームの中の時間を管理する
    timer = setInterval(() => {
      setTick((tick) => tick + 1)
    }, defaultInterval)
    return unsubscribe //return コンポーネントが削除される時に実行する関数
  }, [])

  useEffect(() => {
    if (!position || status !== GameStatus.playing) {
      return
    }
    const canContinue = goUP()
    if (!canContinue) {
      unsubscribe()
      setStatus(GameStatus.gameover)
    }
  }, [tick])

  const onStart = () => setStatus(GameStatus.playing)
  const onRestart = () => {
    timer = setInterval(() => {
      setTick((tick) => tick + 1)
    }, defaultInterval)
    // setDirection(Direction.up)
    setStatus(GameStatus.init)
    setPotision(initialPosition)
    setFields(initFields(35, initialPosition))
  }

  // スネークの進行
  const goUP = () => {
    const { x, y } = position
    const newPosition = { x, y: y - 1 }
    if (isCollision(fields.length, newPosition)) {
      unsubscribe()
      return false
    }
    fields[y][x] = ''
    fields[newPosition.y][x] = 'snake'
    setPotision(newPosition)
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

  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation />
      </header>
      <main className="main">
        <Field fields={fields} />
      </main>
      <footer className="footer">
        <Button status={status} onStart={onStart} onRestart={onRestart} />
        <ManipulationPanel />
      </footer>
    </div>
  )
}

export default App
