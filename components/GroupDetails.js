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
const GroupDetails = ({route, navigation}) => {
  const {groupID} = route.params;

  const [group, setGroup] = useState({});

  useEffect(() => {
    getGroupFetch();
  }, []);

  // get all items in database
  const getGroupFetch = () => {
    fetch('http://localhost:3000/groups/' + groupID)
      .then(res => res.json())
      .then(data => setGroup(data));
  };

  // ====== DELETE ========
  // delete member in state
  // const deleteItem = id => {
  //   deleteItemFetch(id);
  //   setItem([]);
  //   getItemFetch();
  // };

  // delete member in database
  // const deleteItemFetch = id => {
  //   fetch('http://localhost:3000/items/' + id, {
  //     method: 'DELETE',
  //   })
  //     .then(res => res.text()) // or res.json()
  //     .then(res => console.log(res));
  // };

  // ====== ADD ======
  // add member into database
  // const addItemFetch = text => {
  //   fetch('http://localhost:3000/items', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: text,
  //       status: false,
  //       listName: list.name,
  //       listId: list._id,
  //     }),
  //   }).catch(err => {
  //     console.log('error msg: ', err);
  //   });
  //   getItemFetch();
  // };

  // ====== HANDLERS ======
  // const onChange = textValue => {
  //   setText(textValue);
  // };

  // const handleAllAdd = text => {
  //   // handleAddItem(text);
  //   addItemFetch(text);
  //   setItem([]);
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
          <Title>{group.name}</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="checkmark" />
          </Button>
        </Right>
      </Header>
      <Content padded>
        <ListItem>
          <Text>Description: {group.description}</Text>
        </ListItem>
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

export default GroupDetails;
