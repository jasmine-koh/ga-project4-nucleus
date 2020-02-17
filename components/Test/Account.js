import React, {useState, useEffect} from 'react';
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native';

import {NavigationActions, StackActions} from '@react-navigation/native';

import Auth0 from 'react-native-auth0';
import Config from 'react-native-config';
import SInfo from 'react-native-sensitive-info';

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID,
});

const Account = ({navigation}) => {
  const logout = () => {
    SInfo.deleteItem('accessToken', {});
    SInfo.deleteItem('refreshToken', {});

    auth0.webAuth
      .clearSession()
      .then(res => {
        console.log('clear session ok');
      })
      .catch(err => {
        console.log('error clearing session: ', err);
      });

    gotoLogin(); // go to login screen
  };

  const gotoLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <View>
        <Text>Hello</Text>
        <Button onPress={logout} title="Logout" />
      </View>
    </View>
  );
};

export default Account;
