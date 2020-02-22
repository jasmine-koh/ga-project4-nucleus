import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';

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

const ListDetails = ({route, navigation}) => {
  const {list} = route.params;

  const [item, setItem] = useState([]);

  const [add, setAdd] = useState([]);

  useEffect(() => {
    getItemFetch();
  }, []);

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

  const deleteItemFetch = id => {
    fetch('http://localhost:3000/items/' + id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res));
  };

  const deleteItem = id => {
    deleteItemFetch(id);

    // TO FIX: show new list of items after delete
    setItem(previousItem => {
      return previousItem.filter(item => item.id != id);
    });
  };

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

    setAdd(prevItem => {
      return [newItem, ...prevItem];
    });
  };

  return (
    <Container style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{list.name}</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => navigation.navigate('AddNewEvent')}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <Content padder>
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
            <ListItem style={styles.items}>
              <Text>{item.name}</Text>
              <Text>{item._id}</Text>
              <Icon name="close" onPress={() => deleteItem(item._id)} />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ListDetails;
