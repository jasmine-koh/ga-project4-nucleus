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
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [error, setError] = useState('');

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
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  // geoError
  const geoFailure = err => {
    setError(err);
  };

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon style={styles.headerText} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerText}>Location</Title>
        </Body>
        <Right></Right>
      </Header>

      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}></MapView>
        <Text>Lat: {latitude}</Text>
        <Text>Lng: {longitude}</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFEFE',
  },
  header: {
    backgroundColor: '#f8f8f8',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
  },
  headerText: {
    color: '#000000',
  },
});

export default Location;
