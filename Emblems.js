import React, { useState } from 'react';
import { Image, StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
import { allEmblems } from './DataSource';

const prevStackMaxSize = 3;

export default function Emblems(props) {
    const useRandom = true;
    const [currInd, setCurrInd] = useState(getRandomIndex());
    const [prevStack, setPrevStack] = useState([]);
    const [prevButtonEnabled, setPrevButtonEnabled] = useState(false);
    const [isVisible, setVisible] = useState(false);

    const getPrevious = () => {
        if (useRandom) {
            if (prevStack.length > 0) {
                setCurrInd(prevStack.pop());
                console.log("After pop: " + prevStack)
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
                console.log("After shift: " + prevStack)
            }
            prevStack.push(currInd);
            console.log("After push: " + prevStack)
            setPrevButtonEnabled(true);
            setCurrInd(getRandomIndex());
        } else if (currInd < allEmblems.length - 1) {
            setCurrInd(currInd + 1);
        }
        setVisible(false);
    }

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
                    disabled={!prevButtonEnabled}
                    onPress={getPrevious}
                />
                <Button
                    title="Seuraava"
                    onPress={getNext}
                />
            </View>
        </View>
    );
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
