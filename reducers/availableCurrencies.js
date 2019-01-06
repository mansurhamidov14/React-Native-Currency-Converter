import {TOGGLE_CURRENCY} from '../actions';

const initialState = [
    {   index: 0,  active: true,  currency: 'AZN', round: 4, imagePath: require(`../assets/flags/aze.png`) },
    {   index: 1,  active: true,  currency: 'USD', round: 4, imagePath: require(`../assets/flags/us.png`)  },
    {   index: 2,  active: true,  currency: 'EUR', round: 4, imagePath: require(`../assets/flags/eur.png`) },
    {   index: 3,  active: true,  currency: 'GBP', round: 4, imagePath: require(`../assets/flags/gb.png`)  },
    {   index: 4,  active: true,  currency: 'IRR', round: 0, imagePath: require(`../assets/flags/iri.png`) },
    {   index: 5,  active: true,  currency: 'RUB', round: 2, imagePath: require(`../assets/flags/rus.png`) },
    {   index: 6,  active: true,  currency: 'GEL', round: 4, imagePath: require(`../assets/flags/geo.png`) },
    {   index: 7,  active: true,  currency: 'TRY', round: 4, imagePath: require(`../assets/flags/tur.png`) },
    {   index: 8,  active: false, currency: 'BGN', round: 4, imagePath: require(`../assets/flags/bul.png`) },
    {   index: 9,  active: false, currency: 'BYR', round: 0, imagePath: require(`../assets/flags/bel.png`) },
    {   index: 10, active: false, currency: 'CAD', round: 4, imagePath: require(`../assets/flags/can.png`) },
    {   index: 11, active: false, currency: 'CHF', round: 4, imagePath: require(`../assets/flags/swi.png`) },
    {   index: 12, active: false, currency: 'CNY', round: 4, imagePath: require(`../assets/flags/chi.png`) },
    {   index: 13, active: false, currency: 'JPY', round: 3, imagePath: require(`../assets/flags/jap.png`) },
    {   index: 14, active: false, currency: 'KRW', round: 2, imagePath: require(`../assets/flags/kor.png`) },
    {   index: 15, active: false, currency: 'KZT', round: 2, imagePath: require(`../assets/flags/kaz.png`) },
    {   index: 16, active: false, currency: 'UAH', round: 3, imagePath: require(`../assets/flags/ukr.png`) },
];

export default (state = initialState, action) => {
    if(action.type === TOGGLE_CURRENCY) {
        return state.map(currency => {
            if(action.index === currency.index) {
                return {
                    ...currency,
                    active: !currency.active
                }
            }
            return {...currency}
        })
    }

    return state;
}