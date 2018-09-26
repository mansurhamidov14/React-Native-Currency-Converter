import React from 'react';
import Expo from 'expo';
import { Container, Header, Content, Row } from 'native-base';
import {Provider, connect} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import moment from 'moment';
import * as actions from './actions';
import Input from './components/Input';
import {store, persistor} from './store';

function chunkArray(myArray, chunk_size){
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];
  
  for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index+chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
  }

  return tempArray;
}

class App extends React.Component {
  constructor(props) {
    let currency = props.currency
    let currenciesToBeConverted = [
      {index: 0, currency: 'AZN', round: 4, imagePath: require(`./assets/flags/aze.png`)},
      {index: 1, currency: 'USD', round: 4, imagePath: require(`./assets/flags/us.png`)},
      {index: 2, currency: 'EUR', round: 4, imagePath: require(`./assets/flags/eur.png`)},
      {index: 3, currency: 'GBP', round: 4, imagePath: require(`./assets/flags/gb.png`)},
      {index: 4, currency: 'IRR', round: 0, imagePath: require(`./assets/flags/iri.png`)},
      {index: 5, currency: 'RUB', round: 2, imagePath: require(`./assets/flags/rus.png`)},
      {index: 6, currency: 'GEL', round: 4, imagePath: require(`./assets/flags/geo.png`)},
      {index: 7, currency: 'TRY', round: 4, imagePath: require(`./assets/flags/tur.png`)},
    ];
    let values = currenciesToBeConverted.map(item => {
      let value = {
        currency: item.currency,
        amount: 1,
        round: item.round
      }
      if(item.currency === 'AZN') {
        value.amount = value.amount.toFixed(item.round).toString()
      } else if (item.currency === props.currency.base) {
        value.amount = (1 / currency["rates"]["AZN"]).toFixed(item.round).toString()
      } else {
        value.amount = (1 / currency["rates"]["AZN"] * currency["rates"][item.currency]).toFixed(item.round).toString()
      }
      return value;
    });
    super(props);
    this.state = {
      loading: true,
      currency: {},
      currenciesToBeConverted,
      values
    }
  }

  async componentWillMount() {
  
    this.setState({currency: this.props.currency})
    this.props.getCurrencies(this.props.currency.date);
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({loading: false});
  }

  // componentDidMount () {
  //   console.log(this.state);
  // }

  handleChange (text, currency) {
    // text = text === '' ? 0 : parseFloat(text, 10);
    let newValues = this.state.values.map((previousValue) => {
      if(previousValue.currency === currency) {
        console.log(text);
        return {
          ...previousValue,
          amount: text.toString()
        }
      } else {
        let amount = 1 / this.state.currency.rates[currency] * text * this.state.currency.rates[previousValue.currency];
        return {
          ...previousValue,
          amount: amount !== 0 ? amount.toFixed(previousValue.round).toString() : ''
        }
      }
    })
    this.setState({values:newValues})
  }


  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    
    let inputGroups = chunkArray(this.state.currenciesToBeConverted, 2);

    return (
      <Container>
        <Header />
          <Content style={{flex: 1, flexDirection: 'row'}}>
            {inputGroups.map((currenciesToBeConverted, id) => 
              <Row key={id} style={{height:60}}>
                {currenciesToBeConverted.map((item, index) => 
                  <Input 
                    key={index} {...item} 
                    onChangeAmount={(text) => this.handleChange(text, item.currency)}
                    value={this.state.values[item.index].amount}
                  />
                )}
              </Row>
            )}
          </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currency: state.currency,
    store
  }
}

const ReduxApp = connect (mapStateToProps, actions)(App);

export default () => (
  <Provider store={store}> 
    <PersistGate loading={null} persistor={persistor}> 
      <ReduxApp/>
    </PersistGate>
  </Provider>
);