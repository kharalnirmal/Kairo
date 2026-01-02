import React from 'react'

interface TimerDisplayProps{
    seconds:number;
}

 function formatTime(totalSeconds:number):string{

 }

const TimerDisplay = ({ seconds}:TimerDisplayProps) => {
  return (
    <div>TimerDisplay</div>
  )
}

export default TimerDisplay