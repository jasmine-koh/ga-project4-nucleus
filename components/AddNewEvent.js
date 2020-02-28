import React, {useState, useEffect} from 'react';
import {Picker, View, StyleSheet} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';

// ADD 'EVENT' COMPONENT
const AddNewEvent = ({route, navigation}) => {
  const {userData} = route.params;

  const [event, setEvent] = useState({
    name: '',
    description: '',
    group: '',
    location: '',
    time: '',
    date: '',
  });

  // toggle group on/off
  const [groupshow, setGroupShow] = useState(false);
  // groups available to user
  const [group, setGroup] = useState([]);
  // group selected to share
  const [selected, setSelected] = useState();
  // people who can see this list
  const [avail, setAvail] = useState([userData._id]);

  useEffect(() => {
    getAvailableGroup();
  }, []);

  // FUNCTIONS
  const handleEventName = text => {
    name = text;
    setEvent(prevState => {
      return {...prevState, name};
    });
  };

  const handleDescription = text => {
    description = text;
    setEvent(prevState => {
      return {...prevState, description};
    });
  };

  const handleLocation = text => {
    location = text;
    setEvent(prevState => {
      return {...prevState, location};
    });
  };

  const handleTime = text => {
    time = text;
    setEvent(prevState => {
      return {...prevState, time};
    });
  };

  const handleDate = text => {
    date = text;
    setEvent(prevState => {
      return {...prevState, date};
    });
  };

  // toggle group on/off
  const showGroupPicker = () => {
    setGroupShow(!groupshow);
  };

  // group selected
  const handleChange = itemValue => {
    setSelected(itemValue);

    // members in group
    group.map(item => {
      if (item.name == itemValue) {
        setAvail(item.members);
      }
    });
  };

  const handleSubmit = () => {
    addEventFetch();
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

  // add event in database
  const addEventFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/events', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: event.name,
        description: event.description,
        location: event.location,
        date: event.date,
        time: event.time,
        group: selected,
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
            <Icon name="home" />
          </Button>
        </Left>
        <Body>
          <Title>New Event</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              handleSubmit();
              navigation.push('Event', {userData});
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
              placeholder="Event name, of course!"
              onChangeText={handleEventName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Description: </Label>
            <Input placeholder="What?!" onChangeText={handleDescription} />
          </Item>
          <Item fixedLabel>
            <Label>Location: </Label>
            <Input placeholder="Where?!" onChangeText={handleLocation} />
          </Item>
          <Item fixedLabel>
            <Label>Time: </Label>
            <Input placeholder="Time?!" onChangeText={handleTime} />
          </Item>
          <Item fixedLabel>
            <Label>Date: </Label>
            <Input placeholder="DD/MM/YYYY" onChangeText={handleDate} />
          </Item>
          <Item fixedLabel>
            <Label>Group: </Label>
            <Input value={selected} />
            <Button
              transparent
              onPress={showGroupPicker}
              title="Show group picker!">
              <Icon name="people"></Icon>
            </Button>
          </Item>
        </Form>
        {/* Display the group in screen when show is true. */}
        {groupshow ? (
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
    backgroundColor: '#f8f8f8',
  },
});

export default AddNewEvent;
