import React, {useState, useEffect} from 'react';
import {View, Picker, StyleSheet} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Title,
  Switch,
} from 'native-base';

// ADD 'LIST' COMPONENT
const AddNewList = ({route, navigation}) => {
  const {userData} = route.params;

  // groups available to user
  const [group, setGroup] = useState([]);

  // group selected to share
  const [selected, setSelected] = useState();

  // people who can see this list
  const [avail, setAvail] = useState([userData._id]);

  const [list, setList] = useState({
    name: '',
    shared: false,
    group: '',
  });

  useEffect(() => {
    getAvailableGroup();
  }, []);

  // FUNCIONS
  const handleListName = text => {
    name = text;
    setList(prevState => {
      return {...prevState, name};
    });
  };

  const handleSwitch = value => {
    shared = value;
    setList(prevState => {
      return {...prevState, shared};
    });
  };

  const handleChange = itemValue => {
    setSelected(itemValue);

    group.map(item => {
      if (item.name == itemValue) {
        setAvail(item.members);
      }
    });
  };

  const handleSubmit = () => {
    addListFetch();
  };

  // get groups avaiable to user from database
  const getAvailableGroup = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/groups')
      .then(res => res.json())
      .then(data => {
        data.map(item => {
          item.members.map(member => {
            if (member == userData._id) {
              setGroup(prevState => {
                return [...prevState, item];
              });
            }
          });
        });
      });
  };

  // add list to database
  const addListFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/lists', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: list.name,
        shared: list.shared,
        groups: list.groups,
        available: avail,
      }),
    }).catch(err => {
      console.log('error msg: ', err);
    });
  };

  return (
    <Container style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon style={styles.headerText} name="home" />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerText}>New List</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              handleSubmit();
              navigation.push('Lists', {userData});
            }}>
            <Icon style={styles.headerText} name="checkmark" />
          </Button>
        </Right>
      </Header>
      <View>
        <Form style={styles.form}>
          <Item fixedLabel>
            <Label>Name: </Label>
            <Input
              placeholder="List Name"
              autoCapitalize="words"
              onChangeText={handleListName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Shared: </Label>
            <Input disabled="true"></Input>
            <Switch onValueChange={handleSwitch} value={list.shared} />
          </Item>
        </Form>
        {/* Display the group in screen when shared is true. */}
        {list.shared ? (
          <Picker
            mode="dropdown"
            selectedValue={selected}
            onValueChange={(itemValue, itemIndex) => {
              handleChange(itemValue);
            }}>
            {group.map(item => {
              return (
                <Picker.Item
                  label={item.name}
                  value={item.name}
                  key={item._id}
                />
              );
            })}
          </Picker>
        ) : null}
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
  form: {
    paddingRight: 15,
  },
  headerText: {
    color: '#000000',
  },
});

export default AddNewList;
