import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity,View,Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const SignScreen = ({ navigation }) => {
  const [isSelectedSignIn, setIsSelectedSignIn] = useState(false);
  const [isSelectedSignUp, setIsSelectedSignUp] = useState(false);

  
  const handleSignInPress = () => {
    setIsSelectedSignIn(true);
    setIsSelectedSignUp(false);
    navigation.navigate('Sign In');
    // Additional logic for signing in
  };

  const handleSignUpPress = () => {
    setIsSelectedSignIn(false);
    setIsSelectedSignUp(true);
    navigation.navigate('Sign Up');

    // Additional logic for signing up
  };
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3A1C71','#D76D77','#FFAF7B']}
        
        style={styles.signView}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.signViewText}>Welcome</Text>
      </LinearGradient>
      
      <TouchableOpacity
        style={[styles.button, isSelectedSignIn && styles.selectedButton]}
        onPress={handleSignInPress}
      >
        <Text style={[styles.buttonText, isSelectedSignIn && styles.selectedText]}>
          SIGN IN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isSelectedSignUp && styles.selectedButton, { marginTop: 10 }]} // marginTop ekledik
        onPress={handleSignUpPress}
      >
        <Text style={[styles.buttonText, isSelectedSignUp && styles.selectedText]}>
          SIGN UP
        </Text>
      </TouchableOpacity>
      
      
      <View style={styles.socialButtonsContainer}>
          <Text style={{fontWeight:'bold',
          fontSize:16,
        textAlign:'center',
        color:'grey',
        justifyContent:'center',
        alignItems:'center',
        bottom:0,
        width:'100%'}}>Login with Social Media </Text>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity
        style={styles.socialButton}
        onPress={() => openLink('https://www.instagram.com/avsarmst?igsh=a2RzdDNpcTZxMG4z&utm_source=qr')}
      >
        <Entypo name="instagram-with-circle" size={40} color="#3F2B96" />
      </TouchableOpacity>
        <TouchableOpacity 
        style={styles.socialButton}
        onPress={() => openLink('https://www.linkedin.com/in/mesuthan-av%C5%9Far-0b2b35248/')}>
        <Entypo name="linkedin-with-circle" size={40} color="#3F2B96" />        
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.socialButton}
        onPress = {() => openLink('https://github.com/Mesuthan02')}>
        <FontAwesome5 name="github" size={40} color="#3F2B96" />  
        </TouchableOpacity>
      </View>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:"center",
    paddingHorizontal: 20,
  },
  signView: {
    width:'100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderEndEndRadius: 30,
    borderEndStartRadius: 30, // Changed to borderRadius to fix the styling issue
    marginBottom: 80,
  },
  signViewText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
  },
  button: {
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    marginBottom:20,
    width: 250,
    height:60,
    borderRadius:70,
    backgroundColor:'#3A1C71',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  selectedButton: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#3F2B96',
  },
  selectedText: {
    color: '#3A1C71',
  },
  socialButton: {
   padding:10,
  },
  socialButtonsContainer: {
    padding:10,
    paddingBottom:50,
    alignItems: 'center',
    position:'absolute',
    bottom:0,
    width:"100%",
    
  },
});

export default SignScreen;
