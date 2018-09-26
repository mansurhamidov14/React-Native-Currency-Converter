import React from 'react';
import Expo from 'expo';
import { Container, Header, Content, Row } from 'native-base';
import Input from './components/Input';

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

export default class App extends React.Component {
  constructor(props) {
    let currency = {
      "success":true,
      "timestamp":1537885746,
      "base":"EUR",
      "date":"2018-09-25",
      "rates":{
        "RUB":77.5339,
        "GBP":0.895611,
        "IRR":49624.91056,
        "GEL":3.093796,
        "AZN":2.009538,
        "USD":1.178599,
        "EUR": 1
      }
    }
    let currenciesToBeConverted = [
      {index: 0, currency: 'AZN', imagePath: require(`./assets/flags/aze.png`)},
      {index: 1, currency: 'USD', imagePath: require(`./assets/flags/us.png`)},
      {index: 2, currency: 'EUR', imagePath: require(`./assets/flags/eur.png`)},
      {index: 3, currency: 'GBP', imagePath: require(`./assets/flags/gb.png`)},
      {index: 4, currency: 'IRR', imagePath: require(`./assets/flags/iri.png`)},
      {index: 5, currency: 'RUB', imagePath: require(`./assets/flags/rus.png`)},
      {index: 6, currency: 'GEL', imagePath: require(`./assets/flags/geo.png`)}
    ];
    let values = currenciesToBeConverted.map(item => {
      let value = {
        currency: item.currency,
        amount: 1
      }
      if(item.currency === 'AZN') {
        value.amount = value.amount.toFixed(2).toString()
      } else if (item.currency === currency.base) {
        value.amount = (1 / currency["rates"]["AZN"]).toFixed(2).toString()
      } else {
        value.amount = (1 / currency["rates"]["AZN"] * currency["rates"][item.currency]).toFixed(2).toString()
      }
      return value;
    });
    super(props);
    this.state = {
      loading: true,
      currency,
      currenciesToBeConverted,
      values
    }
  }

  async componentWillMount() {
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
    let newValues = this.state.values.map(previousValue => {
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
          amount: amount !== 0 ? amount.toFixed(2).toString() : ''
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
