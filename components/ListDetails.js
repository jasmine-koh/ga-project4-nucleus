import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';

// ADD 'ITEM into LIST' COMPONENT
const ListDetails = ({route, navigation}) => {
  const {list} = route.params;
  const {userData} = route.params;

  const [text, setText] = useState('');

  const [item, setItem] = useState([]);

  useEffect(() => {
    getItemFetch();
  }, []);

  // get all items in database
  const getItemFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/items')
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
    setItem(prevState => {
      return prevState.filter(item => item._id != id);
    });
  };

  // delete item in database
  const deleteItemFetch = id => {
    fetch('https://nucleus-rn-backend.herokuapp.com/items/' + id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res));
  };

  // ====== ADD ======
  // add item into database
  const addItemFetch = text => {
    fetch('https://nucleus-rn-backend.herokuapp.com/items', {
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
          <Button
            transparent
            onPress={() => navigation.push('Lists', {userData})}>
            <Icon name="checkmark" />
          </Button>
        </Right>
      </Header>
      <View>
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
            <TouchableOpacity>
              <View style={styles.flatlistView}>
                <Text>{item.name}</Text>
                <Icon name="close" onPress={() => deleteItem(item._id)} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
        />
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

export default ListDetails;
