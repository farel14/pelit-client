import { SET_USER, SET_BADGES, SET_ACTIVE_TARGET, TOGGLE_LOADER_PROFILE } from './actionTypesGaluh.js'

export function setUser(input) {
    return {
        type: SET_USER,
        payload: input
    }
}

export function setBadges(input) {
    return {
        type: SET_BADGES,
        payload: input
    }
}

export function setActiveTarget(input) {
    return {
        type: SET_ACTIVE_TARGET,
        payload: input
    }
}

export function toggleLoadingProfile(input) {
    return {
        type: TOGGLE_LOADER_PROFILE,
        payload: input
    }
}

export function getUserDetails(id) {
    // console.log('GET USER DETAILS', id)
    let userId = +id
    // console.log(id, 'ID')
    return function(dispatch) {
        dispatch(toggleLoadingProfile(true))
        fetch(`https://pelit-app.herokuapp.com/user/${userId}`)
        .then(response => response.json())
        .then(data => {
            dispatch(toggleLoadingProfile(false))
            // console.log(data, 'DATA')
            dispatch(setUser(data))
        })
        .catch(err => {
            dispatch(toggleLoadingProfile(false))
            console.log('error fetch user data', err)
        })
    }
}

export function getAllBadges() {
    return function(dispatch) {
        fetch(`https://pelit-app.herokuapp.com/badge`)
        .then(response => response.json())
        .then(data => {
            dispatch(setBadges(data))
        })
        .catch(err => {
            console.log('error fetch user data', err)
        })
    }
}

export function getUserActiveTarget(id) {
    let userId = +id
    return function(dispatch) {
        fetch(`https://pelit-app.herokuapp.com/target/active/${userId}`)
        .then(response => response.json())
        .then(data => {
            dispatch(setActiveTarget(data[0]))
        })
        .catch(err => {
            console.log('error fetch user data', err)
        })
    }
}