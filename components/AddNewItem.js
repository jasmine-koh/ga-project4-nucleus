import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';

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

// ADD 'ITEM into LIST' COMPONENT
const AddNewItem = ({route, navigation}) => {
  const {list} = route.params;

  const [text, setText] = useState('');

  const [item, setItem] = useState([]);

  const [add, setAdd] = useState([]);

  useEffect(() => {
    getItemFetch();
  }, []);

  const onChange = textValue => {
    setText(textValue);
  };

  const handleAddItem = text => {
    // temp storage of item for rendering purpose
    let newItem = {
      name: text,
      status: false,
      listName: list.name,
      listId: list._id,
    };

    setItem(prevItem => {
      return [...prevItem, newItem];
    });

    setAdd(prevItem => {
      return [...prevItem, newItem];
    });
  };

  const addItemFetch = () => {
    for (i = 0; i < add.length; i++) {
      fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: add[i].name,
          status: add[i].status,
          listName: add[i].listName,
          listId: add[i].listId,
        }),
      }).catch(err => {
        console.log('error msg: ', err);
      });
    }
  };

  const getItemFetch = () => {
    fetch('http://localhost:3000/items')
      .then(res => res.json())
      .then(data => {
        data.map(item => {
          if (item.listId == list._id) {
            setItem(prevState => {
              return [...prevState, item];
            });
          }
        });
      });
  };

  const handleSubmit = () => {
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
          <Title>{list.name}</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => handleSubmit()}>
            <Icon name="checkmark" />
          </Button>
        </Right>
      </Header>
      <Content padded>
        <Form>
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
                handleAddItem(text);
                setText('');
              }}>
              <Icon name="add"></Icon>
            </Button>
          </Item>
        </Form>
        <FlatList
          data={item}
          renderItem={({item}) => (
            <Item>
              <Text>{item.name}</Text>
            </Item>
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

export default AddNewItem;
