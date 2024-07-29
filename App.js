import React from 'react';
import { Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignScreen from './Screens/SignPage';
import SignInPage from './Screens/SignInPage';
import SignUpPage from './Screens/SignUpPage';
import HomePage from './Screens/HomePage';
import Analyses from './Screens/Analyses';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign In/Up">
        <Stack.Screen name="Sign In/Up" component={SignScreen} />
        <Stack.Screen name="Sign In" component={SignInPage} />
        <Stack.Screen name="Sign Up" component={SignUpPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Analyses" component={Analyses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
