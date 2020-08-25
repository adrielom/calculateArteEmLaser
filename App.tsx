import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calculator from './Components/Calculator';
import { Provider } from './Components/Context';
import Delivery from './Components/Delivery';
import { FontAwesome5 } from '@expo/vector-icons';
import { secondaryColor, secondaryColorLight, greyColor, lightPrimaryColor, lightGreyColor, darkPrimaryColor, lighterGreyColor, primaryColor } from './utils/Colors';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = '';

            if (route.name === 'Calcular') {
              iconName = 'calculator'
            } else if (route.name === 'Delivery') {
              iconName = 'motorcycle'
            }

            // You can return any component that you like here!
            return <FontAwesome5 name={iconName} size={size - 2} color={color} />;
          },
        })}
          tabBarOptions={{
            activeTintColor: 'white',
            showLabel: false,
            inactiveTintColor: 'white',
            inactiveBackgroundColor: secondaryColor,
            activeBackgroundColor: secondaryColorLight,
            style: {
              // Remove border top on both android & ios
              borderTopWidth: 0,
              borderTopColor: "transparent",

              elevation: 0,
              shadowColor: '#5bc4ff',
              shadowOpacity: 0,
              shadowOffset: {
                height: 0,
              },
              shadowRadius: 0,
            }
          }}>
          <Tab.Screen name="Calcular" component={Calculator} />
          <Tab.Screen name="Delivery" component={Delivery} />
        </Tab.Navigator>
      </NavigationContainer>
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
