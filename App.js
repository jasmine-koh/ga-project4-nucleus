import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AddGroupMember from './components/AddGroupMember';
import AddNewEvent from './components/AddNewEvent';
import AddNewGroup from './components/AddNewGroup';
import AddNewList from './components/AddNewList';
import EditGroupMember from './components/EditGroupMember';
import Event from './components/EventHome';
import EventDetails from './components/EventDetails';
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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="AddGroupMember"
          component={AddGroupMember}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNewEvent"
          component={AddNewEvent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNewGroup"
          component={AddNewGroup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNewList"
          component={AddNewList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditGroupMember"
          component={EditGroupMember}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Event"
          component={Event}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Group"
          component={Group}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GroupDetails"
          component={GroupDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lists"
          component={Lists}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ListDetails"
          component={ListDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
