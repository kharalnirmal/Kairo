import { useState } from "react"
import OnBoarding from "./screens/OnBoarding"
import TimerScreen from "./screens/TimerScreen"


const App = () => {
  const [screen, setScreen] = useState("onboarding")
    const handleScreenChange =()=>{
      setScreen("timer")
    }

  return (
    <div className='bg-primary w-full h-screen'>
     {screen ==="onboarding"&&<OnBoarding onNext={handleScreenChange} />}
     {screen ==="timer"&&<TimerScreen />}

     
     

    </div>
  )
}

export default App
