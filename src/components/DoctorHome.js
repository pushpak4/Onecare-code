import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';
import Footer from './Footer';


const DoctorHome = ({ route }) => { //Indicating doctor home with route.
  const { doctorName } = route.params; // Use to extract doctor name from route.
  const [appointments, setAppointments] = useState([]); //Assigning empty array.
  const navigation = useNavigation();

  useEffect(() => { // Used to fetch appointment details for particular doctor.
    const fetchAppointments = async () => { 
      try {
        const doctorQuery = query(collection(db, 'doctors'), where('name', '==', doctorName)); //Used to find doctor by name.
        const doctorSnapshot = await getDocs(doctorQuery); // Retriving doctor location.
        if (!doctorSnapshot.empty) { // Checking doctor is not empty.
          const doctorId = doctorSnapshot.docs[0].id; // After getting doctor id from same location.
          const appointmentsQuery = query(collection(db, 'appointments'), where('selectedDoctor', '==', doctorId)); //Used to find appointment for that doctor.
          const appointmentsSnapshot = await getDocs(appointmentsQuery);// Getting location of appointment.
          const appointmentsData = []; // Storing to appointment details in empty set.
          appointmentsSnapshot.forEach((doc) => { // Check through each appointment.
            appointmentsData.push({ id: doc.id, ...doc.data() }); //Send the appointment data to it with id and details.
          });
          const currentDate = new Date(); //Getting the current time that is present in device.
          const upcomingAppointments = appointmentsData.filter(appointment => { //Exclude appointemnts to get upcoming appointment.
            const appointmentDate = appointment.appointmentDate.toDate(); // Coneverting it to object. 
            return appointmentDate > currentDate; // Checking dates of appointment are after or on the day of current date.
          });
          setAppointments(upcomingAppointments); //Adding state with appoinment.
        } else {
          console.log('Doctor not found'); // It occurs when doctor not found.
        }
      } catch (error) {
        console.error('Error fetching appointments: ', error);
      }
    };
    fetchAppointments(); //Used to call function.
  }, [doctorName]); //Dependency array with doctor name in use effect.

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleCancel = async (appointmentId) => {
    try {
      await deleteDoc(doc(db, 'appointments', appointmentId)); // Used to delete data from firestore.
      const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);//Remove the cancel appointment dates from existing.
      setAppointments(updatedAppointments); //Show updated appointments.
    } catch (error) {
      console.error('Error cancelling appointment: ', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeMessage}>Welcome, Dr. {doctorName}!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.dashboardSection}>
        <Text style={styles.sectionTitle}>Upcoming Appointments:</Text>
        {appointments.length > 0 ? ( //Checking if their is any upcoming appointment or not.
          <FlatList
            data={appointments} //If it is none then push appointments to it.
            //Gathering all the items in it.
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.appointmentCard}>
                <Text style={styles.appointmentInfo}>
                  Patient: {item.patientName}{'\n'}
                  Date: {item.appointmentDate.toDate().toLocaleDateString()}{'\n'}
                  Time: {item.appointmentTime}
                </Text>
                <TouchableOpacity style={styles.CancelButton} onPress={() => handleCancel(item.id)}>
                  <Text style={styles.CancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text>No upcoming appointments.</Text>
        )}
      </View>
      <View style={styles.dashboardSection}>
        <Text style={styles.sectionTitle}>Patient Records:</Text>
        <Text>View and manage patient records.</Text>
      </View>
      <View style={styles.dashboardSection}>
        <Text style={styles.sectionTitle}>Messages:</Text>
        <Text>Communicate with patients and colleagues.</Text>
      </View>
      <Footer/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dashboardSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  appointmentInfo: {
    fontSize: 16,
  },
  CancelButton: {
    backgroundColor: '#0954a5',
    padding: 10,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  CancelButtonText: {
    color: 'white',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#0954a5',
    padding: 6,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default DoctorHome;
