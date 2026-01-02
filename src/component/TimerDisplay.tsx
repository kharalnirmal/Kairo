import React from 'react'


interface TimerDisplayProps{
    seconds:number;
}

 function formatTime(totalSeconds:number):string{

const hours = Math.floor(totalSeconds/3600);
const minutes = Math.floor((totalSeconds % 3600)/60);
const seconds = totalSeconds %60;
const pad = (num : number) => num.toString().padStart(2,"0")

return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
 }

const TimerDisplay = ({ seconds}:TimerDisplayProps) => {
  return (
      <div className='font-bold text-white text-7xl tracking-wider'>
        {  formatTime(seconds)}
      </div>
  )
}

export default TimerDisplay