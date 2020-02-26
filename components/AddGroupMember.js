import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Button,
  Icon,
  Text,
  ListItem,
} from 'native-base';

// ADD 'GROUP' COMPONENT

const AddGroupMember = ({route, navigation}) => {
  const {emails} = route.params;
  const {group} = route.params;

  const [users, setUsers] = useState([]);

  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    getUsersFetch();
  }, []);

  const addUser = user => {
    setUserArray(prevState => {
      return [...prevState, user];
    });
  };

  // Database
  // get all users in database and compare with contact list
  const getUsersFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/users')
      .then(res => res.json())
      .then(data => {
        data.map(item => {
          emails.map(email => {
            if (email.email == item.email) {
              setUsers(prevState => {
                return [...prevState, item];
              });
            }
          });
        });
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
        members: userArray,
      }),
    }).catch(err => {
      console.log('error msg: ', err);
    });
  };

  const handleSubmit = () => {
    addGroupFetch();
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
            }}>
            <Icon name="checkmark" />
          </Button>
        </Right>
      </Header>
      <Content padded>
        <Text>Members added: </Text>
        <FlatList
          data={userArray}
          renderItem={({item}) => (
            <ListItem>
              <Text>
                {item.firstName} {item.lastName}
              </Text>
            </ListItem>
          )}
        />
        <Text>Available users: </Text>
        <FlatList
          data={users}
          renderItem={({item}) => (
            <ListItem>
              <Text>
                {item.firstName} {item.lastName}
              </Text>
              <Button
                transparent
                onPress={() => {
                  addUser(item);
                }}>
                <Icon name="add" />
              </Button>
            </ListItem>
          )}
        />
      </Content>
    </Container>
  );
};

export default AddGroupMember;
