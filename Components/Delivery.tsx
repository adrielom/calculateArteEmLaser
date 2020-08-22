import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Dimensions, ActivityIndicator } from 'react-native'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Card from './Card';
import { secondaryColor, greyColor, lightPrimaryColor, lightGreyColor, darkPrimaryColor, lighterGreyColor } from '../utils/Colors';
import axios from 'axios'

const ADDRESS1 = 'Av. A 902, Conjunto Ceará, Fortaleza - CE'
const ADDRESS2 = 'Shopping Iguatemi 85 Fortaleza'
const URL = 'https://arte-em-laser-delivery.herokuapp.com/'

export interface IResponse {
    value: string,
    distance: string,
    time: string,
    error: Object,
    msg: string
}

export default function Delivery() {

    const [address1, setAddress1] = useState(ADDRESS1)
    const [address2, setAddress2] = useState(ADDRESS2)
    const [delivery, setDelivery] = useState(Object)
    const [calculate, setCalculate] = useState(false)
    const [loading, setLoading] = useState(false)

    const CalculateDelivery = async (add1: string, add2: string) => {
        if (calculate == false) setCalculate(true)
        setLoading(true)
        const res = await axios.get(URL, {
            params: {
                address1: add1,
                address2: add2
            }
        })
        setLoading(false)

        setDelivery(res.data)
        console.log(res)
    }

    const CalculateComponent = () => {
        console.log(`loading is ${loading}`)
        if (loading === false && calculate === false) {
            return (
                <>
                    <TouchableOpacity onPress={() => CalculateDelivery(address1, address2)} style={{ width: '100%', alignItems: 'center', alignContent: 'center' }} >
                        <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold' }}>Calcular</Text>
                    </TouchableOpacity>
                </>
            )
        }
        if (calculate && loading) {
            console.log('hey ' + calculate + ' ' + loading)
            return (<>
                <ActivityIndicator size='large' color="white" />
            </>)
        }
        if (calculate) {
            return (
                <>
                    <TouchableOpacity onPress={() => CalculateDelivery(address1, address2)} style={{ width: '100%', alignItems: 'center', alignContent: 'center' }} >
                        <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold' }}>Calcular</Text>
                    </TouchableOpacity>
                    <View style={[styles.lineBellow, { borderBottomColor: 'white', width: '85%', marginTop: '2%' }]} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '90%', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 35, color: 'white' }}>
                            R$
                        <Text style={styles.resultMoneyText} > {delivery.value}</Text>
                        </Text>
                        <MaterialIcons name="payment" size={25} color="white" style={{ paddingBottom: 10, marginLeft: '5%' }} />
                    </View>
                    <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-evenly', marginBottom: '5%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.secondaryInfoText}>
                                {delivery.distance}
                                <Text style={{ fontSize: 15 }}> km</Text>
                            </Text>
                            <FontAwesome5 name="map-marker-alt" size={16} color="white" style={{ marginLeft: '5%' }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.secondaryInfoText}>
                                {delivery.time}
                                <Text style={{ fontSize: 15 }}> min</Text>
                            </Text>
                            <MaterialIcons name="timer" size={25} color="white" style={{ marginLeft: '5%' }} />
                        </View>
                    </View>
                </>
            )
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={[styles.row]}>
                <Card height='100%' width='50%'>
                    <View style={styles.addressTitleContainer}>
                        <FontAwesome5 name="route" color={secondaryColor} size={20} style={{ marginLeft: '5%' }} />
                        <Text style={styles.addressTitle}>Ponto de Partida: </Text>
                    </View>
                    <View style={styles.lineBellow} />
                    <TextInput placeholder={ADDRESS1} style={styles.addressPlaceholder} />
                </Card>
            </View>

            <View style={[styles.row, { marginTop: '4%' }]}>
                <Card height='100%' width='50%'>
                    <View style={styles.addressTitleContainer}>
                        <FontAwesome5 name="motorcycle" color={secondaryColor} size={20} style={{ marginLeft: '5%' }} />
                        <Text style={styles.addressTitle}>Ponto de Entrega: </Text>
                    </View>
                    <View style={styles.lineBellow}
                    />
                    <TextInput placeholder={ADDRESS2} onChangeText={(e) => setAddress2(e)} style={[styles.addressPlaceholder]} placeholderTextColor={lightGreyColor} />
                </Card>
            </View>
            {/* 
            //! This is a history of deliveries
            <View style={styles.row}>
                <Card height='100%' width='50%'>
                    <FlatList></FlatList>
                </Card>
            </View> */}
            <View style={[styles.result]}>
                {
                    CalculateComponent()
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: lightPrimaryColor,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    row: {
        flexDirection: 'row',
        marginTop: '10%',
        height: 'auto',
        marginHorizontal: '5%'
    },
    result: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondaryColor,
    },
    secondaryInfoText: {
        color: 'white',
        paddingLeft: '5%',
        fontWeight: 'bold',
        fontSize: 25,
    },
    iconAddress: {
        alignContent: 'center',
        right: 20,
        justifyContent: 'flex-end',
        color: lighterGreyColor
    },
    resultMoneyText: {
        fontSize: 60,
        alignContent: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: 'white'
    },
    addressTitle: {
        marginLeft: '5%',
        textAlign: "left",
        alignItems: 'center',
        fontSize: 18,
        fontWeight: '900',
        color: greyColor
    },
    addressTitleContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    addressPlaceholder: {
        marginLeft: '5%',
        width: '90%',
        fontSize: 15,
        height: 30,
        flexWrap: 'nowrap'
    },
    lineBellow: {
        marginTop: '2%',
        borderBottomColor: lightGreyColor,
        borderBottomWidth: .5,
        width: '90%',
        justifyContent: 'center'
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

