import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Grid, LineChart, XAxis, YAxis
} from 'react-native-svg-charts';
import 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { detailInfoRequest } from '../app/actions/fetching_actions';

const KELVIN_VALUE = 1;

export class DetailInfoScreen extends Component {
  static navigationOptions = () => ({
    headerStyle: {
      backgroundColor: '#C6D9F6', shadowColor: 'transparent', elevation: 0, borderBottomWidth: 0, shadowOpacity: 0,
    },
    headerTintColor: 'black'
  });

  constructor(props) {
    super(props);
    const { navigation, getDetailInfo } = this.props;
    this.state = { title: navigation.getParam('itemTitle', 'Title'), switchPosition: '0' };
    const { title } = this.state;
    getDetailInfo(title);
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('SWITCH_POSITION');
      if (value !== null) {
        this.state.switchPosition = value;
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { detailCityInfo } = this.props;
    const tempList = [];
    const dateList = [];
    const LIST_AMOUNT = 10;

    if (detailCityInfo != null) {
      for (let i = 0; i < LIST_AMOUNT; i += 1) {
        tempList.push(detailCityInfo.list[i].main.temp - 273);
        dateList.push(detailCityInfo.list[i].dt_txt);
      }

      if (this.state.switchPosition == KELVIN_VALUE) {
        for (let i = 0; i < LIST_AMOUNT; i += 1) {
          tempList.push(detailCityInfo.list[i].main.temp);
        }
      } else {
        for (let i = 0; i < LIST_AMOUNT; i += 1) {
          tempList.push(detailCityInfo.list[i].main.temp - 273);
        }
      }
    }

    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 110;


    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.props.isLoading
            ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                <ActivityIndicator animating={this.props.isLoading} size="large" color="#0000ff" />
              </View>
            )
            : null
          }
          {detailCityInfo && !this.props.isLoading ? (

            <View style={{ flex: 1 }}>
              <LinearGradient
                colors={['#C6D9F6', '#ffffff']}
                start={{ x: 0, y: 0 }}
                style={styles.container}
              >
                <View style={styles.textInfo}>
                  <Text style={{
                    fontSize: 25,
                    width: '100%',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                  >
                    {detailCityInfo.city.name}
                  </Text>
                </View>
                <View style={styles.textInfo}>
                  <Text style={{
                    width: '100%',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                  >
                    {detailCityInfo.city.country}
                  </Text>
                </View>
                <View style={styles.textInfo}>
                  <Text style={{
                    fontSize: 50,
                    width: '100%',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                  >
                    {this.state.switchPosition == KELVIN_VALUE
                      ? `${(tempList[0] + 273).toFixed(2)} K`
                      : `${tempList[0].toFixed(2)} C`}
                  </Text>
                </View>
                <View style={styles.textInfo}>
                  <Text style={{
                    width: '100%',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                  >
                Population:
                    {' '}
                    {detailCityInfo.city.population}
                  </Text>
                </View>
                <View style={{ paddingBottom: 10, alignItems: 'center' }}>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                      uri: `http://openweathermap.org/img/wn/${detailCityInfo.list[0].weather[0].icon}@2x.png`,
                      cache: 'only-if-cached',
                    }}
                  />
                </View>
                <View style={{
                  height: 300,
                  padding: 20,
                  flexDirection: 'row',
                }}
                >
                  <YAxis
                    data={tempList}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                    formatLabel={value => (this.state.switchPosition == KELVIN_VALUE ? `${(value).toFixed(0)} K` : `${(value).toFixed(0)} C`)}
                  />
                  <View style={{
                    flex: 1,
                    marginLeft: 10
                  }}
                  >
                    <LineChart
                      style={{ flex: 1 }}
                      data={tempList}
                      contentInset={verticalContentInset}
                      svg={{ stroke: 'rgb(134, 65, 244)' }}
                    >
                      <Grid />
                    </LineChart>
                    <XAxis
                      style={{
                        marginHorizontal: -20,
                        height: xAxisHeight,
                      }}
                      data={tempList}
                      formatLabel={(value, index) => `${moment(dateList[index]).format('MM/DD h:mm')}`}
                      contentInset={{
                        right: 25
                      }}
                      numberOfTicks={10}
                      svg={{
                        fill: 'black',
                        fontSize: 8,
                        fontWeight: 'bold',
                        rotation: 70,
                        originY: 40,
                        y: 5,
                      }}
                    />
                  </View>
                </View>
              </LinearGradient>

            </View>

          ) : null
        }
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  textInfo: {
    paddingBottom: 10,
  }
});

const mapStateToProps = (state) => {
  const { detailCityInfo, isLoading, isError } = state.fetchingReducer;
  return { detailCityInfo, isLoading, isError };
};

export default connect(mapStateToProps, {
  getDetailInfo: detailInfoRequest,
})(DetailInfoScreen);
