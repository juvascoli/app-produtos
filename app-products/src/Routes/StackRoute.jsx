import Us from "../Telas/Us";
import TabNavigator from "./BottonRoute";
import { View, Text, StyleSheet, Image } from 'react-native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator()

export default function StackNavigator(){
  return (
      <Stack.Navigator 
      screenOptions={{ headerTitle: () => (
        <Image
          source={require('../../assets/bg.png')}
          style={styles.headerLogo}
        /> 
      ),
      headerTitleAlign: 'center'}}> 
        <Stack.Screen name="Home" component={TabNavigator}/>
        <Stack.Screen name="Us" component={Us} />
      </Stack.Navigator>
  )
}

 
const styles = StyleSheet.create({
  headerLogo:{
    width:120,
    height: 50,
    resizeMode: 'contain'

  }

})