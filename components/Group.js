import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {uuid} from 'uuidv4';

// Create group - where users type
const CreateNucleus = ({addNucleus}) => {
  const [text, setText] = useState('');

  const onChange = textValue => setText(textValue);

  return (
    <View>
      <TextInput
        placeholder="Create a new nucleus..."
        style={styles.input}
        onChangeText={onChange}
        value={text}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addNucleus(text);
          setText('');
        }}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ListNucleus = ({group, deleteNucleus, navigation}) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text
          onPress={() =>
            navigation.navigate('GroupDetails', {
              group,
            })
          }
          style={styles.listItemText}>
          {group.name}
        </Text>
        <Icon
          name="remove"
          size={20}
          color="firebrick"
          onPress={() => deleteNucleus(group.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

const Group = ({navigation}) => {
  const [group, setGroup] = useState([
    {id: uuid(), name: 'Family'},
    {id: uuid(), name: 'Work'},
  ]);

  //   Function to check and add a group
  const addNucleus = text => {
    if (!text) {
      Alert.alert('Error', 'Please enter a Nucleus', {text: 'Ok'});
    } else {
      setGroup(previousItem => {
        return [{id: uuid(), name: text}, ...previousItem];
      });
    }
  };

  //   Function to delete a Nucleus
  const deleteNucleus = id => {
    setGroup(previousItem => {
      return previousItem.filter(item => item.id != id);
    });
  };

  return (
    <View>
      <View style={styles.listsHeaderView}>
        <Text style={styles.listsHeader}>Groups</Text>
      </View>
      <FlatList
        data={group}
        renderItem={({item}) => (
          <ListNucleus
            group={item}
            navigation={navigation}
            deleteNucleus={deleteNucleus}
          />
        )}
      />
      <CreateNucleus addNucleus={addNucleus} />
    </View>
  );
};

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
  listsHeaderView: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  listsHeader: {
    fontSize: 30,
  },
});

export default Group;
