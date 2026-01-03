import React, { useState } from 'react'
type SoundToggleProps = "brown"|"lofi|"|"beat"

const SoundToggle = () => {
  const [currentSound, setCurrentSound] = useState("Brown Noise")
   const sounds = ["Brown Noise", "Lofi Beats", "White Noise"]
   const handleToggleSound = ()=>{
    const currentIndex = sounds.indexOf(currentSound)
    const nextIndex = (currentIndex + 1 )% sounds.length
    setCurrentSound(sounds[nextIndex])
   }
      const buttonClass = "w-50 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-12 py-7 rounded-[60px] font-semibold text-white hover:scale-105 active:scale-95"
  return (
  <button  onClick={handleToggleSound} className= {buttonClass} >{currentSound}</button>
  )
}

export default SoundToggle