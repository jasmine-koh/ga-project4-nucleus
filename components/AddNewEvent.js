import React, {useState} from 'react';
import {Platform, StyleSheet} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Title,
  Text,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';

import DateTimePicker from '@react-native-community/datetimepicker';

// ADD 'EVENT' COMPONENT
const AddNewEvent = ({navigation}) => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    group: '',
    location: '',
    time: '',
    date: '',
  });

  // toggle calendar on/off
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));

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

  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);

    const date = currentDate.toDateString();
    console.log(date);

    setEvent(prevState => {
      return {...prevState, date};
    });

    setShow(Platform.OS === 'ios' ? true : false);
  };

  const showDatePicker = () => {
    setShow(!show);
  };

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
      }),
    }).catch(err => {
      console.log('error msg: ', err);
    });
  };

  const handleSubmit = () => {
    addEventFetch();
  };

  return (
    <Container>
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
              navigation.navigate('Event');
            }}>
            <Icon name="checkmark" />
          </Button>
        </Right>
      </Header>
      <Content padded>
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
            <Input disabled={true} value={date} />
            <Button
              transparent
              onPress={showDatePicker}
              title="Show date picker!">
              <Icon name="calendar"></Icon>
            </Button>
          </Item>
        </Form>
        {show && (
          <DateTimePicker value={date} mode="date" onChange={handleDate} />
        )}
      </Content>
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

export default AddNewEvent;
