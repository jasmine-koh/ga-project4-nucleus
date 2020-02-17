import 'react-native-gesture-handler';

import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

import {Card} from 'react-native-elements';

import Auth0 from 'react-native-auth0';
import Config from 'react-native-config';
import SInfo from 'react-native-sensitive-info';

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID,
});

const Home = ({navigation}) => {
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
    <View style={styles.dashboardView}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={{width: 300, padding: 80}}
          source={{
            uri: 'https://i.imgur.com/xvtm1e6.jpg',
          }}></Image>
        <Text style={styles.dashboardText}>Nucleus</Text>
      </View>

      <View>
        <Text>Hello</Text>
        <Button onPress={logout} title="Logout" />
      </View>

      <ScrollView>
        <TouchableOpacity>
          <View style={styles.dashboardCards}>
            <Card title="Events" containerStyle={styles.card}></Card>
            <Card title="List" containerStyle={styles.card}>
              {/* possibe to onPress card? */}
              <Button
                onPress={() => navigation.navigate('Lists')}
                title="View all"></Button>
            </Card>

            <Card title="Location" containerStyle={styles.card}>
              {/* possibe to onPress card? */}
              <Button
                onPress={() => navigation.navigate('Location')}
                title="View all"></Button>
            </Card>
            <Card title="Contact" containerStyle={styles.card}></Card>

            <Card title="Groups" containerStyle={styles.card}></Card>
            <Card title="Settings" containerStyle={styles.card}></Card>
          </View>
        </TouchableOpacity>
      </ScrollView>
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
    flexDirection: 'column',
  },
  card: {
    width: 150,
    height: 150,
  },
});

export default Home;
