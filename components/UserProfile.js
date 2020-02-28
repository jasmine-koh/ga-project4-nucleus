import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';

// NOTE: think of a way to update userData with new details

const UserProfile = ({route, navigation}) => {
  const {userData} = route.params;

  const [profile, setProfile] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    contact: userData.contact,
    email: userData.email,
  });

  const handleFirstName = text => {
    firstName = text;
    setProfile(prevState => {
      return {...prevState, firstName};
    });
  };

  const handleLastName = text => {
    lastName = text;
    setProfile(prevState => {
      return {...prevState, lastName};
    });
  };

  const handleContact = text => {
    contact = text;
    setProfile(prevState => {
      return {...prevState, contact};
    });
  };

  const handleEmail = text => {
    email = text;
    setProfile(prevState => {
      return {...prevState, email};
    });
  };

  const handleSubmit = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: profile.firstName,
        lastName: profile.lastName,
        contact: profile.contact,
        email: profile.email,
      }),
    }).catch(err => {
      console.log('error msg: ', err);
    });
  };

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon style={styles.headerText} name="home" />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerText}>Profile</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon style={styles.headerText} name="add" />
          </Button>
        </Right>
      </Header>
      <View>
        <Form style={styles.form}>
          <Item fixedLabel>
            <Label>First Name: </Label>
            <Input
              placeholder="First Name"
              autoCapitalize="words"
              value={profile.firstName}
              onChangeText={handleFirstName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Last Name: </Label>
            <Input
              placeholder="Last Name"
              autoCapitalize="words"
              value={profile.lastName}
              onChangeText={handleLastName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Contact: </Label>
            <Input
              placeholder="Mobile Number"
              autoCapitalize="none"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              value={String(profile.contact)}
              onChangeText={handleContact}
            />
          </Item>
          <Item fixedLabel>
            <Label>Email: </Label>
            <Input
              placeholder="Email Address"
              autoCapitalize="none"
              value={profile.email}
              onChangeText={handleEmail}
            />
          </Item>
        </Form>
        <Button
          style={styles.submitButton}
          onPress={() => {
            handleSubmit();
            navigation.navigate('Home');
          }}>
          <Text>Submit</Text>
        </Button>
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
  form: {
    paddingRight: 15,
  },
  submitButton: {
    backgroundColor: '#DCE4EF',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
  },
  headerText: {
    color: '#000000',
  },
});

export default UserProfile;
