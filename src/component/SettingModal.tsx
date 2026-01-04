import { useState } from 'react'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (focusTime: number, breakTime: number, sessions: number) => void
  currentFocusTime: number
  currentBreakTime: number
  currentSessions: number
}

const SettingsModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  currentFocusTime, 
  currentBreakTime,
  currentSessions 
}: SettingsModalProps) => {
  
  const [focusMinutes, setFocusMinutes] = useState(currentFocusTime / 60)
  const [breakMinutes, setBreakMinutes] = useState(currentBreakTime / 60)
  const [sessions, setSessions] = useState(currentSessions)
  
  if (!isOpen) return null
  
  const handleSave = () => {
    onSave(focusMinutes * 60, breakMinutes * 60, sessions)
    onClose()
  }
  
  
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/10 shadow-2xl backdrop-blur-lg p-8 border border-white/20 rounded-3xl w-[90%] max-w-md">
        
        <h2 className="mb-6 font-bold text-white text-3xl text-center">Settings</h2>
        
        {/* Focus Time */}
        <div className="mb-6">
          <label className="block mb-2 text-white text-lg">Focus Time (minutes)</label>
          <input 
            type="number"
            value={focusMinutes}
            onChange={(e) => setFocusMinutes(Number(e.target.value))}
            className="bg-white/20 px-4 py-3 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent w-full text-white text-xl text-center"
            min="1"
            max="60"
          />
        </div>
        
        {/* Break Time */}
        <div className="mb-6">
          <label className="block mb-2 text-white text-lg">Break Time (minutes)</label>
          <input 
            type="number"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
            className="bg-white/20 px-4 py-3 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent w-full text-white text-xl text-center"
            min="1"
            max="30"
          />
        </div>
        
        {/* Sessions */}
        <div className="mb-8">
          <label className="block mb-2 text-white text-lg">Sessions</label>
          <input 
            type="number"
            value={sessions}
            onChange={(e) => setSessions(Number(e.target.value))}
            className="bg-white/20 px-4 py-3 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent w-full text-white text-xl text-center"
            min="1"
            max="10"
          />
        </div>
        
        {/* Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-full font-semibold text-white transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 bg-accent hover:bg-accent/90 py-3 rounded-full font-semibold text-white transition-all"
          >
            Save
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default SettingsModal


