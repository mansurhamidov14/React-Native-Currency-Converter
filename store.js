import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers/root';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['currency', 'availableCurrencies']
};

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer, {},
    compose(
        applyMiddleware(thunk)
    ));

let persistor = persistStore(store);
// persistor.purge();

export { store, persistor };