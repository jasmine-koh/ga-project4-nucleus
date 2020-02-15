import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';

const Location = ({navigation}) => {
  const [location, setLocation] = useState({
    latitude: 'unknown',
    longitude: 'unknown',
    ready: false,
    error: '',
  });

  useEffect(() => {
    let geoOption = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60,
    };

    Geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOption);
  }, []);

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

  console.log(location);
  return (
    <View style={styles.container}>
      <Text>Lat: {location.latitude}</Text>
      <Text>Lng: {location.longitude}</Text>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  big: {
    fontSize: 48,
  },
  container: {
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
