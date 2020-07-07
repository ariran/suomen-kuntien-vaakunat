import React, { useState } from 'react';
import { StyleSheet, Button, Text, Switch, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen(props) {
    const [isRandom, setIsRandom] = useState(props.isRandom);
    const toggleSwitch = (e) => {
        setIsRandom(!isRandom);
        props.updateSettings('random', e);
    };

    return (
        <View style={styles.settingsContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Asetukset</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.settingText}>Satunnainen järjestys</Text>
                <Switch onValueChange={toggleSwitch} value={isRandom} />
            </View>
            <View style={styles.closeContainer}>
                <Button title='Sulje' onPress={props.closeDialog} />
            </View>
        </View>);
}

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    container: {
        width: 290,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#888',
        fontSize: 28,
        marginTop: 50,
        marginBottom: 30
    },
    settingText: {
        fontSize: 16,
        marginBottom: 10
    },
    closeContainer: {
        width: 290,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    }
});
