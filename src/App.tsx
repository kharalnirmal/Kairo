import Button from "./component/Button"
import ButttonControl from "./component/ButttonControl";
import Penguine from "./component/Penguine";
import TimerDisplay from "./component/TimerDisplay";
import TimerHeader from "./component/TimerHeader";

const App = () => {
  const math = Math.random();
   const handlePlay = () => console.log('Play clicked!');
  const handlePause = () => console.log('Pause clicked!');
  const handleRepeat = () => console.log('Reset clicked!');
  const handleSettings = () => console.log('Settings clicked!')
  return (
    <div className='bg-primary h-screen'>
    <TimerDisplay seconds={86394}/>
    <Button  variant="primary" onClick={() => console.log(math)}>Primary Button</Button>
    <Button  variant="secondary" onClick={() => alert("Clicked Secondary")}>Secondary Button</Button>
       
      <ButttonControl 
        onPlay={handlePlay}
        onPause={handlePause}
        onRepeat={handleRepeat}
        onSetting={handleSettings}
      />
      <TimerHeader state="focus" fontSize="small" />
      <TimerHeader state="break" fontSize="small" />
      <TimerHeader state="complete" fontSize="small" />
    <Penguine state="focus" size="large"/>
    <Penguine state="break" size="small"/>
    <Penguine state="complete" size="medium"/>
    <Penguine state="ready" size="small"/>

    </div>
  )
}

export default App
