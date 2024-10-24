import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import Home from "./component/home.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

let seconds = 0;
let isRunning = true;
let interval = null;
let targetTimes = [null]; // Estado global para las marcas de tiempo

const startInterval = () => {
    interval = setInterval(() => {
        seconds += 1;
        checkTargetTimes(); // Verifica si se alcanzó alguna marca de tiempo
        renderApp();
    }, 1000);
};

const stopInterval = () => {
    clearInterval(interval);
};

const checkTargetTimes = () => {
    targetTimes.forEach((time) => {
        if (seconds === time && time !== null) {
            console.log(`¡Alerta! Se alcanzó el tiempo objetivo de ${time} segundos.`);
            alert(`¡Alerta! Se alcanzó el tiempo objetivo de ${time} segundos.`);
        }
    });
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

const handleTargetTimeChange = (index, event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
        targetTimes[index] = value;
    }
};

const addTargetTimeInput = () => {
    if (targetTimes.length < 5) {
        targetTimes.push(null);
    } else {
        alert("Has alcanzado el límite de marcas de tiempo.");
    }
};

const App = () => {
    return (
        <Home
            seconds={seconds}
            isRunning={isRunning}
            onToggle={handleToggle}
            onReset={handleReset}
            targetTimes={targetTimes}
            onTargetChange={handleTargetTimeChange}
            onAddTarget={addTargetTimeInput}
        />
    );
};

const renderApp = () => {
    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(<App />);
};

// Iniciar el intervalo al cargar la página
startInterval();
