import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Picker } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBell } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import { db } from '../firebase';
import { collection, addDoc, doc, deleteDoc, updateDoc, query, where, getDocs } from "firebase/firestore"; 
import emailjs from 'emailjs-com'; 

function MedicationReminder({ route, navigation }) {
  const { email } = route.params;
  const [medications, setMedications] = useState([]);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [schedule, setSchedule] = useState('');
  const [reminderTimeouts, setReminderTimeouts] = useState({}); 
  const scheduleOptions = ['', '5 min', '15 min', '30 min', '45 min', '1 hour', '24 hours', '30 days', '6 months'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'medications'), where("email", "==", email));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMedications(data);
      } catch (error) {
        console.error('Error fetching medications: ', error);
      }
    };
    fetchData();
  }, [email]);

  const handleSubmit = async () => {
    if (!name || !dosage || !schedule) return;

    try {
      const medicationsCollection = collection(db, 'medications');
      const docRef = await addDoc(medicationsCollection, {
        email: email,
        name: name,
        dosage: dosage,
        schedule: schedule
      });
      setMedications([...medications, { id: docRef.id, email, name, dosage, schedule }]);
      setName('');
      setDosage('');
      setSchedule('');
    } catch (error) {
      console.error('Error adding medication: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
     
      clearTimeout(reminderTimeouts[id]);
      await deleteDoc(doc(db, 'medications', id));
      setMedications(medications.filter(medication => medication.id !== id));
    } catch (error) {
      console.error('Error deleting medication: ', error);
    }
  };

  const handleEdit = async (id, newName, newDosage, newSchedule) => {
    try {
      await updateDoc(doc(db, 'medications', id), {  //Trying to update medication document in firestore.
        name: newName,
        dosage: newDosage,
        schedule: newSchedule
      });
      //If Update is sucessfully done then it will display in local machine. 
  const updatedMedications = medications.map(medication => {
    //If existing user medication matches with ID OF document then it will update it in the firestore.
    if (medication.id === id) {
      return { ...medication, name: newName, dosage: newDosage, schedule: newSchedule };
    }
    return medication;
  });
  setMedications(updatedMedications);
  } catch (error) {
    console.error('Error updating medication: ', error);
  }
  };

  //function for reminder for that medical ID
  const handleSendReminder = (medicationId, medicationName, medicationDosage, medicationSchedule) => {
    //It is used to clear existing reminder for medication ID to avoid any duplicates.
    clearInterval(reminderTimeouts[medicationId]);
    let scheduleInMs; // Variable to store time.
    switch (medicationSchedule) {
      case '5 min':
        scheduleInMs = 5 * 60 * 1000; // Setting schedule in milliseconds.
        break;
      case '15 min':
        scheduleInMs = 15 * 60 * 1000;
        break;
      case '30 min':
        scheduleInMs = 30 * 60 * 1000;
        break;
      case '45 min':
        scheduleInMs = 45 * 60 * 1000;
        break;
      case '1 hour':
        scheduleInMs = 60 * 60 * 1000;
        break;
      case '24 hours':
        scheduleInMs = 24 * 60 * 60 * 1000;
        break;
      case '30 days':
        scheduleInMs = 30 * 24 * 60 * 60 * 1000;
        break;
      case '6 months':
        scheduleInMs = 6 * 30 * 24 * 60 * 60 * 1000;
        break;
      default:
        scheduleInMs = 0;
    }
    const intervalId = setInterval(() => {
    
      emailjs.send('service_cwwpvmg', 'template_dktuo2u', {
        email: email,
        medication_name: medicationName,
        medication_dosage: medicationDosage
      }, 'v-dZJ35yG-2ndHNoP')
        .then((response) => {
          console.log('Reminder email sent:', response);
        }, (error) => {
          console.error('Error sending reminder email:', error);
        });
    }, scheduleInMs); //Store variable is called here.
    //It is used for storing intervals ID for medication.
    setReminderTimeouts(prevState => ({
      ...prevState, //Repeating same content.
      [medicationId]: intervalId //Setting Id for current remainder.
    }));
    alert(`As requested reminder as been set for medication ${medicationName}.`);
  };
  
  const handleStopReminder = (medicationId) => {
    //It is used to stop specific medication remainder.
    clearTimeout(reminderTimeouts[medicationId]);
     //It is used to clear the remainder for particular ID.
    const updatedTimeouts = { ...reminderTimeouts };
    //Deleting interval id which was store above for remainder. 
    delete updatedTimeouts[medicationId];
    //After that updating the state.
    setReminderTimeouts(updatedTimeouts);
    alert('Reminder for medication has been stopped.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}> 
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      <Image source={require('../assets/MedicationReminder.png')} style={styles.banner} />
      <Text style={styles.heading}>Medication Reminder</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Medication Name"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          value={dosage}
          placeholder="Dosage (e.g., 1 tablet)"
          onChangeText={(text) => setDosage(text)}
          keyboardType="numeric"
        />
        <Picker
          style={styles.input}
          selectedValue={schedule}
          onValueChange={(itemValue) => setSchedule(itemValue)}>
          {scheduleOptions.map((option, index) => (
            <Picker.Item key={index} label={option || "Select Schedule"} value={option} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Medication</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeading}>Medications:</Text>
      <View style={styles.medicationList}>
        {medications.map((medication) => (
          <View key={medication.id} style={styles.medicationItem}>
            <Text style={styles.medicationName}>{medication.name}</Text>
            <Text style={styles.medicationDetails}>Dosage: {medication.dosage}</Text>
            <Text style={styles.medicationDetails}>Schedule: {medication.schedule}</Text>
            <View style={styles.buttonsRow}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(medication.id, prompt('Enter new name', medication.name), prompt('Enter new dosage', medication.dosage), prompt('Enter new schedule', medication.schedule))}>
                <View style={styles.buttonContent}>
                  <FontAwesomeIcon icon={faEdit} size="lg" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Edit</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(medication.id)}>
                <View style={styles.buttonContent}>
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                  <Text style={styles.buttonText}>Delete</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendReminderButton} onPress={() => handleSendReminder(medication.id, medication.name, medication.dosage, medication.schedule)}>
                <View style={styles.buttonContent}>
                  <FontAwesomeIcon icon={faBell} size="lg" />
                  <Text style={styles.buttonText}>Set Reminder</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.stopReminderButton} onPress={() => handleStopReminder(medication.id)}>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Stop Reminder</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  banner: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    color: '#0954a5',
    fontSize: 18,
    right:'620px',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#0954a5',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  medicationList: {
    width: '80%',
  },
  medicationItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  medicationDetails: {
    fontSize: 14,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#0954a5',
    padding: 10,
    width: 100,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendReminderButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  stopReminderButton: {
    backgroundColor: '#ffcc00', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 5,
  },
  reminderButton: {
    backgroundColor: '#0954a5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default MedicationReminder;