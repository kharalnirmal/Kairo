type TimerState = "focus" | "break" | "ready" | "complete"
interface TimerHeaderProps {
state : TimerState;
fontSize?: "small" | "medium" | "large";
}

export function TimerHeader  ({state,fontSize = "medium"}: TimerHeaderProps) {
    const textState ={
focus:"In Focus",
break:"On Break",
ready:"Get Ready",
complete:"Session Complete!"
    }
    const fontSizeStyles = {
        small:"text-2xl",
        medium:"text-4xl",
        large:"text-3xl md:text-5xl"
    }
  return (
    <div>
        <h1 className={`${fontSizeStyles[fontSize]} text-center mb-4 font-poppins font-semibold`}>
            {textState[state]}
         <div className="relative w-full h-px">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent blur-sm animate-pulse" />
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" />
</div>
           </h1>
           
    </div>
  )
}

