import React from 'react';
import { Thumbnail, Item, Input, Col } from 'native-base';

export default ({currency, imagePath, onChangeAmount, onFocus, value}) => {
    return (
        <Col style={{width: 180}}>
            <Item>
                <Thumbnail square source={imagePath}/>
                <Input 
                    placeholder={currency} 
                    onChangeText={onChangeAmount} 
                    data-currency={currency} 
                    keyboardType='numeric'
                    value={value}
                    />
            </Item>
        </Col>
    )
}