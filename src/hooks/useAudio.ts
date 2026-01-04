import { useEffect, useRef } from 'react'

const useAudio = (url: string, volume: number = 0.5) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  useEffect(() => {
    audioRef.current = new Audio(url)
    audioRef.current.loop = true
    audioRef.current.volume = volume
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [url])
  
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }
  
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }
  
  return { play, pause }
}

export default useAudio