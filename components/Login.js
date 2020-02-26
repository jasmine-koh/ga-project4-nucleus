import React, {useState, useEffect} from 'react';
import {View, Image, Button, ActivityIndicator, StyleSheet} from 'react-native';

import Auth0 from 'react-native-auth0';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import SInfo from 'react-native-sensitive-info';
import RNRestart from 'react-native-restart';

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID,
});

const Login = ({navigation}) => {
  const [status, setStatus] = useState({hasInitialized: false});

  useEffect(() => {
    SInfo.getItem('accessToken', {}).then(accessToken => {
      if (accessToken) {
        // next: get user details
        auth0.auth
          .userInfo({token: accessToken})
          .then(data => {
            gotoHome(data);
          })
          .catch(err => {
            // next: add code for dealing with invalid access token
            SInfo.getItem('refreshToken', {}).then(refreshToken => {
              // get the refresh token from the secure storage

              // request for a new access token using the refresh token
              auth0.auth
                .refreshToken({refreshToken: refreshToken})
                .then(newAccessToken => {
                  SInfo.setItem('accessToken', newAccessToken, {});
                  RNRestart.Restart();
                })
                .catch(accessTokenErr => {
                  console.log(
                    'error getting new access token: ',
                    accessTokenErr,
                  );
                });
            });
          });
      } else {
        // no access token
        setStatus({
          hasInitialized: true,
        });
      }
    });
  });

  const login = () => {
    auth0.webAuth
      .authorize({
        scope: Config.AUTHO_SCOPE,
        audience: Config.AUTH0_AUDIENCE,
        device: DeviceInfo.getUniqueId(),
        prompt: 'login',
      })
      .then(res => {
        // next: add code for getting user info
        SInfo.setItem('accessToken', res.accessToken, {});
        SInfo.setItem('refreshToken', res.refreshToken, {});
        auth0.auth
          .userInfo({token: res.accessToken})
          .then(data => {
            gotoHome(data); // go to the Home screen
          })
          .catch(err => {
            console.log(
              'error occurred while trying to get user details: ',
              err,
            );
          });
      })
      .catch(error => {
        console.log('error occurred while trying to authenticate: ', error);
      });
  };

  const gotoHome = Auth0userdata => {
    setStatus({
      hasInitialized: true,
    });

    navigation.navigate('Home', {Auth0userdata});
  };

  return (
    <View>
      <View style={styles.logo}>
        <Image source={require('./img/logo.jpeg')} />
      </View>

      <View>
        <ActivityIndicator
          size="large"
          color="#05a5d1"
          animating={!status.hasInitialized}
        />
        {status.hasInitialized && <Button onPress={login} title="Login" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  login: {},
});

export default Login;
