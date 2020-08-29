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

const threeDotsHeight = 24

const height = Dimensions.get('screen').height



export interface IToggle {
    title: string,
    state: boolean,
    coef: number
}

const DEFAULT_ACTIONS = [
    {
        id: 1,
        title: 'Corte',
        state: true,
        coef: 0.018,
        isCoef: true
    },
    {
        id: 2,
        title: 'Gravação',
        state: false,
        coef: 2,
        isCoef: false
    },
    {
        id: 3,
        title: 'Vazado',
        state: false,
        coef: 0.023,
        isCoef: true
    },
    {
        id: 4,
        title: 'Rebaixado',
        state: false,
        coef: 0.028,
        isCoef: true
    },
]

const TOP_THRESHOLD = 100000
const BOTTOM_THRESHOLD = 0

export default function Calculator() {

    const CalculateResult = () => {

        const coef = toggleState.filter(f => f.isCoef == true && f.state == true)
        const notCoef = toggleState.filter(f => f.isCoef == false && f.state == true)
        let val = 0
        coef.forEach(x => {
            if (x.coef > val)
                val = x.coef
        })
        let acc = 0
        notCoef.forEach(x => {
            acc += x.coef
        })

        let result = altura * largura * val * quant + acc
        return result
    }

    const { qnt } = useContext(Context)
    const [quant, setQuant]: any = qnt
    const [toggleState, setToggleState] = useState(DEFAULT_ACTIONS)
    const { larg } = useContext(Context)
    const [largura, setLargura]: any = larg
    const { alt } = useContext(Context)
    const [altura, setAltura]: any = alt
    const [result, setResult] = useState(CalculateResult)


    useEffect(() => {
        setResult(CalculateResult)
    }, [quant, largura, altura, toggleState])



    const ToggleChange = (id: number) => {
        const newArray = toggleState
        newArray.map(a => {
            if (a.id === id) {

                a.state = !a.state
            }
        })
        setToggleState(newArray)
        setResult(CalculateResult)
    }

    function ChangeInputValue(val: string) {
        let numVal = parseFloat(val)
        if (val === '' || numVal < 0 || isNaN(numVal))
            setQuant(0);
        else if (numVal > 0)
            setQuant(numVal);
    }



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
                    <DimensionsInput val={larg} title="Largura" />
                </Card>
                <Card height='100%' width='50%' >
                    <DimensionsInput val={alt} title="Altura" />
                </Card>
            </View>
            <View style={[styles.row, { height: height > 780 ? '30%' : '20%', marginTop: '5%' }]}>
                <Card height='100%' width='100%'>
                    <Text style={styles.quantityText}>Serviço</Text>
                    <FlatList
                        style={{ paddingVertical: '2%', marginBottom: '3%' }}
                        data={toggleState}
                        renderItem={({ item }) => <CoeficientToggles item={item} title={item.title} toggleChange={ToggleChange} />}
                        keyExtractor={action => action.title}
                    />
                </Card>
            </View>
            <View style={[styles.row, styles.quantity,]}>
                <Card height='100%' width='100%'>
                    <Text style={styles.quantityText}>Quantidade</Text>
                    <View style={[styles.cardContent]}>
                        <RoundButton SubValue={() => SubValue(quant, setQuant, BOTTOM_THRESHOLD)} name="minus" size={36} />

                        <TextInput onChangeText={e => ChangeInputValue(e)} keyboardType="numeric" style={styles.quantityTextValue}>  {quant}</TextInput>
                        <RoundButton SubValue={() => AddValue(quant, setQuant, TOP_THRESHOLD)} name="plus" size={36} />
                    </View>
                </Card>
            </View>
            <View style={[styles.result]}>
                <Text style={styles.resultText}>R$ {result.toFixed(2)}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    threeDotsButton: {
        marginTop: '8%',
        position: 'absolute',
        right: '3%',
        maxHeight: threeDotsHeight

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

