import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons';
import { primaryColor, secondaryColor, greyColor } from '../utils/Colors'

export interface IDimensionIput {
    title?: string
}

export default function DimensionsInput({ title }: IDimensionIput) {

    const [value, setValue] = useState(20)

    function ChangeInputValue(val: string) {
        let numVal = parseFloat(val)
        if (val === '' || numVal < 0)
            setValue(0);
        else if (numVal > 0)
            setValue(numVal);
    }

    function AddValue() {
        setValue(value + 1);
    }
    function SubValue() {
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
                <TouchableOpacity onPress={() => SubValue()} style={styles.roundButton}>
                    <Entypo style={styles.icon} name="minus" size={36} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => AddValue()} style={styles.roundButton}>
                    <AntDesign style={styles.icon} name="plus" size={36} />
                </TouchableOpacity>
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
    icon: {
        color: secondaryColor,
        fontWeight: 'bold'
    },
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#00000015',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 55,
        color: greyColor
    },
})
