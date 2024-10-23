// src/js/component/SecondsCounter.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import "../../styles/index.css";

const sound = new Audio("/src/sounds/Alarm.mp3");

const Card = ({ digito }) => (
    <div className="card text-white m-2 custom-card">
        <div className="card-body d-flex justify-content-center align-items-center">
            <h5 className="card-title m-0">{digito}</h5>
        </div>
    </div>
);

const SecondsCounter = () => {
    const [counter, setCounter] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [targetTimes, setTargetTimes] = useState([null]);

    const maxTargets = 5; 

    useEffect(() => {
        if (isRunning) {
            const timerId = setInterval(() => setCounter((prev) => prev + 1), 1000);
            return () => clearInterval(timerId);
        }
    }, [isRunning]);

    useEffect(() => {
        targetTimes.forEach((time) => {
            if (counter === time && time !== null) {
                sound.play(); // Reproducir sonido
            }
        });
    }, [counter, targetTimes]);

    const handleTargetTimeChange = (index, event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value > 0) {
            const newTargetTimes = [...targetTimes];
            newTargetTimes[index] = value;
            setTargetTimes(newTargetTimes);
        }
    };

    const addTargetTimeInput = () => {
        if (targetTimes.length < maxTargets) {
            setTargetTimes([...targetTimes, null]);
        } else {
            alert("Has alcanzado el límite de marcas de tiempo.");
        }
    };

    return (
        <div className="seconds-counter-container">
            <div className="d-flex align-items-center mb-3">
                <div className="custom-clock-container">
                    <FontAwesomeIcon icon={faClock} size="3x" className="custom-clock-icon" />
                </div>
                <Card digito={Math.floor(counter / 100000 % 10)} />
                <Card digito={Math.floor(counter / 10000 % 10)} />
                <Card digito={Math.floor(counter / 1000 % 10)} />
                <Card digito={Math.floor(counter / 100 % 10)} />
                <Card digito={Math.floor(counter / 10 % 10)} />
                <Card digito={counter % 10} />
            </div>
            
            <div className="d-flex mt-3">
                <button className={`btn custom-button ${isRunning ? "btn-stop" : "btn-resume"}`} onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? "Parar" : "Continuar"}
                </button>
                <button className="btn btn-warning custom-button" onClick={() => setCounter(0)}>Reiniciar</button>
            </div>

            <div className="d-flex flex-column align-items-center">
                <h3 className="text-white mt-3">Marcas de tiempo</h3>
                {targetTimes.map((time, index) => (
                    <div key={index} className="d-flex mt-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder={`Marca de tiempo ${index + 1} (s)`}
                            value={time !== null ? time : ''}
                            onChange={(event) => handleTargetTimeChange(index, event)}
                        />
                    </div>
                ))}
                {targetTimes.length < maxTargets && (
                    <button className="btn btn-primary mt-3 custom-add-button" onClick={addTargetTimeInput}>+</button>
                )}
                {targetTimes.length >= maxTargets && (
                    <p className="text-white mt-3">Límite de marcas de tiempo alcanzado.</p>
                )}
            </div>
        </div>
    );
};

export { Card, SecondsCounter };
