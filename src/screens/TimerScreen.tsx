import React, { useEffect, useState } from 'react'

import SoundToggle from '../component/SoundToggle'
import { TimerHeader } from '../component/TimerHeader'
import { TimerDisplay } from '../component/TimerDisplay'
import { ButttonControl } from '../component/ButttonControl'
import { Penguin } from '../component/Penguine'

const TimerScreen = () => {
 const [second, setSecond] = useState(1500)
 const [isPlaying, setisPlaying] = useState(false)


 useEffect(() => {
   let interval:number

   if(isPlaying && second>0){
    interval =setInterval(()=> setSecond(prev=>prev-1),1000)
   }
 
   return () => {
     clearInterval(interval)
   }
 }, [isPlaying,second])
 
const handlePlay=()=>setisPlaying(true)
const handlePause=()=>setisPlaying(false)
const handleRepeat=()=>{
  setisPlaying(false)
  setSecond(1500)}




  return (
    <div className='relative flex md:flex-row flex-col justify-around gap-10 p-4 w-full min-h-screen overflow-hidden'>
      
      {/* Decorative Background Blobs */}
      <div className='top-20 -left-20 absolute bg-accent/30 blur-3xl rounded-full w-96 h-96 animate-pulse' />
      <div className='-right-20 bottom-20 absolute bg-purple-400/20 blur-3xl rounded-full w-80 h-80 animate-pulse' style={{ animationDelay: '1s' }} />
      <div className='top-1/2 left-1/2 absolute bg-blue-500/10 blur-3xl rounded-full w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2' />
      
      {/* Timer Controls Side */}
      <div className="z-10 relative flex flex-col justify-between py-4 w-full md:w-1/2">
        
        {/* Center zone with glass effect */}
        <div className="flex flex-col flex-1 justify-center items-center gap-6 bg-white/5 shadow-2xl backdrop-blur-sm p-8 border border-white/10 rounded-3xl">
          <TimerHeader state="focus" fontSize="large" />
          <TimerDisplay seconds={second} />
        </div>

        {/* Bottom controls */}
        <div className="flex md:flex-row flex-col justify-center items-center gap-4 md:gap-20 mt-8 pb-6">
          <ButttonControl onPlay={handlePlay} onPause={handlePause} onRepeat={handleRepeat} />
          <SoundToggle />
        </div>
        
      </div>
      
      {/* Penguin Side with glow effect */}
      <div className='z-10 relative flex justify-center items-center w-full md:w-1/2'>
        {/* Glow behind penguin */}
        <div className='absolute bg-accent/40 blur-3xl rounded-full w-72 h-72 animate-pulse' />
        {/* Penguin */}
        <div className='relative'>
          <Penguin state='focus' size='large' />
        </div>
      </div>
      
    </div>
  )
}



export default TimerScreen
