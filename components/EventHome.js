import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

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

const Events = ({route, navigation}) => {
  const {userData} = route.params;

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventFetch();
  }, []);

  // get all lists in database
  const getEventFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/events')
      .then(res => res.json())
      .then(data => {
        data.map(item => {
          item.available.map(user => {
            if (user == userData._id) {
              setEvents(prevState => {
                return [...prevState, item];
              });
            }
          });
        });
      });
  };

  //   Function to delete a list
  const deleteEventFetch = id => {
    fetch('https://nucleus-rn-backend.herokuapp.com/events/' + id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res));
  };

  const deleteEvent = id => {
    deleteEventFetch(id);
    setEvents(prevState => {
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
          <Title style={styles.headerText}>Events</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => navigation.push('AddNewEvent', {userData})}>
            <Icon style={styles.headerText} name="add" />
          </Button>
        </Right>
      </Header>
      <View style={styles.view}>
        <FlatList
          data={events}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.items}
              buttons
              onPress={() =>
                navigation.push('EventDetails', {
                  event: item._id,
                  userData,
                })
              }>
              <View style={styles.flatlistView}>
                <Text>{item.name}</Text>
                <Icon name="close" onPress={() => deleteEvent(item._id)} />
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

export default Events;
