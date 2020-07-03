import React, { useState } from 'react';
import { Image, StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
import { allEmblems } from './DataSource';

export default function Emblems(props) {
    const [currInd, setCurrInd] = useState(0);
    const [isVisible, setVisible] = useState(false);

    let communityName = isVisible ? allEmblems[currInd].name : "";

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setVisible(true)}>
                <Image source={{ uri: allEmblems[currInd].url }} style={styles.logo} />
            </TouchableOpacity>
            <View style={styles.communityNameLayout}>
                <Text style={styles.communityName}>{communityName}</Text>
            </View>
            <View style={styles.buttonsLayout}>
                <Button
                    title="Edellinen"
                    onPress={() => {
                        if (currInd > 0) {
                            setCurrInd(currInd - 1);
                        }
                        setVisible(false);
                    }}
                />
                <Button
                    title="Seuraava"
                    onPress={() => {
                        if (currInd < allEmblems.length - 1) {
                            setCurrInd(currInd + 1);
                        }
                        setVisible(false);
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    logo: {
        width: 290,
        height: 350,
        marginBottom: 10,
    },
    communityName: {
        color: '#888',
        fontSize: 42,
        marginBottom: 10
    },
    communityNameLayout: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonsLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
