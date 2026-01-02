type TimerState = "focus" | "break" | "ready" | "complete"
interface TimerHeaderProps {
state : TimerState;
fontSize?: "small" | "medium" | "large";
}

const TimerHeader = ({state,fontSize = "medium"}: TimerHeaderProps) => {
    const textState ={
focus:"In Focus",
break:"On Break",
ready:"Get Ready",
complete:"Session Complete!"
    }
    const fontSizeStyles = {
        small:"text-2xl",
        medium:"text-4xl",
        large:"text-6xl"
    }
  return (
    <div>
        <h1 className={`${fontSizeStyles[fontSize]} text-center mb-4 font-poppins font-semibold`}>
            {textState[state]}
        </h1>
    </div>
  )
}

export default TimerHeader