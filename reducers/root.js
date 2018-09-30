import {combineReducers} from 'redux';
import currency from './currency';
import availableCurrencies from './availableCurrencies';

export default combineReducers({
    currency,
    availableCurrencies
})