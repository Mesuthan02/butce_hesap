import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpPage = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUpPress = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      await AsyncStorage.setItem('user', JSON.stringify({
        fullName,
        contact,
        password
      }));
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('Sign In');
    } catch (error) {
      Alert.alert('Error', 'Failed to register user');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#3A1C71', '#D76D77', '#FFAF7B']}
          style={styles.SignUpView}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.SignViewText}>Hello Sign Up</Text>
        </LinearGradient>

        <View style={{ alignItems: "center" }}>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={20} color="#3A1C71" style={{ marginBottom: 10, marginRight: 10 }} />
            <TextInput
              style={styles.InputStyle}
              onChangeText={setFullName}
              value={fullName}
              placeholder="Full Name"
              placeholderTextColor="grey"
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#3A1C71" style={{ marginBottom: 10, marginRight: 10 }} />
            <TextInput
              style={styles.InputStyle}
              onChangeText={setContact}
              value={contact}
              placeholder="Phone or Email"
              placeholderTextColor="grey"
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#3A1C71" style={{ marginBottom: 10, marginRight: 10 }} />
            <TextInput
              style={styles.InputStyle}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="grey"
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#3A1C71" style={{ marginBottom: 10, marginRight: 10 }} />
            <TextInput
              style={styles.InputStyle}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor="grey"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, { alignSelf: 'center' }]}
          onPress={handleSignUpPress}
        >
          <Text style={styles.buttonText}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  SignUpView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
    marginBottom: 50,
  },
  SignViewText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  InputStyle: {
    width: 250,
    height: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 2,
    borderColor: '#3A1C71',
    marginBottom: 20
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    padding: 10,
    width: 250,
    height: 60,
    borderRadius: 70,
    backgroundColor: '#3A1C71',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignUpPage;
