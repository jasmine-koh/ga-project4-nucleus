import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
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
  }, []);

  // get all lists in database
  const getListFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/lists')
      .then(res => res.json())
      .then(data => {
        data.map(item => {
          item.available.map(user => {
            if (user == userData._id) {
              setLists(prevState => {
                return [...prevState, item];
              });
            }
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
    setLists(prevState => {
      return prevState.filter(mems => mems._id != id);
    });
  };

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon style={styles.headerText} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerText}>Lists</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => navigation.navigate('AddNewList', {userData})}>
            <Icon style={styles.headerText} name="add" />
          </Button>
        </Right>
      </Header>
      <View style={styles.view}>
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
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFEFE',
  },
  header: {
    backgroundColor: '#f8f8f8',
  },
  view: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#FEFEFE',
  },
  flatlistView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderColor: '#DCE4EF',
    borderWidth: 2,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    color: '#000000',
  },
});

export default Lists;
