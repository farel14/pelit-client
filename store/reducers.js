import { SET_TRANSACTION } from './actionTypes.js'
import { SET_USER, SET_BADGES, SET_ACTIVE_TARGET, TOGGLE_LOADER_PROFILE } from './actionTypesGaluh.js'

const initialState = {
    transaction: {},
    user: {},
    earnedBadges: [],
    allBadges: [],
    activeTarget: {},
    loadingProfile: true,
}

function reducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case SET_TRANSACTION:
            return { ...state, transaction: payload}
        case SET_USER:
            return { ...state, user: payload, earnedBadges: payload.Badges}
        case SET_BADGES:
            return { ...state, allBadges: payload}
        case SET_ACTIVE_TARGET:
            return { ...state, activeTarget: payload}
        case TOGGLE_LOADER_PROFILE:
            return { ...state, loadingProfile: payload}
        default:
            return state
    }
}

export default reducer