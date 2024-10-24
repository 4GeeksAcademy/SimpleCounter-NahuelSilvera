import React, { useState } from "react";
import { SecondsCounter } from "./SecondsCounter";

const Home = ({ seconds, onToggle, onReset, isRunning }) => {
    const [targetTimes, setTargetTimes] = useState([null]);

    const handleTargetTimeChange = (index, event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
            const newTargetTimes = [...targetTimes];
            newTargetTimes[index] = value;
            setTargetTimes(newTargetTimes);
        }
    };

    const addTargetTimeInput = () => {
        if (targetTimes.length < 5) {
            setTargetTimes([...targetTimes, null]);
        } else {
            alert("Has alcanzado el límite de marcas de tiempo.");
        }
    };

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