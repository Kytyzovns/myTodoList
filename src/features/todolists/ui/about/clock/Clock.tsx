import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import "./analogClock/clock.css"
import {AnalogClock} from "./analogClock/AnalogClock";

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

            <AnalogClock time={time} />
        </div>
    );
};

