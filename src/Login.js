import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ImageBackground, Image, TouchableOpacity, Text,  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth'; 
import { signInWithPopup } from 'firebase/auth';
import Footer from './components/Footer'; 


function Login({ navigation }) {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');



 const handleLogin = async  () => {
  signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => { 
  const user = userCredential.user;
  if (!user.emailVerified) {
    alert('Error', 'Please verify your email before logging in.');
    return;
  }
  
  navigation.navigate('PatientHome',{email:email});
  alert('Login successful');
})

};


 const handleSignup = () => {
   navigation.navigate('SignupPage');
 };

 const handleLoginAsDoctor = () => {

     navigation.navigate('DoctorLogin');
 
 };
    

 const handleForgotPassword = () => {
   navigation.navigate('ForgotPassword');
 };

 const contactSupport = () => {
  const supportEmail = 'support@onecare.com';
  const mailtoLink = `mailto:${supportEmail}`;
  window.open(mailtoLink, '_blank');
};
 const handleGoogleLogin = async () => {
   try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    navigation.navigate('HomePage', { email: user.email });
   } catch (error) {
     console.error('Google login error:', error);
    alert('Login Failed', 'Failed to login with Google. Please try again.');
   }
 };



 return (
   <ImageBackground
     source={require('./assets/health5.jpeg')}
     style={styles.backgroundImage}
   >
     <View style={styles.container}>
       <View style={styles.loginContainer}>
         <View style={styles.logoContainer}>
           <Image
             style={styles.logo}
             source={require('./assets/onecare-logo.png')}
             resizeMode="contain" />
         </View>
         <TextInput
           style={styles.input}
           placeholder="Email"
           value={email}
           onChangeText={(text) => setEmail(text)} />
         <TextInput
           style={styles.input}
           placeholder="Password"
           value={password}
           onChangeText={(text) => setPassword(text)}
           secureTextEntry
           type="password" />
         <Text style={styles.forgotLink} onPress={handleForgotPassword}>
           Forgot Password?
         </Text>
         <TouchableOpacity
           style={!email || !password ? [styles.buttonCss, styles.disabledCss] : styles.buttonCss}
           onPress={handleLogin}
         >
           <Text style={styles.buttonTextCss}>Login</Text>
         </TouchableOpacity>
         <View style={styles.messgaeView}>
       <Text> Don't have an account?</Text>
       <Text style={styles.link} onPress={handleSignup}>
         Sign up
       </Text>
     </View>

         <TouchableOpacity style={[styles.buttonCss, styles.googleButton]} onPress={handleGoogleLogin}>
 <FontAwesomeIcon icon={faGoogle} style={styles.buttonIcon} />
 <Text style={styles.buttonTextCss}>Continue with Google</Text>
</TouchableOpacity>

<View style={styles.messgaeView}>
       <Text> Doctor Login?</Text>
       <Text style={styles.link} onPress={handleLoginAsDoctor}>
        Login as Doctor
       </Text>
     </View>
     <View style={styles.messgaeView}>
       <Text> Need assistance?</Text>
       <Text style={styles.link} onPress={contactSupport}>
        Contact support
       </Text>
     </View>

       
         
       </View>
     </View>
     <Footer />
   </ImageBackground>
 );
}

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
 loginContainer: {
   backgroundColor: 'rgba(255, 255, 255, 0.8)',
   borderRadius: 10,
   padding: 20,
   width: '150%',
   alignItems: 'center',
 },
 logoContainer: {
   alignItems: 'center',
   justifyContent: 'center',
   marginBottom: 20,
 },
 logo: {
   width: 150,
   height: 150,
   aspectRatio: 4 / 3,
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
 buttonCss: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#0954a5',
   padding: 10,
   borderRadius: 5,
   marginTop: 10,
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
 googleButton: {
   backgroundColor: '#DB4437', 
 },
 
 buttonIcon: {
   color: 'white',
   marginRight: 10,
 },

 
 chatIcon: {
   position: 'absolute',
   bottom: 20,
   right: 20,
   backgroundColor: '#0954a5',
   width: 60,
   height: 60,
   borderRadius: 30,
   justifyContent: 'center',
   alignItems: 'center',
   elevation: 5,
 },
 chatIconText: {
   color: 'white',
   fontSize: 18,
 },
 
 centeredView: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 22,
 },
 modalView: {
   margin: 20,
   backgroundColor: 'white',
   borderRadius: 20,
   padding: 35,
   alignItems: 'center',
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 4,
   elevation: 5,
 },
 modalCloseText: {
   fontSize: 16,
   fontWeight: 'bold',
   color: '#0954a5',
   marginTop: 20,
 },

});

export default Login;
