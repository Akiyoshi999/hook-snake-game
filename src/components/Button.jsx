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
        <button className="btn btn-gameover" onClick={onRestart}>
          gameover
        </button>
      )}
      {status === GameStatus.init && (
        <button className="btn btn-init" onClick={onStart}>
          start
        </button>
      )}
      {status === GameStatus.suspend && (
        <button className="btn btn-suspended" onClick={onStart}>
          start
        </button>
      )}
      {status === GameStatus.playing && (
        <button className="btn btn-playing" onClick={onSuspend}>
          stop
        </button>
      )}
    </div>
  )
}

export default Button
