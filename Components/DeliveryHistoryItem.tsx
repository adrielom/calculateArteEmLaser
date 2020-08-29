import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { greyColor, secondaryColor, terciaryPrimaryColor, lightGreyColor, lighterGreyColor, lightPrimaryColor, darkPrimaryColor, lighterPrimaryColor } from '../utils/Colors'
import Card from './Card';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Context } from './Context';

export interface IDeliveryItem {
    address1: string,
    address2: string,
    distance: string,
    time: string,
    value: string,
    id: number,
    date: Date
}

// import { Container } from './styles';

const DeliveryHistoryItem: React.FC<IDeliveryItem> = ({ distance = 1, time = 10, value = 20, address1, address2, id }) => {

    const { topElemId } = useContext(Context)
    const [topElementId, setTopElementId]: any = topElemId;

    return (
        <View style={[styles.container, {
            marginTop: id === topElementId ? '10%' : 20
        }]}>
            <View style={styles.row}>
                <Card height="100%" width="90%" color='white' radius={10} >
                    <FontAwesome5 name="route" color={secondaryColor} size={20} style={{ position: 'absolute', right: 15, top: '55%' }} />
                    <View>
                        <Text style={[styles.titleText, { marginTop: 10 }]}> {address1} </Text>
                        <Text style={styles.titleText}> {address2} </Text>
                        <View style={[styles.lineBellow, { width: '85%', marginTop: '2%' }]} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: '2%' }}>
                        <Text style={styles.secondaryInfoText}>
                            {distance}
                            <Text style={{ fontSize: 15 }}> km</Text>
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Text style={styles.secondaryInfoText}>
                                R$
                            <Text> {value}</Text>
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.secondaryInfoText}>
                                {time}
                                <Text style={{ fontSize: 15 }}> min</Text>
                            </Text>
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        margin: '5%',
        marginTop: 5,
        color: greyColor
    },
    row: {
        flexDirection: 'row',
    },
    lineBellow: {
        marginTop: '2%',
        borderBottomColor: lightGreyColor,
        borderBottomWidth: .5,
        width: '90%',
        justifyContent: 'center'
    },
    secondaryInfoText: {
        color: secondaryColor,
        fontWeight: 'bold',
        fontSize: 18,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '5%',
        minHeight: 50,
        maxHeight: '40%',
    },
});

export default DeliveryHistoryItem;