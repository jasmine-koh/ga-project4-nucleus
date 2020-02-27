import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, PermissionsAndroid, Platform} from 'react-native';

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

import Contacts from 'react-native-contacts';

const Groups = ({navigation}) => {
  const [groups, setGroups] = useState([]);

  const [emails, setEmails] = useState([]);

  useEffect(() => {
    getGroupFetch();
    permission();
  }, []);

  // get contact list from phone
  const permission = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: ' This app would like to see your contacts',
      }).then(() => {
        getList();
      });
    } else if (Platform.OS === 'ios') {
      getList();
    }
  };

  const getList = () => {
    Contacts.getAll((err, allContacts) => {
      if (err === 'denied') {
        console.log('cannot access');
      } else {
        allContacts.map(item => {
          item.emailAddresses.map(email => {
            setEmails(prevState => {
              return [...prevState, email];
            });
          });
        });
      }
    });
  };

  // get all groups in database
  const getGroupFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/groups')
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
    fetch('https://nucleus-rn-backend.herokuapp.com/groups/' + id, {
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
            onPress={() => navigation.navigate('AddNewGroup', {emails})}>
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
                  group: item,
                  groupID: item._id,
                  emails,
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
