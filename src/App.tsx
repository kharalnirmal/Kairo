import Button from "./component/Button"
import TimerDisplay from "./component/TimerDisplay";

const App = () => {
  const math = Math.random();
  return (
    <div className='bg-primary h-screen'>
    <TimerDisplay seconds={86394}/>
    <Button  variant="primary" onClick={() => console.log(math)}>Primary Button</Button>
    <Button  variant="secondary" onClick={() => alert("Clicked Secondary")}>Secondary Button</Button>
    </div>
  )
}

export default App
