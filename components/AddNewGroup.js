import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, Platform, PermissionsAndroid} from 'react-native';

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
  ListItem,
  CheckBox,
} from 'native-base';

import Contacts from 'react-native-contacts';

// ADD 'GROUP' COMPONENT
const AddNewGroup = ({navigation}) => {
  const [group, setGroup] = useState({
    name: '',
    description: '',
    members: [],
  });

  const [contacts, setContacts] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersFetch();
    permission();
  }, []);

  // get contact list from phone
  const permission = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: ' This app would like to see your contacts',
      }).then(() => {
        getList();
      });
    } else if (Platform.OS === 'ios') {
      getList();
    }
  };

  const getList = () => {
    Contacts.getAll((err, allContacts) => {
      if (err === 'denied') {
        console.log('cannot access');
      } else {
        console.log(users);
        allContacts.map(item => {
          setContacts(prevState => {
            return [...prevState, item];
          });
        });
      }
    });
  };

  // Functions
  const handleName = text => {
    name = text;
    setGroup(prevState => {
      return {...prevState, name};
    });
  };

  const handleDescription = text => {
    description = text;
    setGroup(prevState => {
      return {...prevState, description};
    });
  };

  const handleSubmit = () => {
    addGroupFetch();
  };

  // Database

  // get all users in database
  const getUsersFetch = () => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      });
  };

  const addGroupFetch = () => {
    fetch('http://localhost:3000/groups', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: group.name,
        description: group.description,
      }),
    }).catch(err => {
      console.log('error msg: ', err);
    });
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon name="home" />
          </Button>
        </Left>
        <Body>
          <Title>New Group</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              handleSubmit();
              navigation.navigate('Group');
              // TO FIX: list page not refreshing when going back
            }}>
            <Icon name="checkmark" />
          </Button>
        </Right>
      </Header>
      <Content padded>
        <Form>
          <Item fixedLabel>
            <Label>Name: </Label>
            <Input
              placeholder="Group name"
              autoCapitalize="words"
              onChangeText={handleName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Description: </Label>
            <Input placeholder="Description" onChangeText={handleDescription} />
          </Item>
        </Form>
        <FlatList
          data={contacts}
          renderItem={({item}) => (
            <ListItem>
              <CheckBox />
              <Body>
                <Text>
                  {`${item.givenName} `}
                  {item.familyName}
                </Text>
              </Body>
            </ListItem>
          )}
        />
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
  itemContainer: {
    margin: 10,
  },
  contactName: {
    fontSize: 16,
    color: 'blue',
  },
});

export default AddNewGroup;
