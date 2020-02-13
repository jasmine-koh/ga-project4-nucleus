import 'react-native-gesture-handler';

import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

import {Tile} from 'react-native-elements';

const Home = ({navigation}) => {
  return (
    <View style={styles.dashboardView}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={{width: 300, padding: 80}}
          source={{
            uri: 'https://i.imgur.com/xvtm1e6.jpg',
          }}></Image>
        <Text style={styles.dashboardText}>Nucleus</Text>
      </View>

      <TouchableOpacity>
        <View style={styles.dashboardCards}>
          <Tile title="Groups" containerStyle={styles.card} />
          <Tile
            title="List"
            containerStyle={styles.card}
            onPress={() => navigation.navigate('Lists')}
          />
          <Tile title="Events" containerStyle={styles.card} />
          <Tile title="Location" containerStyle={styles.card} />
          <Tile title="Contact" containerStyle={styles.card} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardView: {
    paddingTop: 100,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  dashboardText: {
    fontSize: 50,
  },
  dashboardCards: {
    paddingTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  card: {
    width: 150,
    height: 150,
  },
});

export default Home;
