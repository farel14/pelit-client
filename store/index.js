import { createStore, applyMiddleware, compose } from 'redux'
import { } from './actionTypes.js'
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {
    
}

function boardReducer(state = initialState, action) {

    return state
}

const store = createStore (
    boardReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

export default store