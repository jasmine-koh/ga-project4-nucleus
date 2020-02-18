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
  SafeAreaView,
} from 'react-native';

import {Card} from 'react-native-elements';

import Auth0 from 'react-native-auth0';
import Config from 'react-native-config';
import SInfo from 'react-native-sensitive-info';

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID,
});

const Home = ({route, navigation}) => {
  const {data} = route.params;

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello {data.name}</Text>
        <Button onPress={logout} title="Logout" />
        <View style={{alignItems: 'center'}}>
          <Image source={require('./img/logo.jpeg')}></Image>
        </View>
      </View>

      <View style={styles.body}>
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

      <View style={styles.footer}>
        <Text>Footer goes here</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
  },
  header: {
    flex: 3,
    paddingTop: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
  },
  body: {
    flex: 6,
    paddingTop: 60,
  },
  dashboardCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 150,
    height: 150,
  },
  footer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
