export const initialState = {
    count: 0,
    cards: [],
    lose: false
}

export const gameReducer = (state, action) => {
    const {type, count, lose, cards} = action;

    switch (type) {
        case 'set-count':
            return {
                ...state,
                count
            }
        case 'lose':
            return {
                ...state,
                lose
            }
        case 'set-cards':
            return {
                ...state,
                cards
            }
        default:
            return state;
    }
}