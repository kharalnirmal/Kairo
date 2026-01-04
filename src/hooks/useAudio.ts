import { useEffect, useRef } from 'react'

/**
 * Custom React hook to handle audio playback
 * - Loads an audio file
 * - Manages play / pause
 * - Cleans up properly when sound changes or component unmounts
 */
const useAudio = (url: string, volume: number = 0.5) => {

  /**
   * useRef is used to persist the same Audio instance
   * across re-renders without causing re-renders itself
   */
  const audioRef = useRef<HTMLAudioElement | null>(null)

  /**
   * EFFECT LOGIC:
   * 1. Runs when the audio URL changes
   * 2. Creates a NEW Audio object for the new sound
   * 3. Configures looping + volume
   * 4. Cleans up the OLD audio to prevent memory leaks
   */
  useEffect(() => {

    // Create new audio instance whenever URL changes
    audioRef.current = new Audio(url)

    // Enable looping for background sounds
    audioRef.current.loop = true

    // Set initial volume (0.0 → 1.0)
    audioRef.current.volume = volume

    /**
     * CLEANUP LOGIC:
     * - Stops audio when:
     *   a) sound changes
     *   b) component using this hook unmounts
     * - Prevents overlapping sounds and memory leaks
     */
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()   // Stop playback
        audioRef.current = null    // Release reference
      }
    }
  }, [url, volume]) // Re-run effect only when sound source or volume changes

  /**
   * Plays the current audio
   * Safe-guarded to avoid calling play on null
   */
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  /**
   * Pauses the current audio
   * Does not reset playback position
   */
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  /**
   * Expose only what the component needs
   * Keeps implementation details hidden
   */
  return { play, pause }
}

export default useAudio
