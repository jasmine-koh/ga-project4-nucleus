import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';

import {Image, StyleSheet} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';

import Auth0 from 'react-native-auth0';
import Config from 'react-native-config';
import SInfo from 'react-native-sensitive-info';

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID,
});

const Home = ({route, navigation}) => {
  const {Auth0userdata} = route.params;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUsersFetch();
  }, []);

  // For Auth0 Logout
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

  // For Auth0 Login
  const gotoLogin = () => {
    navigation.navigate('Login');
  };

  // Database
  // get all users in database and compare with Auth0 data
  const getUsersFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/users')
      .then(res => res.json())
      .then(data => {
        data.map(item => {
          if (Auth0userdata.email == item.email) {
            setUserData(item);
          }
        });
      });
  };

  return (
    <Container style={styles.container}>
      <Header>
        {/* <Left>
          <Button transparent onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" />
          </Button>
        </Left> */}
        <Body>
          <Title>Home</Title>
        </Body>
        {/* <Right>
          <Button transparent>
            <Icon name="settings" />
          </Button>
        </Right> */}
      </Header>
      <Content padder>
        <Text>Hello {userData.firstName}</Text>
        <Button onPress={logout}>
          <Text>Logout</Text>
        </Button>
        <Card transparent style={styles.dashboardCards}>
          <CardItem cardBody style={styles.cardImg}>
            <Image source={require('./img/logo.jpeg')} />
          </CardItem>
        </Card>
        <Card transparent style={styles.dashboardCards}>
          <CardItem
            button
            onPress={() => navigation.navigate('Lists', {userData})}
            style={styles.card}>
            <Icon name="list" />
            <Text>Lists</Text>
          </CardItem>
          <CardItem
            button
            onPress={() => navigation.navigate('Location', {userData})}
            style={styles.card}>
            <Icon name="pin" />
            <Text>Location</Text>
          </CardItem>
          <CardItem
            button
            onPress={() => navigation.navigate('Event', {userData})}
            style={styles.card}>
            <Icon name="calendar" />
            <Text>Events</Text>
          </CardItem>
          <CardItem button style={styles.card}>
            <Icon name="chatbubbles" />
            <Text>Chat</Text>
          </CardItem>
          <CardItem
            button
            onPress={() => navigation.navigate('Group', {userData})}
            style={styles.card}>
            <Icon name="contacts" />
            <Text>Groups</Text>
          </CardItem>
          <CardItem
            button
            onPress={() => navigation.navigate('Profile', {userData})}
            style={styles.card}>
            <Icon name="person" />
            <Text>Profile</Text>
          </CardItem>
        </Card>
      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#476B9E',
  },
  cardImg: {
    borderColor: '#e1e1e1',
    borderWidth: 2,
  },
  dashboardCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  card: {
    width: 150,
    height: 100,
    margin: 10,
    borderRadius: 20,
    borderColor: '#e1e1e1',
    borderWidth: 2,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
});

export default Home;
