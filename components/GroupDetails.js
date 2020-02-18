import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {uuid} from 'uuidv4';

// Displays members in a nucleus
const Users = ({members, deleteMember}) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{members.name}</Text>
        <Icon
          name="remove"
          size={20}
          color="firebrick"
          onPress={() => deleteMember(members.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

const GroupDetails = ({route, navigation}) => {
  const {group} = route.params;

  const [members, setMembers] = useState([
    {id: uuid(), group: 'Family', name: 'Amy'},
    {id: uuid(), group: 'Family', name: 'Mary'},
    {id: uuid(), group: 'Work', name: 'Harry'},
    {id: uuid(), group: 'Work', name: 'Ron'},
  ]);

  //   Function to delete a list
  const deleteMember = id => {
    setMembers(previousItem => {
      return previousItem.filter(item => item.id != id);
    });
  };

  return (
    <View>
      <View style={styles.listDetailsHeaderView}>
        <Text style={styles.listDetailsHeader}>{group.name}</Text>
      </View>

      <FlatList
        data={members}
        renderItem={({item}) => (
          <Users members={item} deleteMember={deleteMember} />
        )}
      />
    </View>
  );
};

// CSS
const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
  },
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
  listDetailsHeaderView: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  listDetailsHeader: {
    fontSize: 30,
  },
});

export default GroupDetails;
