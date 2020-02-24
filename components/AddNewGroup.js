import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

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
  Switch,
} from 'native-base';

// ADD 'GROUP' COMPONENT
const AddNewGroup = ({navigation}) => {
  const [group, setGroup] = useState({
    name: '',
    description: '',
    members: [],
  });

  const handleName = text => {
    name = text;
    setGroup(prevState => {
      return {...prevState, name};
    });
  };

  const handleDescription = text => {
    description = text;
    setGroup(prevState => {
      return {...prevState, description};
    });
  };

  const addGroupFetch = () => {
    fetch('http://localhost:3000/groups', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: group.name,
        description: group.description,
      }),
    }).catch(err => {
      console.log('error msg: ', err);
    });
  };

  const handleSubmit = () => {
    addGroupFetch();
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
          <Title>New Group</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              handleSubmit();
              navigation.navigate('Group');
              // TO FIX: list page not refreshing when going back
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
              placeholder="Group name"
              autoCapitalize="words"
              onChangeText={handleName}
            />
          </Item>
          <Item fixedLabel>
            <Label>Description: </Label>
            <Input placeholder="Description" onChangeText={handleDescription} />
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

export default AddNewGroup;
