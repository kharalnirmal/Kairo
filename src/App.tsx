import Button from "./component/Button"
import TimerDisplay from "./component/TimerDisplay";

const App = () => {
  const math = Math.random();
  return (
    <div className='bg-primary h-screen'>
    <Button  variant="primary" onClick={() => console.log(math)}>Primary Button</Button>
    <Button  variant="secondary" onClick={() => alert("Clicked Secondary")}>Secondary Button</Button>
    <TimerDisplay seconds={3600}/>
    </div>
  )
}

export default App
