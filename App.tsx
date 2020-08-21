import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calculator from './Components/Calculator';
import { Provider } from './Components/Context';
import Delivery from './Components/Delivery';

export default function App() {
  return (
    <Provider>
      <View style={styles.container}>
        {/* {console.log('app')} */}
        {/* <Calculator /> */}
        <Delivery />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
