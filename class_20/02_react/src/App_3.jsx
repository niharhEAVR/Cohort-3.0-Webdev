import { useState, useRef } from 'react';
import './App.css'

function App() {
    return (<>
        <StateStopwatch />
        <RefStopwatch />
    </>)
}

function StateStopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  console.log("rendered StateStopwatch: "+time); // This will log every second

  const start = () => {
    if (intervalRef.current) return; // prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);  // re-renders every second
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  return (
    <div style={{ border: "2px solid white", padding: "10px", margin: "10px" }}>
      <h3>⏱ State Stopwatch (Re-renders every second)</h3>
      <h1>{time}s</h1>

      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function RefStopwatch() {
  const timeRef = useRef(0);       // actual time (no re-renders)
  const intervalRef = useRef(null);
  const [displayTime, setDisplayTime] = useState(0); // UI time

  console.log("rendered RefStopwatch: "+displayTime); //  This will log only when user clicks "Show Time" button
    
  const start = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      timeRef.current += 1;   // does NOT cause any re-render
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    timeRef.current = 0;
    setDisplayTime(0);
  };

  const show = () => {
    setDisplayTime(timeRef.current); // re-renders only when user wants
  };

  return (
    <div style={{ border: "2px solid white", padding: "10px", margin: "10px" }}>
      <h3>⏱ Ref Stopwatch (No re-renders while running)</h3>
      <h1>{displayTime}s</h1>

      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
      <button onClick={show}>Show Time</button>
    </div>
  );
}

export default App