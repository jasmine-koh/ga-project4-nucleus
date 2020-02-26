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
  ListItem,
  CheckBox,
  Footer,
  FooterTab,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';

// ADD 'ITEM into LIST' COMPONENT
const GroupDetails = ({route, navigation}) => {
  const {group} = route.params;
  const {groupID} = route.params;
  const {emails} = route.params;

  const [groupData, setGroupData] = useState({});

  let userArray = [];

  useEffect(() => {
    getGroupFetch();
  }, []);

  // get all items in database
  const getGroupFetch = () => {
    fetch('https://nucleus-rn-backend.herokuapp.com/groups/' + groupID)
      .then(res => res.json())
      .then(data => setGroupData(data));
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
          <Title>{groupData.name}</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() =>
              navigation.navigate('EditGroupMember', {
                emails,
                groupData,
                groupID,
              })
            }>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <Content padded>
        <ListItem>
          <Text>Description: {groupData.description}</Text>
        </ListItem>
        <Text>Members: </Text>
        <FlatList
          data={groupData.members}
          renderItem={({item}) => (
            <ListItem>
              <Text>
                {item.firstName} {item.lastName}
              </Text>
            </ListItem>
          )}
        />
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

export default GroupDetails;
