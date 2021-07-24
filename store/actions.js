import { } from './actionTypes.js'

export function postTransaction(data) {
    return async (dispatch) => {
        try {
            let res = await fetch('http://localhost:3000/transactions', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            res = await res.json()
            console.log('Success:', res);
        } catch (error) {
            console.error('Error:', error)
        }
    }
}