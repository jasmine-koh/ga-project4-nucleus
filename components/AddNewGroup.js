import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

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

// ADD 'GROUP' COMPONENT
const AddNewGroup = ({route, navigation}) => {
  const {emails} = route.params;

  const {userData} = route.params;

  const [group, setGroup] = useState({
    name: '',
    description: '',
  });

  // Functions
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

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
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
              // handleSubmit();
              navigation.navigate('AddGroupMember', {emails, group, userData});
            }}>
            <Icon name="arrow-forward" />
          </Button>
        </Right>
      </Header>
      <View>
        <Form style={styles.form}>
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
  view: {
    backgroundColor: '#FEFEFE',
  },
  form: {
    paddingRight: 15,
  },
});

export default AddNewGroup;
