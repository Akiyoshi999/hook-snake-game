import React from 'react'

// ゲームの状態
const GameStatus = Object.freeze({
  init: 'init',
  playing: 'playing',
  suspend: 'suspend',
  gameover: 'gameover',
})

const Button = ({ status, onStart, onSuspend, onRestart }) => {
  return (
    <div className="button">
      {status === GameStatus.gameover && (
        <button onClick={onRestart}>gameover</button>
      )}
      {status === GameStatus.init && <button onClick={onStart}>start</button>}
      {status === GameStatus.suspend && (
        <button onClick={onStart}>start</button>
      )}
      {status === GameStatus.playing && (
        <button onClick={onSuspend}>stop</button>
      )}
    </div>
  )
}

export default Button
