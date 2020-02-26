import React, {useState, useEffect} from 'react';
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

// ADD 'GROUP' COMPONENT
const AddNewGroup = ({route, navigation}) => {
  const {emails} = route.params;

  let userArray = [];

  const [group, setGroup] = useState({
    name: '',
    description: '',
  });

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

  const addUser = user => {
    userArray.push(user);
    console.log(user);
  };

  const handleSubmit = () => {
    addGroupFetch();
  };

  // const addGroupFetch = () => {
  //   fetch('http://localhost:3000/groups', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: group.name,
  //       description: group.description,
  //       members: userArray,
  //     }),
  //   }).catch(err => {
  //     console.log('error msg: ', err);
  //   });
  // };

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
              // handleSubmit();
              navigation.navigate('AddGroupMember', {emails, group});
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
        {/* <AddGroupMember emails={emails} addUser={addUser} /> */}
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
