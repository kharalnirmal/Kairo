type PenguinState = "focus" | "break" | "ready" | "complete" 

interface PenguinProps {
    state: PenguinState;
    size?: "small" |"medium" | "large";
}
export function Penguin  ({state , size = "medium" }:PenguinProps) {

 const PenguinImages = {
    focus: "/images/focus.webp",
    break: "/images/break.webp",
    ready: "/images/ready.webp",
    complete: "/images/complete.webp",
 }

 const sizeStyles = {
    small: "w-16 h-16",
    medium: "w-32 h-32",
    large: "md:w-[40vw] md:h-[40vw] sm:w-[40vh] sm:h-[40vh] h-64 w-64 ",
 }

  return (
     <div className={`${sizeStyles[size]} transition-all duration-500 hover:scale-110`}>
        <img src={PenguinImages[state]} alt={`Penguin${state}`}  className={`${sizeStyles[size]}`} />
    </div>
  )
}

