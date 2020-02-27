import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, View} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Text,
} from 'native-base';

// ADD 'GROUP' COMPONENT

const AddGroupMember = ({route, navigation}) => {
  const {emails} = route.params;
  const {group} = route.params;
  const {userData} = route.params;

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

  const removeMember = id => {
    setUserArray(prevState => {
      return prevState.filter(mems => mems._id != id);
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
    fetch('https://nucleus-rn-backend.herokuapp.com/groups', {
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
    <Container style={styles.container}>
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
              navigation.push('Group', {userData});
            }}>
            <Icon name="checkmark" />
          </Button>
        </Right>
      </Header>
      <View>
        <View>
          <Text>Members added: </Text>
          <FlatList
            data={userArray}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => removeMember(item._id)}>
                <View style={styles.flatlistView}>
                  <Text>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Icon name="close" />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
          />
        </View>
        <View>
          <Text>Available users: </Text>
          <FlatList
            data={users}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  addUser(item);
                }}>
                <View style={styles.flatlistView}>
                  <Text>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Icon name="add" />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
  },
  flatlistView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#e1e1e1',
    borderWidth: 1,
    padding: 30,
  },
});

export default AddGroupMember;
