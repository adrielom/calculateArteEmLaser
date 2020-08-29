import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Dimensions, ActivityIndicator, AsyncStorage, Keyboard } from 'react-native'
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { StatusBar } from 'expo-status-bar';
import Card from './Card';
import { secondaryColor, greyColor, lightPrimaryColor, lightGreyColor, darkPrimaryColor, lighterGreyColor, lighterPrimaryColor, terciaryPrimaryColorLighter } from '../utils/Colors';
import axios from 'axios'
import DeliveryHistoryItem, { IDeliveryItem } from './DeliveryHistoryItem';
import { Context } from './Context';

const ADDRESS1 = 'Av. A 902, Conjunto Ceará, Fortaleza - CE'
const ADDRESS2 = 'Rua Exemplo, 85, Fortaleza - CE, 6045348-23'
const URL = 'https://arte-em-laser-delivery.herokuapp.com/'

export interface IResponse {
    value: string,
    distance: string,
    time: string,
    error: Object,
    msg: string,
}

export default function Delivery() {
    let dates = Array()

    const getTopElement = () => {
        let dates: any = history
        dates.sort(function (a, b) { return a - b });
        return dates[0].id
    }

    const saveHistory = async (historyReturn: string) => {
        try {
            await AsyncStorage.setItem('history', historyReturn);
        } catch (error) {
            console.log(error.message);
        }
    };

    const [address1, setAddress1] = useState(ADDRESS1)
    const [address2, setAddress2] = useState(ADDRESS2)
    const [delivery, setDelivery] = useState(Object)
    const [error, setError] = useState('')
    const [calculate, setCalculate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState([] as any)
    const { topElemId } = useContext(Context)
    const [topElementId, setTopElementId]: any = topElemId;


    useEffect(() => {
        const asyncFetch = async () => {
            const hist = await AsyncStorage.getItem("history");
            if (hist) {
                // setter from useState
                let histJSON = getSortedArrayByDate(JSON.parse(hist))

                setHistory(histJSON);
            }
        };
        // AsyncStorage.clear()
        asyncFetch();
    }, []);

    useEffect(() => {
        if (Array.isArray(history) && history.length)
            setTopElementId(getTopElement())

        // AsyncStorage.clear()
        saveHistory(JSON.stringify(history))
    }, [history])

    function setDefaultValues() {
        setDelivery({})
        setError('')
    }

    const CalculateDelivery = async (add1: string, add2: string) => {
        setDefaultValues()

        if (calculate == false) setCalculate(true)
        setLoading(true)
        await axios.get(URL, {
            params: {
                address1: add1,
                address2: add2
            }
        })
            .then((res) => {
                if (res.data.err != null) {
                    setError(res.data.msg)
                }
                if (res.data.value) {

                    let hist = res.data
                    setDelivery(res.data)

                    hist.distance = hist.distance.split(' Km')[0]
                    hist.value = hist.value.split('R$ ')[1]
                    hist.time = parseInt(hist.time.split(':')[0]) > 0 ? hist.time : hist.time.split(':')[1] + ':' + hist.time.split(':')[2]
                    hist.address1 = add1
                    hist.address2 = add2
                    hist.id = uuid.v4()
                    hist.date = new Date()

                    let newHistory = [...history, hist]


                    newHistory = getSortedArrayByDate(newHistory)
                    if (newHistory.length > 50) {
                        newHistory.pop()
                    }

                    setHistory(newHistory)

                }
            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    setError('Tivemos um problema na busca... \nCheque os endereços ou a sua conexão com a internet')
                } else if (error.request) {
                    // The request was made but no response was received
                    setError('Infelizmente, tivemos um problema no servidor. Tente novamente mais tarde.')
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setError(error.message)
                }

            })
        setLoading(false)

    }

    const getSortedArrayByDate = (history) => {
        let items = history.sort(function (a, b) {
            return Date.parse(a.date) < Date.parse(b.date);
        });

        return items

    }

    const FlatListComponent = () => {
        if (Array.isArray(history) && history.length) {
            return (
                <View style={[styles.row, {
                    marginTop: '4%', minHeight: 50, height: '38%', justifyContent: 'center', position: 'relative', zIndex: 0
                }]}>

                    <Card height='100%' width='50%' color={terciaryPrimaryColorLighter} radius={14}>
                        <Text style={[styles.title, { marginVertical: 10, flex: 0.1 }]}>Histórico de Pedidos</Text>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                style={{ flex: 1, marginVertical: 10 }}
                                data={history.sort((a, b) => {
                                    return b.date - a.date
                                })}
                                renderItem={({ item }: { item: IDeliveryItem }) => <DeliveryHistoryItem address1={item.address1} address2={item.address2} id={item.id} distance={item.distance} time={item.time} value={item.value} date={item.date} />}
                                keyExtractor={item => item.id.toString()}
                            />
                        </View>
                    </Card>
                </View>
            )
        }
    };

    const CalculateComponent = () => {
        if (loading === false && calculate === false) {
            return (
                <>
                    <TouchableOpacity onPress={() => {
                        Keyboard.dismiss()
                        CalculateDelivery(address1, address2)
                    }} style={{ width: '100%', alignItems: 'center', alignContent: 'center' }} >
                        <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold' }}>Calcular</Text>
                    </TouchableOpacity>
                </>
            )
        }
        if (calculate && loading) {
            return (
                <>
                    <ActivityIndicator size='large' color="white" />
                </>)
        }
        if (calculate) {
            if (error !== '') {
                return (
                    <>
                        <TouchableOpacity onPress={() => CalculateDelivery(address1, address2)} style={{ width: '100%', alignItems: 'center', alignContent: 'center' }} >
                            <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold' }}>Calcular</Text>
                        </TouchableOpacity>
                        <View style={[styles.lineBellow, { borderBottomColor: 'white', width: '85%', marginTop: '2%' }]} />
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.errorMessage}>
                                <FontAwesome5
                                    name="sad-cry" size={14}
                                    color="white" />
                                {`  ${error}`}
                            </Text>
                        </View>
                    </>
                )
            }
            else {
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
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={[styles.row]}>
                <Card height='100%' width='50%'>
                    <View style={styles.addressTitleContainer}>
                        <FontAwesome5 name="map-marker-alt" color={secondaryColor} size={20} style={{ marginLeft: '5%' }} />
                        <Text style={styles.addressTitle}>Ponto de Partida: </Text>
                    </View>
                    <View style={styles.lineBellow} />
                    <TextInput placeholder={ADDRESS1} style={styles.addressPlaceholder} />
                </Card>
            </View>

            <View style={[styles.row, { marginTop: '4%' }]}>
                <Card height='100%' width='50%'>
                    <View style={styles.addressTitleContainer}>
                        <FontAwesome name="flag" color={secondaryColor} size={20} style={{ marginLeft: '5%' }} />
                        <Text style={styles.addressTitle}>Ponto de Entrega: </Text>
                    </View>
                    <View style={styles.lineBellow}
                    />
                    <TextInput placeholder={ADDRESS2} onChangeText={(e) => setAddress2(e)} style={[styles.addressPlaceholder]} placeholderTextColor={lightGreyColor} />
                </Card>
            </View>
            {

                FlatListComponent()
            }
            <View style={[styles.result]}>
                {
                    CalculateComponent()
                }
            </View>
        </View >

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
    title: {
        fontSize: 20,
        alignContent: 'center',
        fontFamily: 'Roboto',
        color: greyColor,
        textAlign: 'center'
    },
    result: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        minHeight: 100,
        zIndex: 2,
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
    errorMessage: {
        fontSize: 16,
        margin: '5%',
        alignContent: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: 'white'
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

