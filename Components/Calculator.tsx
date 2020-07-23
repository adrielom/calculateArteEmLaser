import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { StatusBar } from 'expo-status-bar';
import Card from './Card';
import DimensionsInput from './DimensionsInput';
import CoeficientToggles from './CoeficientToggles';

export default function Calculator() {
    return (
        <View style={styles.container}>
            <StatusBar />
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
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#d9f5fb',
        alignItems: 'center',
        justifyContent: 'flex-start',
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

