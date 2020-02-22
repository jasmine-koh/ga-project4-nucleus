import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  ListItem,
  Footer,
  FooterTab,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';

// Displays lists created
const Listing = ({list, deleteList, navigation}) => {
  return (
    <ListItem
      style={styles.items}
      button
      onPress={() =>
        navigation.navigate('AddNewItem', {
          list,
        })
      }>
      <Text>{list.name}</Text>
      <Icon name="close" onPress={() => deleteList(list.id)} />
    </ListItem>
  );
};

const Lists = ({navigation}) => {
  const [lists, setLists] = useState({
    dataSource: [],
  });

  useEffect(() => {
    fetch('http://localhost:3000/lists')
      .then(res => res.json())
      .then(data => {
        setLists({
          dataSource: data,
        });
      });
  }, []);

  // TO FIX: DELETE FUNTION
  //   Function to delete a list
  const deleteList = id => {
    setLists(previousItem => {
      return previousItem.filter(item => item.id != id);
    });
  };

  console.log(lists.dataSource[0]);
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
          <Button transparent onPress={() => navigation.navigate('AddNewList')}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <Content padder>
        <FlatList
          data={lists.dataSource}
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
