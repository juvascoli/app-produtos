import React from 'react';
import Register from "../Telas/Register";
import Home from '../Telas/Home';

import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();

export default function TabNavigator({route}){
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}
            initialRouteName={route?.params?.initialRouteName || "Home"}
    >
      <Tab.Screen name="Home" component={Home} 
        options={{
            tabBarIcon: () => <Feather name='home' size={20} />,
            tabBarLabel: "Início"
        }}
      />

      <Tab.Screen name="Register" component={Register}
        options={{
            tabBarIcon: () => <Feather name= "user-plus" size={20} />,
            tabBarLabel: "Registro"
        }} />
    </Tab.Navigator>
    );
}