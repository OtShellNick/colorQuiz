import React, {useContext, useState} from 'react';
import {TextField} from '@mui/material';
import {Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import {GameContext} from "@/context/gameContext";

export const Input = () => {
    const [error, setError] = useState(false);
    const {state, dispatch} = useContext(GameContext);

    return <form
        className='main__form'
        onSubmit={e => {
            e.preventDefault();
            const {target} = e;
            dispatch({type: 'set-count', count: +target.count.value})
        }}>

        <div/>

        <TextField
            required
            name='count'
            id="standard-required"
            label={error ? 'Введите число кратное 2' : ''}
            placeholder="Введите количество карточек кратное 2"
            variant="standard"
            error={error}
            autoFocus={true}
            size='small'
            onChange={e => {
                const {value} = e.target;

                if(isNaN(+value)) return setError(true );
                return setError( value % 2 > 0);
            }}
        />

        <Button
            type='submit'
            variant="contained"
            size='small'
            endIcon={<SendIcon/>}>
            Send
        </Button>

        <div/>

    </form>
}