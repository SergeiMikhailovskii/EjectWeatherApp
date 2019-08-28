import React, { Component } from 'react';
import {
  Alert, Image, SafeAreaView, StyleSheet, View
} from 'react-native';
import * as Facebook from 'expo-facebook';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Input } from 'react-native-elements';

export default class AuthorizationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { login: '', password: '' };
    this.onPressSignIn = this.onPressSignIn.bind(this);
  }

  onPressSignIn = () => {
    const { login, password } = this.state;
    if (login !== '' && password !== '') {
      console.log(`${login} ${password}`);
      const { navigation } = this.props;
      navigation.navigate('Current');
    } else {
      Alert.alert('Fill the fields!');
    }
  };

  onPressFacebook = async () => {
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync('886698401722951', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi, ${(await response.json()).name}!`);
        const { navigation } = this.props;
        navigation.navigate('Current');
      } else {
        Alert.alert('Cancelled!');
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    const { login, password } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo.png')}
              resizeMode="center"
            />

            <View style={styles.authorization}>
              <View style={styles.textInput}>
                <Input
                  placeholder="Enter login"
                  onChangeText={login => this.setState({ login })}
                  value={login}
                  inputStyle="email-address"
                  label="Login"
                />
              </View>

              <View style={styles.textInput}>
                <Input
                  placeholder="Enter password"
                  onChangeText={password => this.setState({ password })}
                  value={password}
                  autoCapitalize="none"
                  inputStyle="email-address"
                  label="Password"
                />
              </View>

              <Button
                style={{ marginBottom: 16, marginTop: 16 }}
                title="Sign In"
                type="outline"
                onPress={this.onPressSignIn}
              />

              <Button
                style={{ marginBottom: 16 }}
                title="Facebook Log In"
                onPress={this.onPressFacebook}
              />

            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

AuthorizationScreen.navigationOptions = {
  title: 'Authorization',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  authorization: {
    fontSize: 14,
  },
  textInput: {
    height: 50,
    marginBottom: 20,
  },
});
