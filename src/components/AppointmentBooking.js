import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Picker,Platform } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from '../firebase'; 
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore"; 
import emailjs from 'emailjs-com'; //Importing emailjs library.
import Footer from './Footer';

const AppointmentBooking = ({ navigation, route }) => {
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState('');
  const [preferredMode, setPreferredMode] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDoctorName, setSelectedDoctorName] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const { email } = route.params;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsRef = collection(db, 'doctors');
        const doctorsSnapshot = await getDocs(doctorsRef);
        const doctorsData = doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAvailableDoctors(doctorsData);
      } catch (error) {
        console.error('Error fetching doctors: ', error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchBookedAppointments = async () => {
      try {
        const appointmentsRef = collection(db, 'appointments');
        const appointmentsSnapshot = await getDocs(appointmentsRef);
        const appointmentsData = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookedAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments: ', error);
      }
    };
    fetchBookedAppointments();
  }, [selectedDoctor]);

  const generateTimeSlots = (doctorAvailability, bookedAppointments) => {
    const availableSlots = []; //Creating an array to store time slot.
    const currentDate = new Date(); //Getting current date.
    const selectedDate = new Date(appointmentDate); // Getting selected date.
    const bookedSlots = bookedAppointments
    .filter(appointment => 
      appointment.selectedDoctor === selectedDoctor &&
      appointment.appointmentDate.toDate().toDateString() === selectedDate.toDateString())
    .map(appointment => appointment.appointmentTime); // Th is step is used to filter selected doctor, date and time.
    const startHour = currentDate.getDate() === selectedDate.getDate() ? Math.max(currentDate.getHours() + 1, 11) : 10; //This is used for calculating hours available for that day.
    for (let i = startHour; i <= 17; i++) { //Looping hours from start to 5pm.
      if (i === 17 && currentDate.getMinutes() > 30) continue; // It is used to skip the for beyond 30 minutes.
      const hour = i < 10 ? '0' + i : i; //formating hour.
      const slot = `${hour}:00`; // Creating full hour slot.
      const halfSlot = `${hour}:30`; // Creating half hour slot.
      //Checks the booking and if slot is not booked then it is added into slot if not it will not add to slots for booking.
      if (!bookedSlots.includes(slot)) {
        availableSlots.push(slot);
      }
      if (!bookedSlots.includes(halfSlot)) {
        availableSlots.push(halfSlot);
      }
    }
    return availableSlots;
  };

  const handleSubmit = async () => {
    if (!patientName || !patientEmail || !patientGender || !appointmentTime || !preferredMode || !selectedDoctor) {
      alert('Please complete all fields.');
      return;
    }

    try {
      const appointmentData = {
        patientName,
        patientEmail,
        patientGender,
        appointmentDate,
        appointmentTime,
        preferredMode,
        selectedDoctor,
        selectedDoctorName,
        createdAt: Timestamp.fromDate(new Date()),
        userEmail: email, 
      };
      await addDoc(collection(db, 'appointments'), appointmentData);
      setBookedAppointment(appointmentData);
      setPatientName('');
      setPatientEmail('');
      setPatientGender('');
      setAppointmentDate(new Date());
      setAppointmentTime('');
      setPreferredMode('');
      setSelectedDoctor('');
      setSelectedDoctorName('');
      
      //Creating templates for email and parameter ar used in this are obtained from above field.
      const templateParams = {
        patientName: patientName,
        patientEmail: patientEmail,
        appointmentDate: appointmentDate.toLocaleDateString(),
        appointmentTime: appointmentTime,
        selectedDoctor: selectedDoctorName,
        preferredMode: preferredMode
      };
      //This is used for connecting the app with emailjs and using emailjs library with sepicific information like service, template and Id.
      await emailjs.send('service_i0f9ait', 'template_jeec3gu', templateParams, 'JuIkNzbfGilrBdDNs');
      alert('Appointment is sucessfully booked and deatils has been sent to mail.');
      navigation.navigate('PatientHome',{email});
    } catch (error) {
      console.error('Error adding appointment: ', error);
      alert('Unable to book an appointment,');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
       
      <Text style={styles.title}>Appointment Booking</Text>
     
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Patient Name"
          value={patientName}
          onChangeText={(text) => setPatientName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Patient Email"
          value={patientEmail}
          onChangeText={(text) => setPatientEmail(text)}
        />
        <Picker
          style={styles.input}
          selectedValue={patientGender}
          onValueChange={(value) => setPatientGender(value)}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="I will inform Doctor only" value="private" />
        </Picker>
        <Picker
          style={styles.input}
          selectedValue={selectedDoctor}
          onValueChange={(value, index) => {
            setSelectedDoctor(value);
            setSelectedDoctorName(availableDoctors.find(doctor => doctor.id === value)?.name || '');
          }}>
          <Picker.Item label="Select Doctor" value="" />
          {availableDoctors.map((doctor) => (
            <Picker.Item key={doctor.id} label={doctor.name} value={doctor.id} />
          ))}
        </Picker>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.label}>Appointment Date</Text>
            <DatePicker
              selected={appointmentDate}
              onChange={(date) => setAppointmentDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Appointment Date"
              style={{ ...styles.input, width: Platform.OS === 'ios' ? '100%' : 'auto' }}
            />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.label}>Appointment Time</Text>
            <Picker
              style={{ ...styles.input, width: Platform.OS === 'ios' ? '100%' : 'auto' }}
              selectedValue={appointmentTime}
              onValueChange={(value) => setAppointmentTime(value)}>  {/* When a time slot is booked then it will take that use it and change the existing state of time. */}
              <Picker.Item label="Select Time" value="" />
              {/*Mapping available time slots that are obtained from generated time slot and rendering this compnents for each available slots.*/}
              {generateTimeSlots([], bookedAppointments.filter(appointment => appointment.selectedDoctor === selectedDoctor)).map((time, index) => (
                <Picker.Item key={index} label={time} value={time} disabled={bookedAppointment && time === bookedAppointment.appointmentTime} />
                //The above line is picker item which consists of key, label, value and disabled of booked appointments. 
              ))}
            </Picker>
          </View>
        </View>
        <Picker
          style={styles.input}
          selectedValue={preferredMode}
          onValueChange={(value) => setPreferredMode(value)}>
          <Picker.Item label="Select Mode" value="" />
          <Picker.Item label="Voice Call" value="voice" />
          <Picker.Item label="Video Call" value="video" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
      <Footer/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  backButton: {
    fontSize: 18,
    color: '#0954a5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateContainer: {
    flex: 1,
    marginRight: 10,
  },
  timeContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#0954a5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AppointmentBooking;
