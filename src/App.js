import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import background from './assets/img/background.png';

const date = new Date();

export default function App() {
    const [second, setSecond] = useState(date.getSeconds());
    const [minute, setMinute] = useState(date.getMinutes());
    const [hour, setHour] = useState(date.getHours() % 12 || 12);

    useEffect(() => {
        const timerID = setInterval(() => incrementMinute(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function incrementMinute() {
        if (second < 59) {
            setSecond(second + 1);
        }
        else if (minute < 59) {
            setMinute(minute + 1);
            setSecond(0);
        }
        else if (hour < 11) {
            setHour(hour + 1);
            setMinute(0);
        }
        else {
            setHour(0);
        }
    }

    return (
        <>
            <Clock>
                <Content>
                    <Background image={ background } />
                    <Hour rotate={ hour * 30 } />
                    <Minute rotate={ minute * 6 } />
                    <Second rotate={ second * 6 } />
                    <Point />
                </Content>
            </Clock>
            <Time>
                { ('00' + hour).slice(-2) }:
                { ('00' + minute).slice(-2) }:
                { ('00' + second).slice(-2) }
            </Time>
        </>
    );
}

const Clock = styled.div`
    border-radius: 100%;
    background: #ffffff;
    font-family: "sans-serif";
    width: 350px;
    height: 350px;
    margin: auto;
`;

const Background = styled.img`
    background-image: url(${ props => props.image });
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: bottom;
`;

const Content = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 100%;
`;

const Pointer = styled.div`
    transform: ${ props => `rotate(${ props.rotate }deg)` };
    position: absolute;
    margin: auto;
    left: 0;
    bottom: 0;
    right: 0;
    transform-origin: bottom center;
    z-index: 1;
    border-radius: 4px;
    background-color: transparent;
`;

const Second = styled(Pointer)`
    background: red;
    height: 45%;
    width: 3px;
    top: -45%;
`;

const Minute = styled(Pointer)`
    background: black;
    height: 39%;
    width: 7px;
    top: -39%;
`;

const Hour = styled(Pointer)`
    background: black;
    height: 30%;
    width: 8px;
    top: -30%;
`;

const Point = styled(Pointer)`
    background: red;
    height: 14px;
    width: 14px;
    top: 0;
    border-radius: 50%;
`;

const Time = styled.h1`
    text-align: center;
    font-family: sans-serif;
`;
