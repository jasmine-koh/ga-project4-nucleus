import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';

import {View, StyleSheet, PermissionsAndroid, Platform} from 'react-native';

import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';

import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const Location = ({navigation}) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    ready: false,
    error: '',
  });

  useEffect(() => {
    permission();
  }, []);

  // get contact list from phone
  const permission = () => {
    if (Platform.OS === 'ios') {
      getLocation();
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      ).then(() => {
        getLocation();
      });
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(geoSuccess, geoFailure, {
      enableHighAccuracy: true,
      timeOut: 20000,
    });
  };

  //   geoSuccess
  const geoSuccess = position => {
    ready = true;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    setLocation(prevState => {
      return {...prevState, ...ready, latitude, longitude};
    });
  };

  // geoError
  const geoFailure = err => {
    error = err;
    ready = true;
    setLocation(prevState => {
      return {...prevState, ...ready, error};
    });
  };

  return (
    <Container style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Location</Title>
        </Body>
      </Header>

      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}></MapView>
        <Text>Lat: {location.latitude}</Text>
        <Text>Lng: {location.longitude}</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Location;
