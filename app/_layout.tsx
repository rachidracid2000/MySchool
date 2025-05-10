import { Stack } from "expo-router";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import index from './index';
import eleve from './src/Firstpage/Eleve/eleve';


export default function RootLayout() {
  return ( <Stack screenOptions={{
    headerShown: false
  }} > 
  </Stack>
  
  )
}
