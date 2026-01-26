import { useState, useEffect, useRef } from "react";
import useAudio from "../hooks/useAudio";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";

/**
 * SoundToggle component
 * Handles background sound selection and play/pause control
 */
interface SoundToggleProps {
  isTimerPlaying?: boolean;
  timerMode: "focus" | "break" | "ready" | "complete";
}

const SoundToggle = ({
  isTimerPlaying = false,
  timerMode,
}: SoundToggleProps) => {
  /**
   * List of available sound labels
   * `as const` ensures strict literal typing
   */
  const sounds = [
    "BROWN NOISE",
    "LOFI",
    "White Noise",
    "JAZZ",
    "HIPHOP",
  ] as const;

  /**
   * Type derived from sound labels
   * Prevents invalid sound keys
   */
  type SoundKey = (typeof sounds)[number];
  type PlayableSound = SoundKey | "BREAK";

  // Currently selected sound
  const [preferredSound, setPreferredSound] = useState<SoundKey>("BROWN NOISE");

  // Sound actually being played (can temporarily be BREAK)
  const [currentSound, setCurrentSound] =
    useState<PlayableSound>("BROWN NOISE");

  // Tracks whether audio is currently playing
  const [isPlaying, setIsPlaying] = useState(false);

  // Store state before entering break to restore afterwards
  const previousPlayingRef = useRef(false);
  const wasInBreakRef = useRef(false);

  /**
   * Mapping of sound labels to audio file paths
   * Ensures type-safe access using SoundKey
   */
  const soundUrls: Record<PlayableSound, string> = {
    "BROWN NOISE": "/music/brown.mp3",
    LOFI: "/music/lofi.mp3",
    "White Noise": "/music/beats.mp3",
    JAZZ: "/music/jazz.m4a",
    HIPHOP: "/music/break.mp3",
    BREAK: "/music/break.mp3",
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
    const currentIndex = sounds.indexOf(preferredSound);
    const nextIndex = (currentIndex + 1) % sounds.length;
    const nextSound = sounds[nextIndex];

    // Update preferred sound always so we know what to resume after break
    setPreferredSound(nextSound);

    // Only switch active sound when not in break override
    if (timerMode !== "break") {
      setCurrentSound(nextSound);
    }
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
   * Auto-switch to break music and restore previous track afterwards.
   */
  useEffect(() => {
    if (timerMode === "break" && !wasInBreakRef.current) {
      // Entering break: remember prior play state, force break track on
      previousPlayingRef.current = isPlaying;
      wasInBreakRef.current = true;
      setCurrentSound("BREAK");
      setIsPlaying(true);
    }

    if (timerMode !== "break" && wasInBreakRef.current) {
      // Exiting break: restore preferred track and prior play/pause
      wasInBreakRef.current = false;
      setCurrentSound(preferredSound);
      setIsPlaying(previousPlayingRef.current);
    }
  }, [timerMode, preferredSound, isPlaying]);

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

  /**
   * Ensure playback state actually drives the audio element.
   * This covers cases where we set isPlaying programmatically (e.g., entering break).
   */
  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      pause();
    }
  }, [isPlaying, currentSound]);

  return (
    <div className="flex gap-2 lg:gap-1">
      {/* Sound selector button */}
      <button
        onClick={handleToggle}
        className="bg-accent/80 hover:bg-accent px-6 py-7 rounded-full w-48 font-semibold text-white transition-all"
      >
        {timerMode === "break" ? "BREAK" : preferredSound}
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
