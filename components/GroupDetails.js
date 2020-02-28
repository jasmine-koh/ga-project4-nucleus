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
      <Header style={styles.header}>
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
        <View style={styles.view}>
          <Text>Description: </Text>
          <View style={styles.flatlistView}>
            <Text>{groupData.description}</Text>
          </View>
        </View>
        <View style={styles.view}>
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
    backgroundColor: '#FEFEFE',
  },
  header: {
    backgroundColor: '#f8f8f8',
  },
  view: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#FEFEFE',
  },
  flatlistView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderColor: '#DCE4EF',
    borderWidth: 2,
    backgroundColor: '#f8f8f8',
  },
});

export default GroupDetails;
