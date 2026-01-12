import { useState, useEffect } from "react";
import useAudio from "../hooks/useAudio";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";

/**
 * SoundToggle component
 * Handles background sound selection and play/pause control
 */
interface SoundToggleProps {
  isTimerPlaying?: boolean;
}

const SoundToggle = ({ isTimerPlaying = false }: SoundToggleProps) => {
  /**
   * List of available sound labels
   * `as const` ensures strict literal typing
   */
  const sounds = ["BROWN NOISE", "LOFI", "White Noise"] as const;

  /**
   * Type derived from sound labels
   * Prevents invalid sound keys
   */
  type SoundKey = (typeof sounds)[number];

  // Currently selected sound
  const [currentSound, setCurrentSound] = useState<SoundKey>("BROWN NOISE");

  // Tracks whether audio is currently playing
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Mapping of sound labels to audio file paths
   * Ensures type-safe access using SoundKey
   */
  const soundUrls: Record<SoundKey, string> = {
    "BROWN NOISE": "/music/brown.mp3",
    LOFI: "/music/lofi.mp3",
    "White Noise": "/music/beats.mp3",
  };

  /**
   * Custom audio hook
   * Returns play and pause controls for the selected sound
   */
  const { play, pause } = useAudio(soundUrls[currentSound]);

  /**
   * Cycles through available sounds
   * Moves to next sound and loops back to start
   */
  const handleToggle = () => {
    const currentIndex = sounds.indexOf(currentSound);
    const nextIndex = (currentIndex + 1) % sounds.length;
    setCurrentSound(sounds[nextIndex]);
  };

  /**
   * Toggles audio playback
   * Plays if paused, pauses if playing
   */
  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  /**
   * Auto-restart audio when sound changes
   * Ensures smooth switching while playing
   */
  useEffect(() => {
    if (isPlaying) {
      pause();
      setTimeout(() => play(), 100);
    }
  }, [currentSound]);

  /**
   * Sync background music with timer state
   * Pause music when timer pauses, resume when timer plays
   */
  useEffect(() => {
    if (isTimerPlaying && isPlaying) {
      play();
    } else if (!isTimerPlaying && isPlaying) {
      pause();
    }
  }, [isTimerPlaying]);

  return (
    <div className="flex gap-2 lg:gap-1">
      {/* Sound selector button */}
      <button
        onClick={handleToggle}
        className="bg-accent/80 hover:bg-accent px-6 py-7 rounded-full w-48 font-semibold text-white transition-all"
      >
        {currentSound}
      </button>

      {/* Play / Pause toggle */}
      <button
        onClick={handlePlayPause}
        className="bg-white/20 hover:bg-white/30 px-6 py-7 rounded-full text-white transition-all"
      >
        {isPlaying ? (
          <GiSoundOn className="w-6 h-6" />
        ) : (
          <GiSoundOff className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default SoundToggle;
