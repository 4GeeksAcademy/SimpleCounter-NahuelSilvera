import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import Home from "./component/home.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

let seconds = 0;
let isRunning = true;
let interval = null;

const startInterval = () => {
    interval = setInterval(() => {
        seconds += 1;
        renderApp();
    }, 1000);
};

const stopInterval = () => {
    clearInterval(interval);
};

const handleToggle = () => {
    isRunning = !isRunning;
    if (isRunning) {
        startInterval();
    } else {
        stopInterval();
    }
    renderApp();
};

const handleReset = () => {
    seconds = 0;
    renderApp();
};

const App = () => {
    return (
        <Home
            seconds={seconds}
            isRunning={isRunning}
            onToggle={handleToggle}
            onReset={handleReset}
        />
    );
};

const renderApp = () => {
    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(<App />);
};

// Iniciar el intervalo al cargar la página
startInterval();
