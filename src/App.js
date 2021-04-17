import React, { useEffect, useState } from 'react'
import ManipulationPanel from './components/Button'
import Field from './components/Field'
import Button from './components/ManipulationPanel'
import Navigation from './components/Navigation'
import { initFields } from './utils'

const initalPosition = { x: 17, y: 17 }
const initalValues = initFields(35, initalPosition)
const defaultInterval = 100

let timer = undefined
const unsubscribe = () => {
  if (!timer) {
    return
  }
  clearInterval(timer)
}

function App() {
  const [fields, setFields] = useState(initalValues)
  const [position, setPotision] = useState()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    setPotision(initalPosition)
    // ゲームの中の時間を管理する
    timer = setInterval(() => {
      setTick((tick) => tick + 1)
    }, defaultInterval)
    return unsubscribe //return コンポーネントが削除される時に実行する関数
  }, [])

  useEffect(() => {
    if (!position) {
      return
    }
    goUP()
  }, [tick])

  // スネークの進行
  const goUP = () => {
    const { x, y } = position
    const nextY = Math.max(y - 1, 0)
    fields[y][x] = ''
    fields[nextY][x] = 'snake'
    setPotision({ x, y: nextY })
    setFields(fields)
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
      <div style={{ padding: '16px' }}>
        <button onClick={goUP}>進む</button>
      </div>
      <footer className="footer">
        <Button />
        <ManipulationPanel />
      </footer>
    </div>
  )
}

export default App
