import React, {useEffect, useReducer} from 'react';

import {Input} from '@components/Input/Input';
import {Timer} from '@components/Timer/Timer';
import {Board} from '@components/Board/Board';

import {gameReducer, initialState} from '@/actions/gameActions';
import {GameContext} from "@/context/gameContext";

import './App.scss';

export const App = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    console.log(state)

    const {count} = state;

    useEffect(() => {
        console.log(count)
    }, [state.count])


    return <GameContext.Provider value={{state: {...state}, dispatch}}>
        <main className='main'>
            <h1 className='main__heading'>Color Quiz Game</h1>
            <hr/>
            {!count && <Input/>}
            {!!count && <Timer/>}
            <hr/>
            {!!count && <Board/>}
        </main>
    </GameContext.Provider>
}