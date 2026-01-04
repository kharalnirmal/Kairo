import { useState, useEffect } from 'react'
import useAudio from '../hooks/useAudio'

const SoundToggle = () => {
  const sounds = ['BROWN NOISE', 'LOFI', 'White Noise'] as const
  type SoundKey = typeof sounds[number]
  const [currentSound, setCurrentSound] = useState<SoundKey>('BROWN NOISE')
  const [isPlaying, setIsPlaying] = useState(false)
  
  const soundUrls: Record<SoundKey, string> = {
    'BROWN NOISE': '/music/brown.mp3',
    'LOFI': '/music/lofi.mp3',
    'White Noise': '/music/beats.mp3'
  }
  
  const { play, pause } = useAudio(soundUrls[currentSound])
  
  const handleToggle = () => {
    const currentIndex = sounds.indexOf(currentSound)
    const nextIndex = (currentIndex + 1) % sounds.length
    setCurrentSound(sounds[nextIndex])
  }
  
  const handlePlayPause = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
    setIsPlaying(!isPlaying)
  }
  
  // Auto-play when sound changes
  useEffect(() => {
    if (isPlaying) {
      pause()
      setTimeout(() => play(), 100)
    }
  }, [currentSound])
  
  return (
    <div className="flex gap-2">
      <button 
        onClick={handleToggle}
        className="bg-accent/80 hover:bg-accent px-6 py-7 rounded-full w-48 font-semibold text-white transition-all"
      >
        {currentSound}
      </button>
      
      <button 
        onClick={handlePlayPause}
        className="bg-white/20 hover:bg-white/30 px-6 py-7 rounded-full text-white transition-all"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
    </div>
  )
}

export default SoundToggle