import React from 'react'
import Button from './Button'
interface ButtonControlProps{
    onPlay?:()=>void;
    onPause?:()=>void;
    onRepeat?:()=>void;
    onSetting?:()=>void;
}

const ButttonControl = ({onPlay,onPause,onRepeat,onSetting}:ButtonControlProps) => {

  return (
    <div className='flex justify-center items-center gap-2'>
        <Button onClick={onPlay} className="btn-round">▶️</Button>
        <Button onClick={onPause} className="btn-round">⏸️</Button>
        <Button onClick={onRepeat} className="btn-round">🔁</Button>
        <Button onClick={onSetting} className="btn-round">⚙️</Button>
    </div>
  )
}

export default ButttonControl