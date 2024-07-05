import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Button } from 'react-native';
import { db } from '../firebase'; 
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import Footer from './Footer';

function PrescriptionUpload({ route, navigation }) {
  const { email } = route.params;
  const [prescriptionImage, setPrescriptionImage] = useState(null);
  const [savedPrescriptions, setSavedPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const prescriptionsSnapshot = await getDocs(query(collection(db, 'prescriptions'), where('userEmail', '==', email))); //First try to get the image in that from collection with usage of email. 
        const prescriptionsData = prescriptionsSnapshot.docs.map(doc => ({ id: doc.id, imageURL: doc.data().imageURL }));//After getting the document form that location and format it.
        setSavedPrescriptions(prescriptionsData); // Push that fetched and formated data to state variable. 
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };
    fetchPrescriptions(); //Calling Fetch functionality.
  }, [email]); 

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPrescriptionImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSavePrescription = async () => {
    if (!prescriptionImage) return;

    try {
      const docRef = await addDoc(collection(db, 'prescriptions'), {
        userEmail: email,
        imageURL: prescriptionImage,
      });
      setSavedPrescriptions([...savedPrescriptions, { id: docRef.id, imageURL: prescriptionImage }]);
      setPrescriptionImage(null);
    } catch (error) {
      console.error('Error saving prescription:', error);
    }
  };

  const handleDeletePrescription = async (id) => {
    try {
      await deleteDoc(doc(db, 'prescriptions', id));
      setSavedPrescriptions(savedPrescriptions.filter(prescription => prescription.id !== id));
    } catch (error) {
      console.error('Error deleting prescription:', error);
    }
  };

  const back = () => {
    navigation.navigate('PatientHome', { email: email });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={back}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Prescription Upload</Text>
      {prescriptionImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: prescriptionImage }} style={styles.image} />
        </View>
      )}
      <input type="file" accept="image/*" onChange={handleUploadImage} style={styles.input} />
      <Button title="Save Prescription" onPress={handleSavePrescription} disabled={!prescriptionImage} />
      <View style={styles.savedPrescriptionsContainer}>
        <Text style={styles.savedPrescriptionsHeading}>Saved Prescriptions</Text>
        {savedPrescriptions.map((prescription) => (
          <View key={prescription.id} style={styles.savedPrescriptionItem}>
            <Image source={{ uri: prescription.imageURL }} style={styles.savedPrescriptionImage} />
            <Button title="Delete" onPress={() => handleDeletePrescription(prescription.id)} />
          </View>
        ))}
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#0954a5',
    right:'640px',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
  },
  savedPrescriptionsContainer: {
    marginTop: 20,
  },
  savedPrescriptionsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  savedPrescriptionItem: {
    marginBottom: 10,
  },
  savedPrescriptionImage: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
  },
});

export default PrescriptionUpload;
