import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
  });

  const handleFirstName = text => {
    firstName = text;
    setProfile(prevState => {
      return {...prevState, firstName};
    });
  };

  const handleLastName = text => {
    lastName = text;
    setProfile(prevState => {
      return {...prevState, lastName};
    });
  };

  const handleContact = text => {
    contact = text;
    setProfile(prevState => {
      return {...prevState, contact};
    });
  };

  const handleEmail = text => {
    email = text;
    setProfile(prevState => {
      return {...prevState, email};
    });
  };

  return (
    <View style={styles.container}>
      <Text>First Name: </Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        autoCapitalize="words"
        onChangeText={handleFirstName}
      />

      <Text>Last Name: </Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        autoCapitalize="words"
        onChangeText={handleLastName}
      />

      <Text>Contact: </Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        autoCapitalize="none"
        onChangeText={handleContact}
      />

      <Text>Email: </Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        autoCapitalize="none"
        onChangeText={handleEmail}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => console.log(profile)}>
        <Text style={styles.submitButtonText}> Submit </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
});

export default UserProfile;
