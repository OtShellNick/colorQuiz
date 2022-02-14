import React, {createContext} from 'react';

import {initialState} from "@/actions/gameActions";

export const GameContext = createContext({state: {...initialState}});