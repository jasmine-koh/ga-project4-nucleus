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

const Lists = ({navigation}) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getListFetch();
  }, []);

  // get all lists in database
  const getListFetch = () => {
    fetch('http://localhost:3000/lists')
      .then(res => res.json())
      .then(data => {
        data.map(item => {
          setLists(prevState => {
            return [...prevState, item];
          });
        });
      });
  };

  //   Function to delete a list

  const deleteListFetch = id => {
    fetch('http://localhost:3000/lists/' + id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res));
  };

  const deleteList = id => {
    deleteListFetch(id);
    setLists([]);
    getListFetch();
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
          <Button transparent onPress={() => navigation.navigate('AddNewList')}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <Content padder>
        <FlatList
          data={lists}
          renderItem={({item}) => (
            <ListItem
              style={styles.items}
              button
              onPress={() =>
                navigation.navigate('ListDetails', {
                  list: item,
                })
              }>
              <Text>{item.name}</Text>
              <Icon name="close" onPress={() => deleteList(item._id)} />
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

export default Lists;
