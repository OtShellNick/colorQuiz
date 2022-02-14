export const initialState = {
    count: 0,
    lose: false
}

export const gameReducer = (state, action) => {
    const {type, count, lose} = action;

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
        default:
            return state;
    }
}