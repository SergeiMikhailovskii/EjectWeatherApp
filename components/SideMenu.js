import React, { Component } from 'react';
import { AsyncStorage, SafeAreaView, Switch, View } from 'react-native';
import { Text } from 'react-native-elements';


export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchPosition: false,
    };
    this.storeData('0');
  }

  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('SWITCH_POSITION', value);
    } catch (e) {
      console.log(e);
    }
  };

  toggleSwitch = (value) => {
    this.setState({ switchPosition: value });
    if (value == 0){
      this.storeData('0');
    } else {
      this.storeData('1');
    }
  };

  render() {
    const { switchPosition } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          {switchPosition
            ? <Text>Switch from Kelvin to Celsius</Text>
            : <Text>Switch from Celsius to Kelvin</Text>
          }
          <Switch
            style={{ marginTop: 20 }}
            onValueChange={this.toggleSwitch}
            value={switchPosition}
          />
        </View>
      </SafeAreaView>
    );
  }
}
