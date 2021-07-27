import { } from './actionTypesGaluh.js'
import { SET_TRANSACTION } from './actionTypes.js'

export function setTransaction(payload) {
    return {
        type: SET_TRANSACTION,
        payload
    }
}

export function postTransaction({payload, UserId}) {
    return async (dispatch) => {
        try {
            console.log(payload, UserId)
            // let res = await fetch(`http://8.21.9.76:3000/transactions/${UserId}`, {
            let res = await fetch(`https://pelit-app.herokuapp.com/transactions/${UserId}`, {
                method: 'POST',
                body: payload,
                // headers: {
                //     "Content-Type": "multipart/form-data",
                //     "Accept": "application/json"
                // }
            })
            // res = await res.text()
            // console.log(res)
            res = await res.json()
            console.log('Success:', res);
            // return true
        } catch (error) {
            console.error('Error:', error)
        }
    }
}
export function postOcr(payload) {
    return async (dispatch) => {
        try {
            // console.log(payload, 'dari action')
            let res = await fetch('https://pelit-app.herokuapp.com/ocr', {
                method: 'POST',
                body: payload
            })
            res = await res.json()
            console.log('Success:', res);
            // return res
        } catch (error) {
            console.error('Error:', error)
        }
    }
}

export function fetchTransaction(TransactionId) {
    return async (dispatch) => {
        try {
            let res = await fetch(`https://pelit-app.herokuapp.com/transactions/expense/${TransactionId}`, {
                method: 'GET', // or 'PUT'
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                // body: JSON.stringify(payload),
            })
            res = await res.json()
            dispatch(setTransaction(res))

            console.log('Success:', res);
        } catch (error) {
            console.error('Error:', error)
        }
    }
}