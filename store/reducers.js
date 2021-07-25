import { SET_TRANSACTION } from "../fileTypes"

const initialState = {
    transaction: {},
    // difficulty: 'easy'
}

function reducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case SET_TRANSACTION:
            return { ...state, transaction: payload}
        default:
            return state
    }
}

export default reducer