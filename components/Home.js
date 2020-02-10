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
import {Card} from 'react-native-elements';

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
                    <Card title="Events" containerStyle={styles.card}></Card>
                    <Card title="List" containerStyle={styles.card}>
                        {/* possibe to onPress card? */}
                        <Button
                            onPress={() => navigation.navigate('Lists')}
                            title="View all"></Button>
                    </Card>
                </View>
                <View style={styles.dashboardCards}>
                    <Card title="Calendar" containerStyle={styles.card}></Card>
                    <Card title="Contact" containerStyle={styles.card}></Card>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    dashboardView: {
        flex: 1,
        padding: 100,
        alignItems: 'center',
        backgroundColor: 'azure',
    },
    dashboardText: {
        fontSize: 50,
    },
    dashboardCards: {
        flexDirection: 'row',
    },
    card: {
        width: 150,
        height: 150,
    },
});

export default Home;
