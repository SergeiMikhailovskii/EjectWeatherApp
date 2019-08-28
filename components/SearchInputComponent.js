import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


class SearchInputComponent extends Component {
  render() {
    const { onInputChange, dataFromParent, onClearPress } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Input
          placeholder="Enter city"
          onChangeText={onInputChange}
          value={dataFromParent}
        />
        <Button
          buttonStyle={{ width: 40, height: 40, backgroundColor: '#C6D9F6' }}
          onPress={onClearPress}
          icon={(
            <MaterialIcons
              name="delete"
              size={30}
              color="black"
            />
          )}
        />
      </View>
    );
  }
}

export default SearchInputComponent;
