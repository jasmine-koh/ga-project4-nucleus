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
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon style={styles.headerText} name="home" />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerText}>New Group</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              handleSubmit();
              navigation.push('Group', {userData});
            }}>
            <Icon style={styles.headerText} name="checkmark" />
          </Button>
        </Right>
      </Header>
      <View>
        <View style={styles.view}>
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
        <View style={styles.view}>
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
    backgroundColor: '#FEFEFE',
  },
  header: {
    backgroundColor: '#f8f8f8',
  },
  view: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#FEFEFE',
  },
  flatlistView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderColor: '#DCE4EF',
    borderWidth: 2,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    color: '#000000',
  },
});

export default AddGroupMember;
