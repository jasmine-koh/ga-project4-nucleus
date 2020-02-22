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
  ListItem,
  CheckBox,
  Footer,
  FooterTab,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';

// ADD 'ITEM into LIST' COMPONENT
const ListDetails = ({route, navigation}) => {
  const {list} = route.params;

  const [text, setText] = useState('');

  const [item, setItem] = useState([]);

  useEffect(() => {
    getItemFetch();
  }, []);

  // get all items in database
  const getItemFetch = () => {
    fetch('http://localhost:3000/items')
      .then(res => res.json())
      .then(data => {
        data.map(item => {
          if (item.listId == list._id) {
            setItem(prevState => {
              return [item, ...prevState];
            });
          }
        });
      });
  };

  // ====== DELETE ========
  // delete item in state
  const deleteItem = id => {
    deleteItemFetch(id);
    setItem([]);
    getItemFetch();
  };

  // delete item in database
  const deleteItemFetch = id => {
    fetch('http://localhost:3000/items/' + id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res));
  };

  // ====== ADD ======
  // add item into database
  const addItemFetch = text => {
    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: text,
        status: false,
        listName: list.name,
        listId: list._id,
      }),
    }).catch(err => {
      console.log('error msg: ', err);
    });
    getItemFetch();
  };

  // ====== HANDLERS ======
  const onChange = textValue => {
    setText(textValue);
  };

  const handleAllAdd = text => {
    // handleAddItem(text);
    addItemFetch(text);
    setItem([]);
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
          <Button transparent>
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
              onChangeText={onChange}
              value={text}
            />
            <Button
              transparent
              onPress={() => {
                handleAllAdd(text);
                setText('');
              }}>
              <Icon name="add"></Icon>
            </Button>
          </Item>
        </Form>
        <FlatList
          data={item}
          renderItem={({item}) => (
            <ListItem>
              <CheckBox checked={item.status} />
              <Body>
                <Text>{item.name}</Text>
                <Text>{item._id}</Text>
              </Body>
              <Right>
                <Icon name="close" onPress={() => deleteItem(item._id)} />
              </Right>
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

export default ListDetails;
