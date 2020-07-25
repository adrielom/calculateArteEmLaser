import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { greyColor } from '../utils/Colors'
import RoundButton from './RoundButton';

export interface IDimensionIput {
    title?: string,
    val: any
}

const TOP_THRESHOLD = 1000
const BOTTOM_THRESHOLD = 0

export default function DimensionsInput({ title, val }: IDimensionIput) {

    const [value, setValue] = val

    function ChangeInputValue(val: string) {
        let numVal = parseFloat(val)
        if (val === '' || numVal < 0)
            setValue(0);
        else if (numVal > 0)
            setValue(numVal);
    }

    function AddValue() {
        if (value + 1 <= TOP_THRESHOLD)
            setValue(value + 1);
    }
    function SubValue() {
        if (value - 1 >= BOTTOM_THRESHOLD)
            setValue(value - 1);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
                <Text style={styles.cm}> cm</Text>
            </Text>
            <TextInput onChangeText={(e) => ChangeInputValue(e)} keyboardType="numeric" style={styles.value}>{value}</TextInput>
            <View style={styles.row}>
                <RoundButton SubValue={SubValue} name="minus" size={36} />
                <RoundButton SubValue={AddValue} name="plus" size={36} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        marginTop: '2%',
        flexDirection: 'row',
        marginHorizontal: '10%',
        justifyContent: 'space-around',
    },
    container: {
        height: 160
    },
    title: {
        marginTop: '5%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '800',
        color: greyColor
    },
    cm: {
        fontSize: 12
    },
    value: {
        textAlign: 'center',
        fontSize: 52,
        color: greyColor
    },
})
