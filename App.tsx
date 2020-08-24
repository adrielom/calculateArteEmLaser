import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calculator from './Components/Calculator';
import { Provider } from './Components/Context';
import Delivery from './Components/Delivery';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Provider>
          <View style={styles.container}>
            <Tab.Screen name="Calculator" component={Calculator} />
            <Tab.Screen name="Delivery" component={Delivery} />
          </View>
        </Provider>
      </Tab.Navigator>
    </NavigationContainer>
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
