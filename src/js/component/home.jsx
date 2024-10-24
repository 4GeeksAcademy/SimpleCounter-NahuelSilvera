import React from "react";
import { SecondsCounter } from "./SecondsCounter";

const Home = ({ seconds, onToggle, onReset, isRunning, targetTimes, onTargetChange, onAddTarget }) => {
    return (
        <SecondsCounter
            seconds={seconds}
            isRunning={isRunning}
            targetTimes={targetTimes}
            onToggle={onToggle}
            onReset={onReset}
            onTargetChange={onTargetChange}
            onAddTarget={onAddTarget}
        />
    );
};

export default Home;
