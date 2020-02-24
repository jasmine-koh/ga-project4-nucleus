import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
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
} from 'native-base';

import DateTimePicker from '@react-native-community/datetimepicker';

const EventDetails = ({route, navigation}) => {
  const {event} = route.params;

  const [detail, setDetail] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    getEventDetailsFetch();
  }, []);

  // get the event in database
  const getEventDetailsFetch = () => {
    fetch('http://localhost:3000/events/' + event)
      .then(res => res.json())
      .then(data => setDetail(data));
  };

  // update the event in database
  const editEventFetch = () => {
    fetch('http://localhost:3000/events' + event, {
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
      }),
    }).catch(err => {
      console.log('error msg: ', err);
    });
  };

  const handleSubmit = () => {
    editEventFetch();
  };

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

  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const date = currentDate.toDateString();

    setDetail(prevState => {
      return {...prevState, date};
    });

    setShow(Platform.OS === 'ios' ? true : false);
  };

  const showDatePicker = () => {
    setShow(!show);
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
          <Title>{event.name}</Title>
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
            <Input value={detail.date} />
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

export default EventDetails;
