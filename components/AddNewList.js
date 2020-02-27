import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Picker,
  StyleSheet,
} from 'react-native';

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
  Footer,
  FooterTab,
  Button,
  Icon,
  Title,
  Text,
  Switch,
} from 'native-base';

// ADD 'LIST' COMPONENT
const AddNewList = ({route, navigation}) => {
  const {userData} = route.params;

  const [group, setGroup] = useState([]);

  const [selected, setSelected] = useState();

  const [availMem, setAvailMem] = useState([]);

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

  const updateAvailArray = () => {
    // find members in selected group
  };

  const handleChange = itemValue => {
    setSelected(itemValue);

    for (i = 0; i < group.length; i++) {
      if (group[i].name == selected) {
        group[i].members.map(member => {
          setAvailMem(prevState => {
            return [...prevState, member];
          });
        });
      }
    }
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
        available: availMem,
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
            <Icon name="home" />
          </Button>
        </Left>
        <Body>
          <Title>New List</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              handleSubmit();
              navigation.navigate('Lists');
              // TO FIX: list page not refreshing when going back
            }}>
            <Icon name="checkmark" />
          </Button>
        </Right>
      </Header>
      <View>
        <Form>
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
        {// Display the group in screen when shared is true.
        list.shared ? (
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
  flatlistView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#e1e1e1',
    borderWidth: 1,
    padding: 30,
  },
});

export default AddNewList;
