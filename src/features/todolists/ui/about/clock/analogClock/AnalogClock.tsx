import React from 'react';
import "./clock.css"

type Props = {
    time: Date
}

export const AnalogClock = ({time}: Props) => {

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDegrees = seconds * 6
    const minuteDegrees = (minutes + seconds/60) * 6
    const hourDegrees = (hours % 12 + (minutes/60)) * 30


    return (
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
    );
};

