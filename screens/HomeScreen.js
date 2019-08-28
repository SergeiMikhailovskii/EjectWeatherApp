import React, { Component } from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  NetInfo,
} from 'react-native';
import { Button, Header, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { listOfCitiesRequest, searchCityRequest } from '../app/actions/fetching_actions';
import SearchInputComponent from '../components/SearchInputComponent';


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.onPressSearch = this.onPressSearch.bind(this);
    NetInfo.getConnectionInfo().then((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      console.log('Is Internet reachable?', state.isInternetReachable);
    });
  }

  componentDidMount() {
    const { getCities } = this.props;
    getCities();
    if (this.askPermissions()) {
      console.log('Permission presents');
      this.sendNotificationImmediately();
    } else {
      console.log('Denied');
    }
  }

   onPressSearch = async () => {
     const { getCityFromSearch, getCities } = this.props;
     const { text } = this.state;
     if (text === '') {
       getCities();
     } else {
       getCityFromSearch(text);
     }
   };

  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    return finalStatus === 'granted';
  };

  sendNotificationImmediately = async () => {
    const notificationId = await Notifications.presentLocalNotificationAsync({
      title: 'This is header',
      body: 'This is body',
    });
    console.log(notificationId);
  };

  render() {
    const {
      list, isError, isLoading, navigation, getCities
    } = this.props;

    const { text } = this.state;

    if (isError) {
      Alert.alert('Error while loading');
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          statusBarProps={{ translucent: true }}
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
              onPress={() => navigation.toggleDrawer()}
            />
          )}
          centerComponent={(
            <SearchInputComponent
              dataFromParent={text}
              onInputChange={text => this.setState({ text })}
              onClearPress={() => {
                this.setState({ text: '' });
                getCities();
              }}
            />
)}
          rightComponent={(
            <Button
              containerStyle={{ flex: 1, justifyContent: 'center' }}
              buttonStyle={{ backgroundColor: '#C6D9F6' }}
              icon={(
                <Ionicons
                  name="ios-search"
                  size={30}
                  color="black"
                />
            )}
              onPress={this.onPressSearch}
            />
)}
          backgroundColor="#C6D9F6"
        />
        <View style={styles.container}>
          {isLoading
            ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                <ActivityIndicator animating={isLoading} size="large" color="#C6D9F6" />
              </View>
            )
            : null
}

          <View style={styles.listContainer}>
            { list && !isLoading
              ? (
                <FlatList
                  data={list}
                  renderItem={({ item }) => (
                    <ListItem
                      onPress={() => {
                        navigation.navigate('Details', {
                          itemTitle: item.name,
                        });
                      }}
                      roundAvatar
                      title={item.name}
                      subtitle={item.weather[0].description}
                      leftAvatar={{
                        source: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` && { uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` },
                      }}
                    />
                  )

                      }
                  keyExtractor={(item, index) => index.toString()}
                />
              )
              : null
                }
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

// Styles
const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  searchContainer: {
    backgroundColor: '#C6D9F6',
    flex: 1,
    flexDirection: 'row',
    paddingStart: 10,
    paddingEnd: 10,
  },
  listContainer: {
    flex: 10,
  },
  container: {
    flex: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

const mapStateToProps = (state) => {
  const { list, isLoading, isError } = state.fetchingReducer;
  return { list, isLoading, isError };
};

export default connect(mapStateToProps, {
  getCities: listOfCitiesRequest,
  getCityFromSearch: searchCityRequest,
})(HomeScreen);
