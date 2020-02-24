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

const Groups = ({navigation}) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getGroupFetch();
  }, []);

  // get all lists in database
  const getGroupFetch = () => {
    fetch('http://localhost:3000/groups')
      .then(res => res.json())
      .then(data => {
        data.map(item => {
          setGroups(prevState => {
            return [...prevState, item];
          });
        });
      });
  };

  //   Function to delete a list
  const deleteGroupFetch = id => {
    fetch('http://localhost:3000/groups/' + id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res));
  };

  const deleteGroup = id => {
    deleteGroupFetch(id);
    setGroups([]);
    getGroupFetch();
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
          <Title>Groups</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => navigation.navigate('AddNewGroup')}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <Content padder>
        <FlatList
          data={groups}
          renderItem={({item}) => (
            <ListItem
              style={styles.items}
              buttons
              onPress={() =>
                navigation.navigate('GroupDetails', {
                  groupID: item._id,
                })
              }>
              <Text>{item.name}</Text>
              <Icon name="close" onPress={() => deleteGroup(item._id)} />
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

export default Groups;
