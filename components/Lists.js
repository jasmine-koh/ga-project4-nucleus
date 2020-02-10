import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {uuid} from 'uuidv4';

import AddList from './AddList';

const Listing = ({item, deleteList}) => {
    return (
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemView}>
                <Text style={styles.listItemText}>{item.name}</Text>
                <Icon
                    name="remove"
                    size={20}
                    color="firebrick"
                    onPress={() => deleteList(item.id)}
                />
            </View>
        </TouchableOpacity>
    );
};

const Lists = () => {
    const [lists, setLists] = useState([
        {id: uuid(), name: 'Grocery List'},
        {id: uuid(), name: 'Todo'},
        {id: uuid(), name: 'Reminder'},
    ]);

    const addList = text => {
        if (!text) {
            Alert.alert('Error', 'Please enter an item', {text: 'Ok'});
        } else {
            setLists(previousItem => {
                return [{id: uuid(), name: text}, ...previousItem];
            });
        }
    };

    const deleteList = id => {
        setLists(previousItem => {
            return previousItem.filter(item => item.id != id);
        });
    };

    return (
        <View>
            <AddList addList={addList} />
            <FlatList
                data={lists}
                renderItem={({item}) => (
                    <Listing item={item} deleteList={deleteList} />
                )}
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
});

export default Lists;
