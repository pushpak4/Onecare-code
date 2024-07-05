import React, { useState } from 'react';
import { StyleSheet, View, TextInput,  ImageBackground, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth} from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth'; //Importing send password reset email module from firebase.
import Footer from './Footer'; 

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation(); 

//Setting asynchronous function.
  const handleSubmit = async () => {
    try {   //It is used for error handling.
      await sendPasswordResetEmail(auth, email); // It is used for sending reset password emails
      alert('Email has been sent for reseting password, please check email.');
    } catch (error) { //It is used to catch any error that occur while running this function.
      const errorMessage = error.message; //This is used retrive error which is caught.
      alert('Error', errorMessage); //Showing that error message.
    }
  };

  const backToLogin = () => {
    navigation.navigate('Login'); 
  };

  return (
    <ImageBackground
     source={require('../assets/health5.jpeg')}
     style={styles.backgroundImage}
   >
      <View style={styles.container}>
        <View style={styles.forgetPassContainer}>
          <View style={styles.innerContent}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../assets/onecare-logo.png')}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.text}>
              Please enter your verified email address and we will send you a password reset link.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity style={styles.buttonCss} onPress={handleSubmit}>
            <Text style={styles.buttonTextCss}>Send Email</Text>
          </TouchableOpacity>
          <View style={styles.messgaeView}>
        <Text> Return to Login page</Text>
       <Text style={styles.link} onPress={backToLogin}>
                Login
              </Text>
        </View>
        </View>
        </View>
        <Footer />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  forgetPassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    width: '120%',
    alignItems: 'center',
  },
  innerContent: {
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    aspectRatio: 4 / 3, //It is used to define aspect ratio that is width and height.
  },
  text: {
    paddingVertical: 10,
    width: '80%',
    textAlign: 'center'
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  forgotLink: {
    color: '#0f67c3',
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-end',
    cursor: 'pointer',
  },
  buttonCss: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0954a5',
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer',
  },
  buttonTextCss: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  disabledCss: {
    backgroundColor: '#dedede',
    cursor: 'not-allowed',
  },
  messgaeView: {
    flexDirection: 'row',
    marginTop: 20,
  },

  link: {
    color: '#0954a5',
    marginBottom: 10,
    marginStart: 5,
    fontWeight: '700',
    borderBottomWidth: 1,
  },
});

export default ForgetPassword;