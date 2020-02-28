import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';

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
  Form,
  Item,
  Label,
  Input,
} from 'native-base';

const EditGroupMember = ({route, navigation}) => {
  const {emails} = route.params;
  const {groupData} = route.params;
  const {groupID} = route.params;
  const {userData} = route.params;

  const [users, setUsers] = useState([]);

  const [userArray, setUserArray] = useState([]);

  const [update, setUpdate] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    getUsersFetch();
    existingUser();
    updateData();
  }, []);

  const existingUser = () => {
    groupData.members.map(user => {
      setUserArray(prevState => {
        return [...prevState, user];
      });
    });
  };

  const updateData = () => {
    name = groupData.name;
    description = groupData.description;
    setUpdate(prevState => {
      return {...prevState, name, description};
    });
  };

  const handleName = text => {
    name = text;
    setUpdate(prevState => {
      return {...prevState, name};
    });
  };

  const handleDescription = text => {
    description = text;
    setUpdate(prevState => {
      return {...prevState, description};
    });
  };

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

  const editGroupFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/groups/' + groupID, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: update.name,
        description: update.description,
        members: userArray,
      }),
    }).catch(err => {
      console.log('error msg: ', err);
    });
  };

  const handleSubmit = () => {
    editGroupFetch();
  };

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon name="home" />
          </Button>
        </Left>
        <Body>
          <Title>Edit Group</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              handleSubmit();
              navigation.navigate('Group', {userData});
            }}>
            <Icon name="checkmark" />
          </Button>
        </Right>
      </Header>
      <View>
        <Form>
          <Item fixedLabel>
            <Label>Name: </Label>
            <Input
              placeholder="Group name, of course!"
              value={update.name}
              onChangeText={handleName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Description: </Label>
            <Input
              placeholder="What?!"
              value={update.description}
              onChangeText={handleDescription}
            />
          </Item>
        </Form>
        <View style={styles.view}>
          <Text>Members: </Text>
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
          <Text>Add Members: </Text>
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
});

export default EditGroupMember;
