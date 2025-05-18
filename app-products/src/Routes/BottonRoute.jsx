import React from 'react';
import CadastrarProduto from '../Telas/CadastrarProduto';

import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function TabNavigator({route}){
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}
            initialRouteName={route?.params?.initialRouteName || "CadastrarProduto"}
    >
      <Tab.Screen name="CadastrarProduto" component={CadastrarProduto} 
        options={{
            tabBarIcon: () => <Feather name='shopping-cart' size={20} />,
            tabBarLabel: "Cadastro"
        }}
      />

    </Tab.Navigator>
    );
}