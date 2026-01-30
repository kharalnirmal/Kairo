import { useState } from "react";
import OnBoarding from "./screens/OnBoarding";
import TimerScreen from "./screens/TimerScreen";

// Main App component - handles navigation between onboarding and timer screens
const App = () => {
  // State to track which screen is currently displayed
  const [screen, setScreen] = useState("onboarding");

  // Handler to transition from onboarding to timer screen
  const handleScreenChange = () => {
    setScreen("timer");
  };

  return (
    <div className="bg-primary w-full h-screen">
      {/* Render OnBoarding screen on initial app load */}
      {screen === "onboarding" && <OnBoarding onNext={handleScreenChange} />}
      {/* Render Timer screen after onboarding is completed */}
      {screen === "timer" && <TimerScreen />}
    </div>
  );
};

export default App;
