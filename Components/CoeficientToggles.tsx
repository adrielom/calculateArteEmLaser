import React, { useState } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { primaryColor, secondaryColor, greyColor, lightGreyColor, lightPrimaryColor, terciaryPrimaryColor } from '../utils/Colors'

export default function CoeficientToggles({ title, item, toggleChange }) {

    const [state, setState] = useState(item.state);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Switch
                style={styles.toggle}
                trackColor={{ false: lightGreyColor, true: secondaryColor }}
                thumbColor={state ? lightPrimaryColor : lightPrimaryColor}
                onValueChange={() => {
                    toggleChange(item.id)
                    setState(!state)
                }}
                value={state}
                ios_backgroundColor={lightGreyColor} />
            {console.log("item state is " + state)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '18%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10,
        paddingBottom: 10
    },
    title: {
        fontSize: 20,
        color: greyColor
    },
    toggle: {
        height: 20
    }
})
