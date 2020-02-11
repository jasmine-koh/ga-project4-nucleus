import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {uuid} from 'uuidv4';

import SingleList from './SingleList';

// AddListComponent - where users type
const AddListComponent = ({addList}) => {
  const [text, setText] = useState('');

  const onChange = textValue => setText(textValue);

  return (
    <View>
      <TextInput
        placeholder="Add a new list..."
        style={styles.input}
        onChangeText={onChange}
        value={text}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addList(text);
          setText('');
        }}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Displays lists created
const Listing = ({list, deleteList}) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{list.name}</Text>
        <Icon
          name="remove"
          size={20}
          color="firebrick"
          onPress={() => deleteList(list.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

const Lists = () => {
  const [lists, setLists] = useState([
    {id: uuid(), name: 'Grocery List'},
    {id: uuid(), name: 'Todo'},
  ]);

  //   Function to check and add a list
  const addList = text => {
    if (!text) {
      Alert.alert('Error', 'Please enter a list', {text: 'Ok'});
    } else {
      setLists(previousItem => {
        return [{id: uuid(), name: text}, ...previousItem];
      });
    }
  };

  //   Function to delete a list
  const deleteList = id => {
    setLists(previousItem => {
      return previousItem.filter(item => item.id != id);
    });
  };

  return (
    <View>
      <AddListComponent addList={addList} />
      <FlatList
        data={lists}
        renderItem={({item}) => <Listing list={item} deleteList={deleteList} />}
      />
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
});

export default Lists;
