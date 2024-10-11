// src/js/component/SecondsCounter.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import alarmSound from "../../sounds/Alarm.mp3";
import clockSound from "../../sounds/Clock.mp3";

class Card extends React.Component {
    render() {
        return (
            <div className="card text-white m-2" style={{ width: "4rem", backgroundColor: "#cba11d" }}>
                <div className="card-body d-flex justify-content-center align-items-center">
                    <h5 className="card-title m-0">{this.props.digito}</h5>
                </div>
            </div>
        );
    }
}

class SecondsCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            isRunning: true,
            isCountdown: false,
            initialCountdownValue: null,
            timerId: null,
            targetTimes: [null],  
            alertShown: {},  
        };

        this.alarmAudio = new Audio(alarmSound);
        this.clockAudio = new Audio(clockSound);
        this.clockAudio.loop = true;  
    }

    componentDidMount() {
        this.startTimer();
        this.clockAudio.play();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isCountdown && this.state.counter === 0) {
            this.handleCountdownCompletion();
        } else {
            this.state.targetTimes.forEach((time, index) => {
                if (this.state.counter === time && time !== null && !this.state.alertShown[index]) {
                    this.alarmAudio.play();
                    this.setState(prevState => ({
                        alertShown: {
                            ...prevState.alertShown,
                            [index]: true
                        }
                    }));
                }
            });
        }
    }

    startTimer = () => {
        if (!this.state.timerId) {
            const timerId = setInterval(() => {
                this.setState((prevState) => ({
                    counter: this.state.isCountdown ? prevState.counter - 1 : prevState.counter + 1
                }));
            }, 1000);
            this.setState({ timerId, isRunning: true });
            if (!this.state.isCountdown) {
                this.clockAudio.play(); 
            }
        }
    };

    stopTimer = () => {
        clearInterval(this.state.timerId);
        this.setState({ isRunning: false, timerId: null });
        this.clockAudio.pause();
        this.clockAudio.currentTime = 0;
    };

    resetTimer = () => {
        clearInterval(this.state.timerId);
        this.setState({
            counter: this.state.isCountdown ? this.state.initialCountdownValue : 0,
            isRunning: true,
            timerId: null,
            alertShown: {}
        }, this.startTimer);
        if (!this.state.isCountdown) {
            this.clockAudio.play(); 
        }
    };

    resumeTimer = () => {
        this.startTimer();
    };

    handleTargetTimeChange = (index, event) => {
        const value = parseInt(event.target.value);
        const { targetTimes } = this.state;

        if (isNaN(value) || value <= 0) {
            return;
        }

        targetTimes[index] = value;
        this.setState({ targetTimes, alertShown: { ...this.state.alertShown, [index]: false } });
    };

    handleBlur = (index) => {
        const { targetTimes } = this.state;

        if (index > 0 && (targetTimes[index] === null || targetTimes[index] < targetTimes[index - 1] + 5)) {
            alert("El tiempo debe ser al menos 5 segundos mayor que el tiempo anterior.");
            targetTimes[index] = targetTimes[index - 1] + 5;
            this.setState({ targetTimes });
        }
    };

    addTargetTimeInput = () => {
        const { targetTimes } = this.state;
        const lastTime = targetTimes[targetTimes.length - 1] || 0;
        const newTime = lastTime + 5;

        if (targetTimes.length < 5) {
            this.setState(prevState => ({
                targetTimes: [...prevState.targetTimes, newTime]
            }));
        }
    };

    handleCountdownValueChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value > 0) {
            this.setState({ initialCountdownValue: value, counter: value, isCountdown: true }, this.stopTimer);
        }
    };

    handleCountdownCompletion = () => {
        this.stopTimer();
        this.setState({ isCountdown: false });
    };

    render() {
        const { counter, isRunning, targetTimes, isCountdown, initialCountdownValue } = this.state;

        return (
            <div className="d-flex justify-content-center align-items-center flex-column vh-100" style={{ backgroundColor: "#2a2f3e" }}>
                <div className="d-flex align-items-center mb-3">
                    <div className="card text-white" style={{ width: "4rem", backgroundColor: "transparent", border: "none" }}>
                        <div className="card-body d-flex justify-content-center align-items-center">
                            <FontAwesomeIcon icon={faClock} size="3x" style={{ color: "#FFD700" }} />
                        </div>
                    </div>
                    <Card digito={Math.floor(counter / 100000 % 10)} />
                    <Card digito={Math.floor(counter / 10000 % 10)} />
                    <Card digito={Math.floor(counter / 1000 % 10)} />
                    <Card digito={Math.floor(counter / 100 % 10)} />
                    <Card digito={Math.floor(counter / 10 % 10)} />
                    <Card digito={counter % 10} />
                </div>
                
                <div className="d-flex mt-3">
                    {isRunning ? (
                        <button className="btn" style={{ backgroundColor: "#c42200", color: "#fff", marginRight: "10px" }} onClick={this.stopTimer}>Parar</button>
                    ) : (
                        <button className="btn" style={{ backgroundColor: "#3c3c3c", color: "#fff", marginRight: "10px" }} onClick={this.resumeTimer}>{isCountdown ? "Continuar" : "Continuar"}</button>
                    )}
                    <button className="btn btn-warning" onClick={this.resetTimer}>Reiniciar</button>
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
                                onChange={(event) => this.handleTargetTimeChange(index, event)}
                                onBlur={() => this.handleBlur(index)}
                            />
                        </div>
                    ))}
                    {targetTimes.length < 5 && (
                        <button className="btn btn-primary mt-3" onClick={this.addTargetTimeInput}>+</button>
                    )}
                </div>

                <div className="d-flex flex-column align-items-center mt-3">
                    <h3 className="text-white">Cuenta regresiva</h3>
                    <input 
                        type="number" 
                        className="form-control w-50 mt-3" 
                        placeholder="Ingresa S" 
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                this.handleCountdownValueChange(event);
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}

export { Card, SecondsCounter };