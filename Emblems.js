import React, { useState } from 'react';
import { Image, StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import { allEmblems } from './DataSource';
import SettingsScreen from './SettingsScreen'

const prevStackMaxSize = 3;

export default function Emblems(props) {
    const [isReady, setIsReady] = useState(false);
    const [useRandom, setUseRandom] = useState(true);
    const [currInd, setCurrInd] = useState(getRandomIndex());
    const [prevStack, setPrevStack] = useState([]);
    const [prevButtonEnabled, setPrevButtonEnabled] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);

    const getPrevious = () => {
        if (useRandom) {
            if (prevStack.length > 0) {
                setCurrInd(prevStack.pop());
            }
            if (prevStack.length === 0) {
                setPrevButtonEnabled(false);
            }
        } else if (currInd > 0) {
            setCurrInd(currInd - 1);
        }
        setVisible(false);
    }

    const getNext = () => {
        if (useRandom) {
            if (prevStack.length >= prevStackMaxSize) {
                prevStack.shift();
            }
            prevStack.push(currInd);
            setPrevButtonEnabled(true);
            setCurrInd(getRandomIndex());
        } else if (currInd < allEmblems.length - 1) {
            setCurrInd(currInd + 1);
        }
        setVisible(false);
    }

    const updateSettings = (setting, value) => {
        switch (setting) {
            case 'random':
                setUseRandom(value);
                if (!value) {
                    setPrevButtonEnabled(true);
                }
                break;
        }
    }

    const closeSettingsDialog = () => { setSettingsVisible(false) }

    const cacheResourcesAsync = async () => {
        const images = [require('./assets/settings.jpg')];
        const cacheImages = images.map(image => {
            return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages);
    }

    let communityName = isVisible ? allEmblems[currInd].name : "";

    if (!isReady) {
        return (
            <AppLoading
                startAsync={cacheResourcesAsync}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
            />
        );
    }

    return settingsVisible
        ? <SettingsScreen updateSettings={updateSettings} closeDialog={closeSettingsDialog} isRandom={useRandom} />
        : (<View style={styles.container}>
            <TouchableOpacity activeOpacity={0.2} style={styles.settingsContainer} onPress={() => setSettingsVisible(true)}>
                <Image source={require('./assets/settings.jpg')} style={styles.settings} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setVisible(true)}>
                <Image source={{ uri: allEmblems[currInd].url }} style={styles.emblem} resizeMethod="scale" resizeMode="contain" />
            </TouchableOpacity>
            <View style={styles.communityNameLayout}>
                <Text style={styles.communityName}>{communityName}</Text>
            </View>
            <View style={styles.buttonsLayout}>
                <Button
                    title="Edellinen"
                    disabled={!prevButtonEnabled}
                    onPress={getPrevious}
                />
                <Button
                    title="Seuraava"
                    onPress={getNext}
                />
            </View>
        </View>);
}

function getRandomIndex(currInd) {
    let newInd = 0;
    do {
        newInd = Math.floor(Math.random() * allEmblems.length);
    } while (newInd == currInd);
    return newInd;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    settingsContainer: {
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    emblem: {
        width: 270,
        height: 330,
        marginBottom: 10,
    },
    settings: {
        width: 20,
        height: 20,
        marginBottom: 20,
    },
    communityName: {
        color: '#888',
        fontSize: 28,
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
