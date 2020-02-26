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
  Form,
  Item,
  Label,
  Input,
} from 'native-base';

const EditGroupMember = ({route, navigation}) => {
  const {emails} = route.params;
  const {groupData} = route.params;
  const {groupID} = route.params;

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
    <Container>
      <Header>
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
              navigation.navigate('Group');
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
        <Text>Members: </Text>
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
        <Text>Add Members: </Text>
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

export default EditGroupMember;
