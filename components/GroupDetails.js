import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';

// ADD 'ITEM into LIST' COMPONENT
const GroupDetails = ({route, navigation}) => {
  // const {group} = route.params;
  const {groupID} = route.params;
  const {emails} = route.params;
  const {userData} = route.params;

  const [groupData, setGroupData] = useState({});

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
    <Container style={styles.container}>
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
                userData,
              })
            }>
            <Icon name="create" />
          </Button>
        </Right>
      </Header>
      <View>
        <View>
          <Text>Description: {groupData.description}</Text>
        </View>
        <View>
          <Text>Members: </Text>
          <FlatList
            data={groupData.members}
            renderItem={({item}) => (
              <View style={styles.flatlistView}>
                <Text>
                  {item.firstName} {item.lastName}
                </Text>
              </View>
            )}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#e1e1e1',
    borderWidth: 1,
    padding: 30,
  },
});

export default GroupDetails;
