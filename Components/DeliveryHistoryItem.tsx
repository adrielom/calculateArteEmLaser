import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { greyColor, secondaryColor, terciaryPrimaryColor, lightGreyColor, lighterGreyColor } from '../utils/Colors'
import Card from './Card';

// import { Container } from './styles';

const DeliveryHistoryItem: React.FC = () => {
    return (
        <Card height="100%" width="90%" >
            <View style={styles.container}>
                <Text>Entrega </Text>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '5%',
        position: 'relative',
        flex: 1,
        maxHeight: '40%'
    },
});

export default DeliveryHistoryItem;