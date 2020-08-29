import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

export interface ICard {
    height: string,
    width: string,
    title?: string,
    color?: string,
    radius?: number
    children?: {}
}


export default function Card({ height, width, title, children, color, radius }: ICard) {

    if (color != null) {
        return (
            <View style={[styles.shadow, cardStyle(height, width).card, { backgroundColor: color, borderRadius: radius }]}>
                {children}
            </View>
        )
    }
    else
        return (
            <View style={[styles.shadow, cardStyle(height, width).card]}>
                {children}
            </View>
        )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
})


const cardStyle = (height: string, width: string) => StyleSheet.create({
    card: {
        flex: 1,
        zIndex: 0,
        width,
        height,
        backgroundColor: 'white',
        borderRadius: 20,
        margin: '2%',
    }
})
