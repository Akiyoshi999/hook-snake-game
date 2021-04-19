import React from 'react'
import Button from './components/Button'
import Field from './components/Field'
import ManipulationPanel from './components/ManipulationPanel'
import Navigation from './components/Navigation'
import useSnakeGame from './hooks/useSnakeGamke'

function App() {
  const {
    body,
    difficulty,
    fields,
    status,
    start,
    stop,
    reload,
    updateDirection,
    updateDifficulty,
  } = useSnakeGame()
  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation
          length={body.length}
          difficulty={difficulty}
          onChangeDifficulty={updateDifficulty}
        />
      </header>
      <main className="main">
        <Field fields={fields} />
      </main>
      <footer className="footer">
        <Button
          status={status}
          onStart={start}
          onSuspend={stop}
          onRestart={reload}
        />
        <ManipulationPanel onChange={updateDirection} />
      </footer>
    </div>
  )
}

export default App
