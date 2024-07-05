import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Footer from './Footer'; 
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import emailjs from 'emailjs-com';

const LabTestBooking = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const labTestplans = [
    { 
      id: 1, 
      name: 'Basic Blood Test', 
      description: 'A simple blood test to check basic health parameters.', 
      price: 50, 
      image: require('../assets/labtest/BloodTest.png') 
    },
    { 
      id: 2, 
      name: 'Full Body Checkup', 
      description: 'Comprehensive health checkup covering all major body systems.', 
      price: 150, 
      image: require('../assets/labtest/FullBody.png')  
    },
    { 
      id: 3, 
      name: 'Cholesterol Panel', 
      description: 'Test to measure cholesterol levels in the blood.', 
      price: 80, 
      image: require('../assets/labtest/Colesterol.png') 
    },
    { 
      id: 4, 
      name: 'Diabetes Screening', 
      description: 'Screening test to detect diabetes or prediabetes.', 
      price: 60, 
      image: require('../assets/labtest/Diabetes.png') 
    },
    { 
      id: 5, 
      name: 'Thyroid Function Test', 
      description: 'Test to assess thyroid gland function.', 
      price: 70, 
      image: require('../assets/labtest/Thyroid.png') 
    },
    { 
      id: 6, 
      name: 'Liver Function Test', 
      description: 'Evaluation of liver function and health.', 
      price: 90, 
      image: require('../assets/labtest/Liver.png') 
    },
    { 
      id: 7, 
      name: 'Kidney Function Test', 
      description: 'Assessment of kidney function and health.', 
      price: 85, 
      image: require('../assets/labtest/Kidney.png') 
    },
    { 
      id: 8, 
      name: 'Cardiac Health Checkup', 
      description: 'Comprehensive assessment of heart health.', 
      price: 120, 
      image: require('../assets/labtest/CardiacHealth.png') 
    },
  ];
  
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handlePlanSelect = (planId) => {
    //Finding the selected plan from all plans.
    const selectedPlanIndex = selectedPlans.findIndex((plan) => plan.id === planId);
    //Checking if plan existed in array or not.
    const planExists = selectedPlanIndex !== -1;
    //After that add plan with the help of ID.
    const planToAdd = labTestplans.find((plan) => plan.id === planId);
    // If plan does not exists in selecetd plans.
    if (!planExists) {
      //Adding that slecetd plan.
      setSelectedPlans([...selectedPlans, planToAdd]);
      //Getting that plan price and updating the total price with that new price.
      setTotalPrice(totalPrice + planToAdd.price);
    } else {
      //If the plan has already updated or already existed then remove it slecetd plan from array list.
      const updatedPlans = selectedPlans.filter((plan) => plan.id !== planId);
      setSelectedPlans(updatedPlans);
      //Decrease the price of that plan with total amount and update it.
      setTotalPrice(totalPrice - planToAdd.price);
    }
  };

  const handleBookingAppointment = async () => {
    try {
      const appointmentData = {
        patientEmail: email,
        labTestPlans: selectedPlans,
        totalPrice: totalPrice,
        createdAt: Timestamp.fromDate(new Date()),
      };
      const docRef = await addDoc(collection(db, 'labTestAppointments'), appointmentData);
      console.log('Booking Confirmed! Document ID:', docRef.id);
      alert('Booking for labtest is done and details sent to mail.');
      sendEmail(appointmentData);
      navigation.navigate('PatientHome', { email });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Unable to book appointment.');
    }
  };

  const sendEmail = (appointmentData) => {
    const { labTestPlans, totalPrice } = appointmentData;
    const testNames = labTestPlans.map((plan) => plan.name).join(', ');
    const templateParams = {
      testNames: testNames,
      totalPrice: totalPrice.toFixed(2),
      email: email, 
    };
    emailjs.send('service_i0f9ait', 'template_54x0y4e', templateParams, 'JuIkNzbfGilrBdDNs')
      .then((response) => {
        console.log('Email sent:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      <Image source={require('../assets/LabTest.jpeg')} style={styles.banner} />
      <Text style={styles.heading}>Welcome to Lab Test Booking</Text>
      <Text style={styles.subHeading}>Choose from a variety of lab test packages below:</Text>
      <View style={styles.packagesContainer}>
        {labTestplans.map((labTest) => (
          <TouchableOpacity key={labTest.id} onPress={() => handlePlanSelect(labTest.id)} style={styles.packageItem}>
            <Image source={labTest.image} style={styles.packageImage} />
            <Text style={styles.packageName}>{labTest.name}</Text>
            <Text style={styles.packageDescription}>{labTest.description}</Text>
            <Text style={styles.packagePrice}>${labTest.price}</Text>
            <View style={[styles.selectIcon, selectedPlans.some((plan) => plan.id === labTest.id) && styles.selectedIcon]} />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</Text>
      <TouchableOpacity style={styles.button} onPress={handleBookingAppointment}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
      <Footer/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  banner: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  packagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  packageItem: {
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  packageImage: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  packageName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  packageDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  packagePrice: {
    fontSize: 14,
    marginTop: 5,
  },
  selectIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000',
  },
  selectedIcon: {
    backgroundColor: 'blue',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0954a5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  backButton: {
    color: '#0954a5',
    fontSize: 18,
    right:'620px',
  },
});

export default LabTestBooking;