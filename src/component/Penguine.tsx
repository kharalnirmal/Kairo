type PenguinState = "focus" | "break" | "ready" | "complete" 

interface PenguinProps {
    state: PenguinState;
    size?: "small" |"medium" | "large";
}
const Penguin = ({state , size = "medium" }:PenguinProps) => {

 const PenguinImages = {
    focus: "/images/focus.png",
    break: "/images/Break.png",
    ready: "/images/ready.png",
    complete: "/images/complete.png",
 }

 const sizeStyles = {
    small: "w-16 h-16",
    medium: "w-32 h-32",
    large: "w-64 h-64",
 }

  return (
     <div className={`${sizeStyles[size]} transition-all duration-500 hover:scale-110`}>
        <img src={PenguinImages[state]} alt={`Penguin${state}`}  className={`${sizeStyles[size]}`} />
    </div>
  )
}

export default Penguin