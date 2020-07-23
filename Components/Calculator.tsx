import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';
import Card from './Card';
import DimensionsInput from './DimensionsInput';
import CoeficientToggles from './CoeficientToggles';
import { secondaryColor, greyColor, lightPrimaryColor, lightGreyColor } from '../utils/Colors';

const threeDotsHeight = 24;

export default function Calculator() {
    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.relativeRow}>
                <TouchableOpacity style={styles.threeDotsButton}>
                    <Entypo name="dots-three-vertical" style={styles.threeDots} size={threeDotsHeight} color={greyColor} />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Card height='100%' width='50%'>
                    <DimensionsInput title="Largura" />
                </Card>
                <Card height='100%' width='50%' >
                    <DimensionsInput title="Altura" />
                </Card>
            </View>
            <View style={styles.row}>
                <Card height='60%' width='100%'>
                    <CoeficientToggles title="Corte" />
                    <CoeficientToggles title="Vazado" />
                    <CoeficientToggles title="Rebaixado" />
                    <CoeficientToggles title="Gravação" />
                </Card>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    threeDots: {
    },
    threeDotsButton: {
        marginTop: '8%',
        position: 'absolute',
        right: '3%',
        maxHeight: threeDotsHeight

    },
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#d9f5fb',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    relativeRow: {
        width: '100%',
        height: 20,
        justifyContent: 'flex-start',
        position: 'relative'
    },
    row: {
        flexDirection: 'row',
        marginTop: '10%',
        marginHorizontal: '5%'
    },
    text: {
        color: 'white'
    }
});

