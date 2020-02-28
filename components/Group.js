import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';

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

import Contacts from 'react-native-contacts';

const Groups = ({route, navigation}) => {
  const {userData} = route.params;

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
          item.members.map(member => {
            if (member == userData._id) {
              setGroups(prevState => {
                return [...prevState, item];
              });
            }
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
    setGroups(prevState => {
      return prevState.filter(mems => mems._id != id);
    });
  };

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
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
            onPress={() =>
              navigation.navigate('AddNewGroup', {emails, userData})
            }>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <View style={styles.view}>
        <FlatList
          data={groups}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.items}
              buttons
              onPress={() =>
                navigation.navigate('GroupDetails', {
                  groupID: item._id,
                  emails,
                  userData,
                })
              }>
              <View style={styles.flatlistView}>
                <Text>{item.name}</Text>
                <Icon name="close" onPress={() => deleteGroup(item._id)} />
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
});

export default Groups;
