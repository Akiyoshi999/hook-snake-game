import React from 'react'
import ManipulationPanel from './components/Button'
import Field from './components/Field'
import Button from './components/ManipulationPanel'
import Navigation from './components/Navigation'
import { initFields } from './utils'

const fields = initFields(35)
fields[17][17] = 'food'

function App() {
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
        <Button />
        <ManipulationPanel />
      </footer>
    </div>
  )
}

export default App
