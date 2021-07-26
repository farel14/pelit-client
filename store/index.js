import { createStore, applyMiddleware, compose } from 'redux'
// import { } from './actionTypes.js'
import reducer from './reducers'
import thunk from 'redux-thunk'
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const initialState = {
    
// }

// function reducer(state = initialState, action) {

//     return state
// }

const store = createStore (
    reducer, applyMiddleware(thunk)
    // composeEnhancers(
    //     applyMiddleware(thunk)
    // )
)

export default store