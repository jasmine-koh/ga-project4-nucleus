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
  Switch,
} from 'native-base';

// ADD 'LIST' COMPONENT
const AddNewList = ({navigation}) => {
  const [list, setList] = useState({
    name: '',
    shared: false,
    group: '',
  });

  const handleListName = text => {
    name = text;
    setList(prevState => {
      return {...prevState, name};
    });
  };

  const handleSwitch = value => {
    shared = value;
    setList(prevState => {
      return {...prevState, shared};
    });
  };

  const addListFetch = () => {
    fetch('http://localhost:3000/lists', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: list.name,
        shared: list.shared,
        groups: list.groups,
      }),
    }).catch(err => {
      console.log('error msg: ', err);
    });
  };

  const handleSubmit = () => {
    addListFetch();
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
          <Title>New List</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              handleSubmit();
              navigation.navigate('Lists');
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
              placeholder="List Name"
              autoCapitalize="words"
              onChangeText={handleListName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Shared: </Label>
            <Input disabled="true"></Input>
            <Switch onValueChange={handleSwitch} value={list.shared} />
          </Item>
        </Form>
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

export default AddNewList;
