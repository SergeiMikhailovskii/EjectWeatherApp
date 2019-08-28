import React, { Component } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Button, Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default class MapsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        title: 'Title 1',
        coordinates: {
          latitude: 53.8978349,
          longitude: 27.5428332
        },
      },
      {
        title: 'Title 2',
        coordinates: {
          latitude: 53.8878349,
          longitude: 27.5428332
        },
      }]
    };
  }

  onMapLongPress = (latitude, longitude) => {
    const { markers } = this.state;
    markers.push({ title: 'Title', coordinates: { latitude, longitude } });
    Alert.alert('Added!');
  };

  render() {
    const image = require('../assets/images/custom_marker.png');
    const { markers } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          containerStyle={{ height: 50, paddingTop: 5 }}
          leftComponent={(
            <Button
              containerStyle={{ flex: 1, justifyContent: 'center' }}
              buttonStyle={{ backgroundColor: '#C6D9F6' }}
              icon={(
                <Ionicons
                  name="ios-menu"
                  size={30}
                  color="black"
                />
              )}
              onPress={() => this.props.navigation.openDrawer()}
            />
          )}
          centerComponent={{ text: 'Maps', style: { fontSize: 20 } }}
          rightComponent={{ icon: 'map' }}
          backgroundColor="#C6D9F6"
        />
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 53.8878349,
            longitude: 27.5428332,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }}
        >
          {markers.map(marker => (
            <MapView.Marker
              coordinate={marker.coordinates}
              title={marker.title}
            >
              <Image
                source={image}
                style={{ height: 50, width: 50 }}
              />
            </MapView.Marker>
          ))}
        </MapView>
      </SafeAreaView>
    );
  }
}

MapsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
