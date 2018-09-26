import moment from 'moment';
import axios from 'axios';

export const GET_CURRENCIES_RESOLVED = 'GET_CURRENCIES_RESOLVED';
export const GET_CURRENCIES_REJECTED = 'GET_CURRENCIES_REJECTED';

export const getCurrencies = (date) => {
    return dispatch => {
        if (moment().format('YYYY-MM-DD') === date ) {
            
            dispatch(getCurrenciesRejected)
            
        } else {
            axios.get('http://data.fixer.io/api/latest?access_key=30916e24be13a3ab2220c966d794b869')
                .then(response => {
                    if(response.data.success) {
                        dispatch(getCurrenciesResolved(response.data));
                    } else {
                        dispatch(getCurrenciesRejected());
                    }
                })
                .catch(err => {
                    console.log(err)
                    dispatch(getCurrenciesRejected());
                })
        }
    }
    
}

export const getCurrenciesResolved = (response) => {
    return {
        type: GET_CURRENCIES_RESOLVED,
        payload: response
    }
}

export const getCurrenciesRejected = () => {
    return {
        type: GET_CURRENCIES_REJECTED
    }
}