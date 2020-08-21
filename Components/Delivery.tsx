import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Dimensions } from 'react-native'
import { Entypo } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';
import Card from './Card';
import DimensionsInput from './DimensionsInput';
import CoeficientToggles from './CoeficientToggles';
import { secondaryColor, greyColor, lightPrimaryColor, lightGreyColor } from '../utils/Colors';
import RoundButton from './RoundButton';
import { Context } from './Context';
import { AddValue, SubValue } from '../services/generalMethods'



export default function Delivery() {

    return (
        <View style={styles.container}>
            <StatusBar />
            {/* <View style={styles.relativeRow}>
                <TouchableOpacity style={styles.threeDotsButton}>
                    <Entypo name="dots-three-vertical" size={threeDotsHeight} color={greyColor} />
                </TouchableOpacity>
            </View> */}
            <View style={[styles.row]}>
                <Card height='100%' width='50%'>
                </Card>
                <Card height='100%' width='50%' >
                </Card>
            </View>
            <View style={[styles.row]}>

            </View>
            <View style={[styles.row, styles.quantity,]}>
                <Card height='100%' width='100%'>
                    <Text style={styles.quantityText}>Quantidade</Text>
                    <View style={[styles.cardContent]}>

                    </View>
                </Card>
            </View>
            <View style={[styles.result]}>
                <Text style={styles.resultText}>R$ </Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    threeDotsButton: {
        marginTop: '8%',
        position: 'absolute',
        right: '3%',

    },
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: lightPrimaryColor,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    relativeRow: {
        width: '100%',
        height: 'auto',
        justifyContent: 'flex-start',
        position: 'relative'
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    quantity: {
        height: 'auto',
        marginTop: 25,
        alignContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginTop: '10%',
        height: 'auto',
        marginHorizontal: '5%'
    },
    result: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondaryColor,
        marginTop: '5%'
    },
    resultText: {
        fontSize: 80,
        alignContent: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: 'white'
    },
    quantityText: {
        marginTop: '2%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '800',
        color: greyColor
    },
    quantityTextValue: {
        fontSize: 25,
        fontWeight: '800',
        color: greyColor

    },
    text: {
        color: 'white'
    }
});

