import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './store';
import HomeScreen from './screens/Home';
import AvailableCurrenciesScreen from './screens/AvailableCurrencies';

const AppStack = createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    AvailableCurrencies: {
      screen: AvailableCurrenciesScreen
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home'
  });

export default () => (
  <Provider store={store}> 
    <PersistGate loading={null} persistor={persistor}> 
      <AppStack/>
    </PersistGate>
  </Provider>
);