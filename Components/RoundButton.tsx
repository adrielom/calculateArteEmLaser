import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons';
import { secondaryColor } from '../utils/Colors';

export interface IRoundButton {
    SubValue: Function,
    name: string,
    size: number
}

export default function RoundButton({ SubValue, name, size }: IRoundButton) {
    return (
        <TouchableOpacity onPress={() => SubValue()} style={styles.roundButton}>
            <Entypo style={styles.icon} name={name} size={size} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
})
