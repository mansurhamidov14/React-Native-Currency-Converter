import React from 'react';
import Expo from 'expo';
import {connect} from 'react-redux';
import { Container, Header, Content, Row, Right, Button, Text, Icon } from 'native-base';
import * as actions from '../actions';
import Input from '../components/Input';

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
  
  class HomeScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        currency: {},
        values: {}
      }
    }

    async componentWillMount() {
      this.props.getCurrencies(this.props.currency.date);
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({loading: false});
    }
    handleChange (text, currency) {
      if(text.indexOf(',') !== -1 || text.lastIndexOf('.') > text.indexOf('.')) {
        return;
      }
      // text = text === '' ? 0 : parseFloat(text, 10);
      let newValues = this.state.values.map((previousValue) => {
        if(previousValue.currency === currency) {
          return {
            ...previousValue,
            amount: text.toString()
          }
        } else {
          let amount = 1 / this.props.currency.rates[currency] * text * this.props.currency.rates[previousValue.currency];
          return {
            ...previousValue,
            amount: amount !== 0 ? amount.toFixed(previousValue.round).toString() : ''
          }
        }
      });
      this.setState({values:newValues})
    }

    componentDidMount() {
      let values = this.props.availableCurrencies.map(item => {
        let value = {
          currency: item.currency,
          amount: 1,
          round: item.round
        };
        if(item.currency === 'AZN') {
          value.amount = value.amount.toFixed(item.round).toString()
        } else if (item.currency === this.props.currency.base) {
          value.amount = (1 / this.props.currency["rates"]["AZN"]).toFixed(item.round).toString()
        } else {
          value.amount = (1 / this.props.currency["rates"]["AZN"] * this.props.currency["rates"][item.currency]).toFixed(item.round).toString()
        }
        return value;
      });
      
      this.setState({values})
    }
    
  
    render() {
      if (this.state.loading) {
        return <Expo.AppLoading />;
      }
      
      let inputGroups = chunkArray(this.props.availableCurrencies.filter(c => c.active), 2);
      let dt = this.props.currency.date.split('-');
      let formattedCurrencyDate = `${dt[2]}.${dt[1]}.${dt[0]}`;
      return (
        <Container>
          <Header style={{height:70, paddingTop: 20}}>
            <Right>
                <Button transparent onPress={() => this.props.navigation.navigate('AvailableCurrencies')}>
                    <Text>Select Currencies&nbsp;&nbsp;</Text>
                    <Icon name="ios-arrow-forward"/>
                </Button>
            </Right>
          </Header>
          <Content style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{textAlign:'center', color: '#666666', marginTop: 8, marginBottom: 3}}>Currencies for {formattedCurrencyDate}</Text>
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
      availableCurrencies: state.availableCurrencies
    }
  };

export default connect (mapStateToProps, actions)(HomeScreen);