import { } from './actionTypesGaluh.js'
import { SET_TRANSACTION } from './actionTypes.js'
import axios from 'axios'

export function setTransaction(payload) {
    return {
        type: SET_TRANSACTION,
        payload
    }
}

export function postTransaction({ payload, UserId }) {
    return async (dispatch) => {
        try {
            // console.log(payload, UserId)
            // let res = await fetch(`http://8.21.9.76:3000/transactions/${UserId}`, {
            // const { data } = await axios({
            //     method: "POST",
            //     url: `http://192.168.100.9:3000/transactions/${UserId}`,
            //     data: payload,
            //     // headers: {
            //     //         "Content-Type": "multipart/form-data",
            //     //         "Accept": "application/json"
            //     //     },
            // })
            let res = await fetch(`http://192.168.100.9:3000/transactions/${UserId}`, {
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
            // console.log('Success:', res);
            console.log('succcesss', res)
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
            let res = await fetch('http://192.168.100.9:3000/ocr', {
                method: 'POST',
                body: payload
            })
            res = await res.json()
            console.log('Success:', res);
            return res
        } catch (error) {
            console.error('Error:', error)
        }
    }
}

export function fetchTransaction(TransactionId) {
    return async (dispatch) => {
        try {
            let res = await fetch(`http://192.168.100.9:3000/transactions/expense/${TransactionId}`, {
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