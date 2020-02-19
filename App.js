import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Group from './components/Group';
import GroupDetails from './components/GroupDetails';
import Home from './components/Home';
import Lists from './components/ListHome';
import ListDetails from './components/ListDetails';
import Location from './components/Location';
import Login from './components/Login';
import Profile from './components/UserProfile';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Group" component={Group} />
        <Stack.Screen name="GroupDetails" component={GroupDetails} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Lists" component={Lists} />
        <Stack.Screen name="Details" component={ListDetails} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
