import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const DEFAULT_EMAIL = 'test@example.com';
  const DEFAULT_PASSWORD = 'password123';

// Bu değerleri giriş formunuza yerleştirin


  const handleSignInPress = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.contact === email && parsedUser.password === password) {
          navigation.navigate('HomePage');
        } else {
          Alert.alert('Error', 'Invalid email or password');
        }
      } else {
        Alert.alert('Error', 'No user found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#3A1C71', '#D76D77', '#FFAF7B']}
          style={styles.SignInView}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.SignViewText}>Hello Sign In</Text>
        </LinearGradient>

        <View style={{ alignItems: "center" }}>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={24} color="#3A1C71" style={{ marginBottom: 10, marginRight: 10 }} />
            <TextInput
              style={styles.InputStyle}
              onChangeText={setEmail}
              value={email}
              placeholder="Example@gmail.com"
              placeholderTextColor="grey"
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={24} color="#3A1C71" style={{ marginBottom: 10, marginRight: 10 }} />
            <TextInput
              style={styles.InputStyle}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="grey"
            />
          </View>
        </View>

        <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 50 }}>
          <Text style={{ color: '#3A1C71' }}>Forget password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { alignSelf: 'center' }]}
          onPress={handleSignInPress}
        >
          <Text style={styles.buttonText}>
            SIGN IN
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
  SignInView: {
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    padding: 10,
    width: 250,
    height: 60,
    borderRadius: 70,
    backgroundColor: '#3A1C71',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 2,
    borderColor: '#3A1C71',
    marginBottom: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignInPage;
