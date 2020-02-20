import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Form,
  Item,
  Input,
  Label,
  Footer,
  FooterTab,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';

const UserProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
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
    fetch('http://localhost:3000/users', {
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
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon name="home" />
          </Button>
        </Left>
        <Body>
          <Title>Profile</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="settings" />
          </Button>
        </Right>
      </Header>
      <Content padded>
        <Form>
          <Item fixedLabel>
            <Label>First Name: </Label>
            <Input
              placeholder="First Name"
              autoCapitalize="words"
              onChangeText={handleFirstName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Last Name: </Label>
            <Input
              placeholder="Last Name"
              autoCapitalize="words"
              onChangeText={handleLastName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Contact: </Label>
            <Input
              placeholder="Mobile Number"
              autoCapitalize="none"
              onChangeText={handleContact}
            />
          </Item>
          <Item fixedLabel>
            <Label>Email: </Label>
            <Input
              placeholder="Email Address"
              autoCapitalize="none"
              onChangeText={handleEmail}
            />
          </Item>
        </Form>
        <Button
          block
          info
          onPress={() => {
            handleSubmit();
          }}>
          <Text>Submit</Text>
        </Button>
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
    backgroundColor: '#f8f8f8',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
});

export default UserProfile;
