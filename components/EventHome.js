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

const Events = ({navigation}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventFetch();
  }, []);

  // get all lists in database
  const getEventFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/events')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data.map(item => {
          setEvents(prevState => {
            return [...prevState, item];
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
    setEvents([]);
    getEventFetch();
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
            onPress={() => navigation.navigate('AddNewEvent')}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <Content padder>
        <FlatList
          data={events}
          renderItem={({item}) => (
            <ListItem
              style={styles.items}
              buttons
              onPress={() =>
                navigation.navigate('EventDetails', {
                  event: item._id,
                })
              }>
              <Text>{item.name}</Text>
              <Icon name="close" onPress={() => deleteEvent(item._id)} />
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

export default Events;
