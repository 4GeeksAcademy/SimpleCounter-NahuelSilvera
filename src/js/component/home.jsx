import React from "react";
import { SecondsCounter } from "./SecondsCounter";

let targetTimes = [null];

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

const Home = ({ seconds, onToggle, onReset, isRunning }) => {
    return (
        <SecondsCounter
            seconds={seconds}
            isRunning={isRunning}
            targetTimes={targetTimes}
            onToggle={onToggle}
            onReset={onReset}
            onTargetChange={handleTargetTimeChange}
            onAddTarget={addTargetTimeInput}
        />
    );
};

export default Home;
