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
  const [events, setEvents] = useState({
    dataSource: [],
  });

  useEffect(() => {
    fetch('http://localhost:3000/events')
      .then(res => res.json())
      .then(data => {
        setEvents({
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
          data={events.dataSource}
          renderItem={({item}) => (
            <ListItem
              style={styles.items}
              buttons
              onPress={() =>
                navigation.navigate('AddNewEvent', {
                  event: item,
                })
              }>
              <Text>{item.name}</Text>
              <Icon name="close" onPress={() => deleteList(item.id)} />
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
