import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

<SafeAreaView style={styles.container}>
  <View style={styles.header}>
    <View></View>
    <Text style={styles.headerText}>Hello {data.name}</Text>
    <Button onPress={logout} title="Logout" />
    <View style={{alignItems: 'center'}}>
      <Image source={require('./img/logo.jpeg')}></Image>
    </View>
  </View>

  <View style={styles.body}>
    <ScrollView>
      <TouchableOpacity>
        <View style={styles.dashboardCards}>
          <Card title="Events" containerStyle={styles.card}></Card>
          <Card title="List" containerStyle={styles.card}>
            {/* possibe to onPress card? */}
            <Button
              onPress={() => navigation.navigate('Lists')}
              title="View all"></Button>
          </Card>

          <Card title="Location" containerStyle={styles.card}>
            {/* possibe to onPress card? */}
            <Button
              onPress={() => navigation.navigate('Location')}
              title="View all"></Button>
          </Card>
          <Card title="Chat" containerStyle={styles.card}></Card>

          <Card title="Groups" containerStyle={styles.card}>
            {/* possibe to onPress card? */}
            <Button
              onPress={() => navigation.navigate('Group')}
              title="View all"></Button>
          </Card>

          <Card title="Settings" containerStyle={styles.card}></Card>
        </View>
      </TouchableOpacity>
    </ScrollView>
  </View>
  <View style={styles.footer}>
    <Text>Footer goes here</Text>
  </View>
</SafeAreaView>;

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
    onPress={() => {
      //   console.log(profile);
      handleSubmit();
    }}>
    <Text style={styles.submitButtonText}> Submit </Text>
  </TouchableOpacity>
</View>;
