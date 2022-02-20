import React, {useContext, useEffect, useState} from 'react';

import {GameContext} from "@/context/gameContext";

import './Timer.scss';

export const Timer = () => {
    const [time, setTime] = useState(3);
    const {state, dispatch} = useContext(GameContext);

    useEffect(() => {

        const timer = setInterval(() => {
            if (time > 0) setTime(prevTime => prevTime - 1);
        }, 1000);

        if(time <= 0 ) dispatch({type: 'lose', lose: true})

        return () => clearInterval(timer);

    }, [time]);


    return <div className='timer'>{time > 0 ? `Успейте открыть все карточки за ${time}` : 'Вы проиграли!'}</div>
}