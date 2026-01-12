import { useEffect, useState } from "react";

// Importing all components for Timer UI and controls
import SoundToggle from "../component/SoundToggle";
import { TimerHeader } from "../component/TimerHeader";
import { TimerDisplay } from "../component/TimerDisplay";
import { ButttonControl } from "../component/ButttonControl";
import { Penguin } from "../component/Penguine";
import SettingsModal from "../component/SettingModal";

/**
 * TimerScreen Component
 * Handles the main Pomodoro timer logic, session counting, UI, and settings
 */
const TimerScreen = () => {
  /**
   * Whether the timer is currently running
   * true = countdown active, false = paused/stopped
   */
  const [isPlaying, setisPlaying] = useState(false);

  /**
   * Focus duration in SECONDS
   * Default = 25 minutes → 25 * 60 = 1500
   */
  const [focusTime, setFocusTime] = useState(1500);

  /**
   * Break duration in SECONDS
   * Default = 5 minutes → 5 * 60 = 300
   */
  const [breakTime, setBreakTime] = useState(300);

  /** Whether the settings modal is visible */
  const [showSettings, setShowSettings] = useState(false);

  /**
   * Current countdown value in seconds
   * This is what TimerDisplay shows and counts down
   */
  const [second, setSecond] = useState(focusTime);

  /**
   * Timer state:
   * "ready" → before starting
   * "focus" → focus session
   * "break" → break session
   * "complete" → all sessions done
   */
  const [timerMode, setTimerMode] = useState("ready");

  /** Total number of focus/break sessions user wants */
  const [totalSessions, setTotalSessions] = useState(1);

  /** How many focus sessions have been completed */
  const [sessionCount, setSessionCount] = useState(0);

  /**
   * Main timer effect
   * Runs every time `isPlaying` or `second` changes
   */
  useEffect(() => {
    let interval: number;

    // If timer is playing AND there are seconds left, start countdown
    if (isPlaying && second > 0) {
      interval = setInterval(() => {
        // Reduce seconds by 1 every 1 second
        setSecond((s) => s - 1);
      }, 1000);
    }

    // Play warning sound 5 seconds before timer ends
    if (second === 5 && isPlaying) {
      const audio = new Audio("/music/warning.m4a");
      audio.play().catch(() => {}); // ignore errors if user blocked audio
    }

    // When countdown reaches 0, stop timer and handle completion
    if (second === 0 && isPlaying) {
      setisPlaying(false); // Stop countdown
      handleTimerComplete(); // Decide what happens next
    }

    // Cleanup interval to avoid memory leaks
    return () => clearInterval(interval);
  }, [isPlaying, second]);

  /** Start the timer */
  const handlePlay = () => {
    // If timer is not already focus or break, start focus session
    if (timerMode !== "focus" && timerMode !== "break") {
      setTimerMode("focus");
      setSecond(focusTime); // start countdown from focus time
    }
    setisPlaying(true); // set timer running
  };

  /** Show settings modal */
  const handlesetting = () => setShowSettings(true);

  /** What happens when a timer finishes */
  const handleTimerComplete = () => {
    // Play completion alarm
    const alarm = new Audio("/music/ending.m4a");
    alarm.play().catch(() => {});

    if (timerMode === "focus") {
      const newSessionCount = sessionCount + 1;
      setSessionCount(newSessionCount);

      // If all sessions done
      if (newSessionCount >= totalSessions) {
        setTimerMode("complete"); // mark timer complete
        setSecond(0); // stop countdown
      } else {
        // Otherwise, go to break session
        setTimerMode("break");
        setSecond(breakTime);
        setisPlaying(false); // Don't auto-start break
      }
    } else if (timerMode === "break") {
      // After break, start next focus session
      setTimerMode("focus");
      setSecond(focusTime);
      setisPlaying(false); // Don't auto-start focus
    }
  };

  /** Save new settings from modal */
  const handleSaveSettings = (
    newFocusTime: number,
    newBreakTime: number,
    newSessions: number
  ) => {
    setFocusTime(newFocusTime); // update focus time
    setBreakTime(newBreakTime); // update break time
    setSecond(newFocusTime); // reset countdown
    setTotalSessions(newSessions);

    setSessionCount(0); // reset completed sessions
    setTimerMode("ready"); // reset mode to ready
  };

  /** Reset timer to start over */
  const handleRepeat = () => {
    setisPlaying(false); // stop countdown
    setTimerMode("ready"); // reset mode
    setSecond(focusTime); // reset countdown
    setSessionCount(0); // reset session count
  };

  /** Pause timer */
  const handlePause = () => setisPlaying(false);

  /**
   * Main UI return
   * - Left: Timer & controls
   * - Right: Penguin mascot with glow
   * - SettingsModal overlaid if open
   */
  return (
    <div className="relative flex md:flex-row flex-col justify-around gap-10 p-4 w-full min-h-screen overflow-hidden">
      {/* Decorative background blobs */}
      <div className="top-20 -left-20 absolute bg-accent/30 blur-3xl rounded-full w-96 h-96 animate-pulse" />
      <div
        className="-right-20 bottom-20 absolute bg-purple-400/20 blur-3xl rounded-full w-80 h-80 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div className="top-1/2 left-1/2 absolute bg-blue-500/10 blur-3xl rounded-full w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2" />

      {/* Timer Controls side */}
      <div className="z-10 relative flex flex-col justify-between py-4 w-full md:w-1/2">
        {/* Session Counter */}
        <div className="flex justify-center mb-4">
          <div className="bg-white/10 shadow-lg backdrop-blur-md px-6 py-3 border border-white/20 rounded-full">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white/70 text-sm">
                Sessions:
              </span>
              <span className="font-bold text-accent text-xl">
                {sessionCount}
              </span>
              <span className="text-white/50 text-sm">/</span>
              <span className="font-semibold text-white text-lg">
                {totalSessions}
              </span>
            </div>
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex flex-col flex-1 justify-center items-center gap-6 bg-white/5 shadow-2xl backdrop-blur-sm p-8 border border-white/10 rounded-3xl">
          <TimerHeader
            state={timerMode as "focus" | "break" | "ready" | "complete"}
            fontSize="large"
          />
          <TimerDisplay seconds={second} />
        </div>

        {/* Control buttons */}
        <div className="flex md:flex-row flex-col justify-center items-center gap-4 md:gap-20 mt-8 pb-6">
          <ButttonControl
            onPlay={handlePlay}
            onPause={handlePause}
            onRepeat={handleRepeat}
            onSetting={handlesetting}
          />
          <SoundToggle isTimerPlaying={isPlaying} />
        </div>
      </div>

      {/* Penguin Mascot side */}
      <div className="z-10 relative flex justify-center items-center w-full md:w-1/2">
        <div className="absolute bg-accent/40 blur-3xl rounded-full w-72 h-72 animate-pulse" />
        <div className="relative">
          <Penguin
            state={timerMode as "focus" | "break" | "ready" | "complete"}
            size="large"
          />
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
        currentFocusTime={focusTime}
        currentBreakTime={breakTime}
        currentSessions={totalSessions}
      />
    </div>
  );
};

export default TimerScreen;
