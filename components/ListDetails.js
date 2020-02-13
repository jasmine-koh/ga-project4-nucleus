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

// AddItemComponent - where users type
const AddItemComponent = ({addItem}) => {
  const [text, setText] = useState('');
  const onChange = textValue => setText(textValue);

  return (
    <View>
      <TextInput
        placeholder="Add a new item..."
        style={styles.input}
        onChangeText={onChange}
        value={text}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addItem(text);
          setText('');
        }}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Displays items in a list
const Items = ({item, deleteItem}) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.name}</Text>
        <Icon
          name="remove"
          size={20}
          color="firebrick"
          onPress={() => deleteItem(item.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

const ListDetails = ({route, navigation}) => {
  const {list} = route.params;

  const newItemsArray = [];

  const [items, setItems] = useState([
    {id: uuid(), list: 'Grocery List', name: 'Milk'},
    {id: uuid(), list: 'Grocery List', name: 'Eggs'},
    {id: uuid(), list: 'Todo', name: 'Tea'},
    {id: uuid(), list: 'Todo', name: 'Bread'},
  ]);

  // Function to check if item belongs in a list
  const isInList = () => {
    for (let i = 0; i < items.length; i++) {
      if (list.name == items[i].list) {
        newItemsArray.push(items[i]);
      }
    }
  };

  //   Function to check and add a list
  const addItem = text => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item', {text: 'Ok'});
    } else {
      setItems(previousItem => {
        return [{id: uuid(), list: list.name, name: text}, ...previousItem];
      });
    }
  };

  //   Function to delete a list
  const deleteItem = id => {
    setItems(previousItem => {
      return previousItem.filter(item => item.id != id);
    });
  };

  isInList();
  return (
    <View>
      <View style={styles.listDetailsHeaderView}>
        <Text style={styles.listDetailsHeader}>{list.name}</Text>
      </View>

      <FlatList
        data={newItemsArray}
        renderItem={({item}) => <Items item={item} deleteItem={deleteItem} />}
      />
      <AddItemComponent addItem={addItem} />
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

export default ListDetails;
