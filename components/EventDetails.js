import React, {useState, useEffect} from 'react';
import {StyleSheet, Picker, View} from 'react-native';

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
} from 'native-base';

const EventDetails = ({route, navigation}) => {
  const {event} = route.params;
  const {userData} = route.params;

  const [detail, setDetail] = useState({});

  // toggle group on/off
  const [groupshow, setGroupShow] = useState(false);
  // groups available to user
  const [group, setGroup] = useState([]);
  // group selected to share
  const [selected, setSelected] = useState();
  // people who can see this list
  const [avail, setAvail] = useState([userData._id]);

  useEffect(() => {
    getEventDetailsFetch();
    getAvailableGroup();
  }, []);

  const handleName = text => {
    name = text;
    setDetail(prevState => {
      return {...prevState, name};
    });
  };

  const handleDescription = text => {
    description = text;
    setDetail(prevState => {
      return {...prevState, description};
    });
  };

  const handleLocation = text => {
    location = text;
    setDetail(prevState => {
      return {...prevState, location};
    });
  };

  const handleTime = text => {
    time = text;
    setDetail(prevState => {
      return {...prevState, time};
    });
  };

  const handleDate = text => {
    date = text;
    setDetail(prevState => {
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
    editEventFetch();
  };

  // get the event in database
  const getEventDetailsFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/events/' + event)
      .then(res => res.json())
      .then(data => setDetail(data));
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

  // update the event in database
  const editEventFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/events/' + event, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: detail.name,
        description: detail.description,
        location: detail.location,
        date: detail.date,
        time: detail.time,
        available: avail,
      }),
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(err => {
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
          <Title>{event.name}</Title>
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
              value={detail.name}
              onChangeText={handleName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Description: </Label>
            <Input
              placeholder="What?!"
              value={detail.description}
              onChangeText={handleDescription}
            />
          </Item>
          <Item fixedLabel>
            <Label>Location: </Label>
            <Input
              placeholder="Where?!"
              value={detail.location}
              onChangeText={handleLocation}
            />
          </Item>
          <Item fixedLabel>
            <Label>Time: </Label>
            <Input
              placeholder="Time?!"
              value={detail.time}
              onChangeText={handleTime}
            />
          </Item>
          <Item fixedLabel>
            <Label>Date: </Label>
            <Input
              placeholder="DD/MM/YYYY"
              value={detail.date}
              onChangeText={handleDate}
            />
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

export default EventDetails;
