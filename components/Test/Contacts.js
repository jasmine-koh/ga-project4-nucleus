import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import Contacts from 'react-native-contacts';

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
  },
  contactName: {
    fontSize: 16,
    color: 'blue',
  },
});

class AllContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: null,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: ' This app would like to see your contacts',
      }).then(() => {
        this.getList();
      });
    } else if (Platform.OS === 'ios') {
      this.getList();
    }
  }

  getList = () => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.log('cannot access');
      } else {
        this.setState({contacts});
        console.log(contacts);
      }
    });
  };

  renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.contactName}>
        Name: {`${item.givenName} `} {item.familyName}
      </Text>
      {item.phoneNumbers.map(phone => (
        <Text style={styles.phones}>
          {phone.label} : {phone.number}
        </Text>
      ))}
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.contacts}
          renderItem={this.renderItem}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default AllContacts;
