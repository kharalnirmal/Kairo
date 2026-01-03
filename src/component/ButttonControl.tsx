import React from 'react'
import { Button } from './Button';

interface ButtonControlProps{
    onPlay?:()=>void;
    onPause?:()=>void;
    onRepeat?:()=>void;
    onSetting?:()=>void;
}

export function ButttonControl  ({onPlay,onPause,onRepeat,onSetting}:ButtonControlProps)  {

  return (
    <div className='flex justify-center items-center gap-2 md:gap-3'>
        <Button onClick={onPlay} className="btn-round">▶️</Button>
        <Button onClick={onPause} className="btn-round">⏸️</Button>
        <Button onClick={onRepeat} className="btn-round">🔁</Button>
        <Button onClick={onSetting} className="btn-round">⚙️</Button>
    </div>
  )
}

