import React from 'react';
import Expo from 'expo';
import {connect} from 'react-redux';
import { Container, Header, Content, ListItem, Left, Body, Switch, Right, Button, Icon, Text, Thumbnail, Title } from 'native-base';
import {toggleCurrency} from '../actions';

class SelectCurrencies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentWillMount() {
        this.setState({currency: this.props.currency})
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({loading: false});
    }

    render() {
        if (this.state.loading) {
          return <Expo.AppLoading />;
        }
        
        return (
            <Container>
                <Header style={{height:70, paddingTop: 20}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Maximum 10</Title>
                    </Body>
                </Header>
            <Content>
                {this.props.availableCurrencies.map(currency => {
                    return (
                        <ListItem icon key={currency.index}>
                            <Left>
                                <Thumbnail square source={currency.imagePath}/>
                            </Left>
                            <Body>
                                <Text>{currency.currency}</Text>
                            </Body>
                            <Right>
                                <Switch value={currency.active} disabled={this.props.availableCurrencies.filter(ac => ac.active).length >= 10 && !currency.active}
                                    onValueChange={() => this.props.toggleCurrency(currency.index)}/>
                            </Right>
                        </ListItem>
                    );
                })}
                
            </Content>
          </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        availableCurrencies: state.availableCurrencies
    }
}

const mapDispatchTopProps = dispatch => {
    return {
        toggleCurrency: index => dispatch(toggleCurrency(index))
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(SelectCurrencies);