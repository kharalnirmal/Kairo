import Button from "./component/Button"
import Penguine from "./component/Penguine";
import TimerDisplay from "./component/TimerDisplay";

const App = () => {
  const math = Math.random();
  return (
    <div className='bg-primary h-screen'>
    <TimerDisplay seconds={86394}/>
    <Button  variant="primary" onClick={() => console.log(math)}>Primary Button</Button>
    <Button  variant="secondary" onClick={() => alert("Clicked Secondary")}>Secondary Button</Button>
    <Penguine state="focus" size="large"/>
    <Penguine state="break" size="small"/>
    <Penguine state="complete" size="medium"/>
    <Penguine state="ready" size="small"/>
    </div>
  )
}

export default App
