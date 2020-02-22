import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

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
  Textarea,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';

// ADD 'EVENT' COMPONENT
const AddNewEvent = ({navigation}) => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    group: '',
    location: '',
    date: '',
    time: '',
  });

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

  const addEventFetch = () => {
    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: event.name,
        description: event.description,
        location: event.location,
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
              placeholder="Name of event"
              autoCapitalize="words"
              onChangeText={handleEventName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Description: </Label>
            <Input
              numberOfLines={5}
              multiline={true}
              placeholder="Example: Dress code, timing, etc"
              onChangeText={handleDescription}
            />
          </Item>
          <Item fixedLabel>
            <Label>Location: </Label>
            <Input
              numberOfLines={5}
              multiline={true}
              placeholder="Example: Address"
              onChangeText={handleLocation}
            />
          </Item>
        </Form>
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
