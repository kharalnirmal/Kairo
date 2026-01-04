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
  const [totalSessions, setTotalSessions] = useState(1)
  const [sessionCount, setSessionCount] = useState(0)


 useEffect(() => {
  let interval:number
  
  if (isPlaying && second > 0) {
    interval = setInterval(() => {
      setSecond(s => s - 1)
    }, 1000)
  }

    
    // Play warning sound 10 seconds before timer ends
    if (second === 5 && isPlaying) {
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
      const newSessionCount = sessionCount + 1
      setSessionCount(newSessionCount)
      
      // Check if all sessions are complete
      if (newSessionCount >= totalSessions) {
        setTimerMode('complete')
        setSecond(0)
        // Play completion alarm
        const alarm = new Audio('/music/ending.m4a')
        alarm.play().catch(() => {})
      } else {
        setTimerMode('break')
        setSecond(breakTime)
        setisPlaying(true)
      }
    } else if (timerMode === 'break') {
      setTimerMode('focus')
      setSecond(focusTime)
      setisPlaying(true)
    }
  }


 const handleSaveSettings = (newFocusTime: number, newBreakTime: number, newSessions: number) => {
  setFocusTime(newFocusTime)
  setBreakTime(newBreakTime)
  setSecond(newFocusTime)
  setTotalSessions(newSessions)
  
  // Reset session count
  setSessionCount(0)
  setTimerMode('ready')
}
  const handleRepeat = () => {
    setisPlaying(false)
    setTimerMode('ready')
    setSecond(focusTime)
    setSessionCount(0)
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

        {/* Session Counter - Top */}
        <div className="flex justify-center mb-4">
          <div className="bg-white/10 shadow-lg backdrop-blur-md px-6 py-3 border border-white/20 rounded-full">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white/70 text-sm">Sessions:</span>
              <span className="font-bold text-accent text-xl">{sessionCount}</span>
              <span className="text-white/50 text-sm">/</span>
              <span className="font-semibold text-white text-lg">{totalSessions}</span>
            </div>
          </div>
        </div>

        {/* Center zone with glass effect */}
        <div className="flex flex-col flex-1 justify-center items-center gap-6 bg-white/5 shadow-2xl backdrop-blur-sm p-8 border border-white/10 rounded-3xl">
          <TimerHeader state={timerMode as "focus" | "break" | "ready" | "complete"} fontSize="large" />
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
          <Penguin state={timerMode as "focus" | "break" | "ready" | "complete"} size='large' />
        </div>
      </div>
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
        currentFocusTime={focusTime}
        currentBreakTime={breakTime}
        currentSessions={totalSessions}
      />
    </div>
  )
}



export default TimerScreen

