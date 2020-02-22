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
  let itemArray = [];

  const [text, setText] = useState('');

  const [list, setList] = useState({
    name: '',
    shared: false,
    group: '',
  });

  const [item, setItem] = useState({
    name: '',
    status: false,
    listName: '',
    listId: '',
  });

  const onChange = textValue => {
    setText(textValue);
  };

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

  const handleAddItem = text => {
    // temp storage of item for rendering purpose
    let newItem = {
      name: text,
      status: false,
      listName: list.name,
      listId: true,
    };
    itemArray.push(newItem);
  };

  const addItemFetch = () => {
    for (i = 0; i < itemArray.length; i++) {
      fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: itemArray.name,
          status: itemArray.status,
          listName: itemArray.listName,
          listId: itemArray.listId,
        }),
      }).catch(err => {
        console.log('error msg: ', err);
      });
    }
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
    addItemFetch();
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
          {/* TODO: navigate to new list on create */}
          <Button transparent onPress={() => navigation.navigate('List')}>
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
          <Item>
            <Label>Item: </Label>
            <Input
              placeholder="Add a new item into the list"
              autoCapitalize="words"
              onChangeText={onChange}
              value={text}
            />
            <Button
              transparent
              onPress={() => {
                handleAddItem(text, list);
                setText('');
              }}>
              <Icon name="add"></Icon>
            </Button>
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
