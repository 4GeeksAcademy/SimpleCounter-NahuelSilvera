import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import "../../styles/index.css";

const Card = ({ digito }) => (
    <div className="card text-white m-2 custom-card">
        <div className="card-body d-flex justify-content-center align-items-center">
            <h5 className="card-title m-0">{digito}</h5>
        </div>
    </div>
);

class SecondsCounter extends React.Component {
    render() {
        const { seconds, targetTimes, onToggle, onReset, onTargetChange, onAddTarget, isRunning } = this.props;

        return (
            <div className="seconds-counter-container">
                <div className="d-flex align-items-center mb-3">
                    <div className="custom-clock-container">
                        <FontAwesomeIcon icon={faClock} size="3x" className="custom-clock-icon" />
                    </div>
                    <Card digito={Math.floor(seconds / 100000 % 10)} />
                    <Card digito={Math.floor(seconds / 10000 % 10)} />
                    <Card digito={Math.floor(seconds / 1000 % 10)} />
                    <Card digito={Math.floor(seconds / 100 % 10)} />
                    <Card digito={Math.floor(seconds / 10 % 10)} />
                    <Card digito={seconds % 10} />
                </div>

                <div className="d-flex mt-3">
                    <button className={`btn custom-button ${isRunning ? "btn-stop" : "btn-resume"}`} onClick={onToggle}>
                        {isRunning ? "Parar" : "Continuar"}
                    </button>
                    <button className="btn btn-warning custom-button" onClick={onReset}>Reiniciar</button>
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
                                onChange={(event) => onTargetChange(index, event)}
                            />
                        </div>
                    ))}
                    {targetTimes.length < 5 && (
                        <button className="btn btn-primary mt-3 custom-add-button" onClick={onAddTarget}>+</button>
                    )}
                    {targetTimes.length >= 5 && (
                        <p className="text-white mt-3">Límite de marcas de tiempo alcanzado.</p>
                    )}
                </div>
            </div>
        );
    }
}

export { Card, SecondsCounter };
