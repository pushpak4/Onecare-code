import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, ImageBackground, Alert, Picker,TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth,  db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import {  doc, setDoc } from "firebase/firestore"; 
import Footer from './Footer'; 



function SignupPage({ navigation }) {
 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [receiveEmails, setReceiveEmails] = useState(false);
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  
  const handleSignup = async () => {
   
    if (!validateForm()) {
      alert('Error', 'Please fill out all required fields and agree to the Terms and Conditions');
      return;
    }
    alert('Success', 'Signup successful!');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
     
      await sendEmailVerification(user);
  

      alert('Success', 'Registration successful. Please check your email for verification.');
      
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        receiveEmails: receiveEmails,
        gender: gender,
        phoneNumber: phoneNumber
        //userType: userType
      };

      // Reference to the appropriate collection based on userType
      //const userCollection = userType === 'patient' ? 'patients' : 'doctors';
      const userCollection = 'patients';


      
      await setDoc(doc(db, userCollection, user.uid), userData);
      navigation.navigate('Login');

     
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  
  const validateForm = () => {
    return (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      password === confirmPassword &&
      receiveEmails &&
      gender.trim() &&
      phoneNumber.trim()
    );
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
        <View style={styles.loginContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/onecare-logo.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.signupContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Create Your OneCare Account</Text>
            </View>
            <View style={styles.nameContainer}>
              <TextInput
                style={[styles.input]}
                placeholder="First Name"
                placeholderTextColor="darkpink"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
              />
              <TextInput
                style={[styles.input]}
                placeholder="Last Name"
                placeholderTextColor="darkpink"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="darkpink"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="darkpink"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="darkpink"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
            />
           {/* Gender dropdown */}
           <View style={[styles.input, styles.pickerContainer]}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="darkpink"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <View style={styles.checkboxContainer}>
  <TouchableOpacity
    style={[styles.checkbox, receiveEmails && styles.checkboxSelected]}
    onPress={() => setReceiveEmails(!receiveEmails)}
  >
    {receiveEmails && <FontAwesomeIcon icon="check" style={styles.checkIcon} />}
  </TouchableOpacity>
  <Text style={styles.checkboxText}>By creating an account you agree with Terms and Conditions</Text>
</View>
           
            <TouchableOpacity
              style={[styles.button, !validateForm() && styles.disabledButton]}
              onPress={handleSignup}
              disabled={!validateForm()}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.messageView}>
              <Text>Already have an account?</Text>
              <Text style={styles.link} onPress={backToLogin}>Login</Text>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </ImageBackground>

  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '130%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  signupContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 3,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginTop:'50',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'darkpink',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  pickerContainer: {
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20, 
  },
  checkboxText: {
    flex: 1,
    fontSize: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    color: 'black',
  },
  checkboxSelected: {
    backgroundColor: '#0954a5', 
  },
  button: {
    borderRadius: 3,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#0954a5',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc', 
  },
  messageView: {
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
  titleContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkpink',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  
});


export default SignupPage;