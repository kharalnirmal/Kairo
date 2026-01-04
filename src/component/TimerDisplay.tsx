

// 1. Define props - what data does this component need?
interface TimerDisplayProps {
    seconds: number; // Total seconds (we'll format it)
}
// 2. Helper function to format seconds into HH:MM:SS
function formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
     // Pad with zeros: 5 -> "05"
    const pad = (num: number) => num.toString().padStart(2, "0")

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}


// 3. The TimerDisplay component
export function TimerDisplay  ({ seconds }: TimerDisplayProps) {
    return (
        <div className='font-bold text-7xl sm:text-7xl md:text-8xl text-center tracking-wider timer-digits'>
            {formatTime(seconds)}
        </div>
    )
}

