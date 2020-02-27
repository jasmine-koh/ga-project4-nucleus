import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Footer,
  FooterTab,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';

const Lists = ({route, navigation}) => {
  const {userData} = route.params;

  const [lists, setLists] = useState([]);

  useEffect(() => {
    getListFetch();
    console.log('userData: ', userData);
    console.log('lists: ', lists);
  }, []);

  // get all lists in database
  const getListFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/lists')
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
    fetch('https://nucleus-rn-backend.herokuapp.com/lists/' + id, {
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
          <Button
            transparent
            onPress={() => navigation.navigate('AddNewList', {userData})}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <View>
        <FlatList
          data={lists}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ListDetails', {
                  list: item,
                  userData,
                })
              }>
              <View style={styles.flatlistView}>
                <Text>{item.name}</Text>
                <Icon name="close" onPress={() => deleteList(item._id)} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
        />
      </View>
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

export default Lists;
