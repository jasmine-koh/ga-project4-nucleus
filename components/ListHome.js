import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  List,
  ListItem,
  Footer,
  FooterTab,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';

import {uuid} from 'uuidv4';

// Displays lists created
const Listing = ({list, deleteList, navigation}) => {
  return (
    <List>
      <ListItem
        style={styles.items}
        button
        onPress={() =>
          navigation.navigate('Details', {
            list,
          })
        }>
        <Text>{list.name}</Text>
        <Icon name="close" onPress={() => deleteList(list.id)} />
      </ListItem>
    </List>
  );
};

const Lists = ({navigation}) => {
  const [lists, setLists] = useState([
    {id: uuid(), name: 'Grocery List'},
    {id: uuid(), name: 'Todo'},
  ]);

  //   Function to delete a list
  const deleteList = id => {
    setLists(previousItem => {
      return previousItem.filter(item => item.id != id);
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
          <Title>Lists</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate('AddList')}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <Content padder>
        <FlatList
          data={lists}
          renderItem={({item}) => (
            <Listing
              list={item}
              navigation={navigation}
              deleteList={deleteList}
            />
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

export default Lists;
