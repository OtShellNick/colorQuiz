import React, {useContext, useState} from 'react';

import {GameContext} from "@/context/gameContext";

export const Timer = () => {
    const [time, setTime] = useState(3);
    const {state, dispatch} = useContext(GameContext);



    return <div>{`Успейте открыть все карточки за ${time}`}</div>
}