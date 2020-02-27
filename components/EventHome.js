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
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Events</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => navigation.push('AddNewEvent', {userData})}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <View>
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

export default Events;
