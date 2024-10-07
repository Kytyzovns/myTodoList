import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import "./clock.css"

const getDoubleDigitTime = (time: number) => time < 10 ? '0' + time : time;

export const Clock = () => {
    const [time, setTime] = useState(new Date());
    const [timeFormat, setTimeFormat] = useState<"24" | "12">("24");

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
            console.log("tick")
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, []);

    const americanFormat = time.getHours() % 12 || 12
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDegrees = (seconds / 60) * 360
    const minuteDegrees = ((minutes + seconds/60) / 60) * 360
    const hourDegrees = ((hours % 12 + (minutes/60)) / 12) * 360

    const timeFormatChangeHandler = () => {
        setTimeFormat(prevState => prevState === "12" ? "24" : "12");
    }

    return (
        <div style={{padding: "50px"}}>
            {timeFormat === "12" ? <span>{getDoubleDigitTime(americanFormat)}:</span> :
                <span>{getDoubleDigitTime(hours)}:</span>}
            <span>{getDoubleDigitTime(minutes)}:</span>
            <span>{getDoubleDigitTime(seconds)}</span>
            {timeFormat === "12" && <span>{time.getHours() >= 12 ? " PM" : " AM"}</span>}
            <button onClick={timeFormatChangeHandler}>format</button>

            <div className="clock">
                <div className="clock-face">
                    <div
                        className="hand hour-hand"
                        style={{transform: `rotate(${hourDegrees + 90}deg)`}}
                    />
                    <div
                        className="hand minute-hand"
                        style={{transform: `rotate(${minuteDegrees + 90}deg)`}}
                    />
                    <div
                        className="hand second-hand"
                        style={{transform: `rotate(${secondDegrees + 90}deg)`}}
                    />
                </div>
            </div>
        </div>
    );
};

