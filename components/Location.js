import 'react-native-gesture-handler';

import React, {useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

const Location = ({navigation}) => {
  let newLocation = [
    {
      ready: false,
      where: {lat: null, lng: null},
      error: null,
    },
  ];

  let geoOptions = {
    enableHighAccuracy: true,
    timeOut: 20000,
    maximumAge: 60 * 60,
  };

  //   Geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);

  const geoSuccess = postion => {
    newLocation.push({
      ready: true,
      where: {lat: position.coords.latitude, lng: position.coords.longitude},
    });
  };

  const geoFailure = err => {
    newLocation.push({
      error: err.message,
    });
  };

  return (
    <View>
      <Text>Location</Text>
      {!newLocation.ready && <Text>Using Geolocation in React Native</Text>}
      {newLocation.error && <Text>{newLocation.error}</Text>}
      {newLocation.ready && (
        <Text>
          'Latitude: '{newLocation.where.lat}'. Longitude: '
          {newLocation.where.lng}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardView: {
    flex: 1,
    padding: 100,
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  dashboardText: {
    fontSize: 50,
  },
  dashboardCards: {
    flexDirection: 'row',
  },
  card: {
    width: 150,
    height: 150,
  },
});

export default Location;
