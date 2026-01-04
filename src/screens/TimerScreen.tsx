import React, { use, useEffect, useState } from 'react'

import SoundToggle from '../component/SoundToggle'
import { TimerHeader } from '../component/TimerHeader'
import { TimerDisplay } from '../component/TimerDisplay'
import { ButttonControl } from '../component/ButttonControl'
import { Penguin } from '../component/Penguine'
import SettingsModal from '../component/SettingModal'

const TimerScreen = () => {
  const [isPlaying, setisPlaying] = useState(false)
  const [focusTime, setFocusTime] = useState(1500) // 25 min default
  const [breakTime, setBreakTime] = useState(300)  // 5 min default
  const [showSettings, setShowSettings] = useState(false)
  const [second, setSecond] = useState(focusTime)
  const [timerMode, setTimerMode] = useState('ready')

  // Calculate how many sessions needed based on focus time
const calculateSessions = (focusTimeInSeconds: number): number => {
  const focusMinutes = focusTimeInSeconds / 60
  
  // Every 25 minutes = 1 session
  // Example: 50 min = 2 sessions, 75 min = 3 sessions
  return Math.ceil(focusMinutes / 25)}
    const [totalSessions, setTotalSessions] = useState(calculateSessions(focusTime))
    const [sessionCount, setSessionCount] = useState(0)


 useEffect(() => {
  let interval:number
  
  if (isPlaying && second > 0) {
    interval = setInterval(() => {
      setSecond(s => s - 1)
    }, 1000)
  }

    
    // Play warning sound 10 seconds before timer ends
    if (second === 10 && isPlaying) {
    const audio = new Audio('/music/warning.m4a')
    audio.play().catch(() => {})
    }
  
  // When seconds hits 0, handle completion
  if (second === 0 && isPlaying) {
    setisPlaying(false)
    handleTimerComplete()
  }
  
  return () => clearInterval(interval)
}, [isPlaying, second])

  const handlePlay = () => {
    if (timerMode !== 'focus' && timerMode !== 'break') {
      setTimerMode('focus')
      setSecond(focusTime)
    }
    setisPlaying(true)
  }
  const handlesetting = () => setShowSettings(true)

  const handleTimerComplete = () => {
    if (timerMode === 'focus') {
      setTimerMode('break')
      setSecond(breakTime)
      setisPlaying(true)
    } else if (timerMode === 'break') {
      setTimerMode('focus')
      setSecond(focusTime)
      setisPlaying(true)
    }
  }


 const handleSaveSettings = (newFocusTime: number, newBreakTime: number) => {
  setFocusTime(newFocusTime)
  setBreakTime(newBreakTime)
  setSecond(newFocusTime)
  
  // Recalculate total sessions based on new focus time
  setTotalSessions(calculateSessions(newFocusTime))
  
  // Reset session count
  setSessionCount(0)
  setTimerMode('ready')
}
  const handleRepeat = () => {
    setisPlaying(false)
    setTimerMode('ready')
    setSecond(focusTime)
  }

  const handlePause=() => setisPlaying(false)










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
          <ButttonControl onPlay={handlePlay} onPause={handlePause} onRepeat={handleRepeat} onSetting={handlesetting} />
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
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
        currentFocusTime={focusTime}
        currentBreakTime={breakTime}
      />
    </div>
  )
}



export default TimerScreen

