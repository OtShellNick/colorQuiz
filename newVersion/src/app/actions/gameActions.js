export const initialState = {
    count: 0
}

export const gameReducer = (state, action) => {
    const {type, count} = action;

    switch (type) {
        case 'set-count':
            return {
                ...state,
                count
            }
        default:
            return state;
    }
}