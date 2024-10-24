import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import Home from "./component/home.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    const handleToggle = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setSeconds(0);
    };

    return (
        <Home
            seconds={seconds}
            isRunning={isRunning}
            onToggle={handleToggle}
            onReset={handleReset}
        />
    );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);