import React, {useContext} from 'react';

import './Board.scss';

import {GameContext} from "@/context/gameContext";
import {Card} from '@/components/Card/Card';

export const Board = () => {
    const {state, dispatch} = useContext(GameContext);
    const {count} = state;

    const renderCards = () => {

        return new Array(count).fill(<Card/>);
    }


    return <div className="board">
        {renderCards()}
    </div>
}