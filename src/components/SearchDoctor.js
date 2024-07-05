import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Picker, Linking,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';



const SearchDoctor = () => {
  const navigation = useNavigation();
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  //The below consists of doctors and their details to select.
  const handleSearch = () => {
    const results = [
      { name: 'Dr. John Doe', specialty: 'Cardiologist', location: 'New York', email: 'john.doe@example.com' ,photo: require('../assets/doctors/doctor1.png')},
      { name: 'Dr. Jane Smith', specialty: 'Dermatologist', location: 'Los Angeles', email: 'jane.smith@example.com',photo: require('../assets/doctors/doctor2.png') },
      { name: 'Dr. Michael Johnson', specialty: 'Orthopedic Surgeon', location: 'California', email: 'michael.johnson@example.com',photo: require('../assets/doctors/doctor3.png') },
      { name: 'Dr. Emily Williams', specialty: 'Pediatrician', location: 'Texas', email: 'emily.williams@example.com',photo: require('../assets/doctors/doctor4.png') },
      { name: 'Dr. Robert Brown', specialty: 'Neurologist', location: 'Florida', email: 'robert.brown@example.com',photo: require('../assets/doctors/doctor5.png')},
      { name: 'Dr. Sarah Lee', specialty: 'Ophthalmologist', location: 'Illinois', email: 'sarah.lee@example.com',photo: require ('../assets/doctors/doctor6.png') },
      { name: 'Dr. David Martinez', specialty: 'Psychiatrist', location: 'Texas', email: 'david.martinez@example.com',photo: require('../assets/doctors/doctor7.png') },
      { name: 'Dr. Jennifer Garcia', specialty: 'Obstetrician', location: 'California', email: 'jennifer.garcia@example.com',photo: require('../assets/doctors/doctor8.png') },
      { name: 'Dr. Christopher Rodriguez', specialty: 'Endocrinologist', location: 'New York', email: 'christopher.rodriguez@example.com',photo: require('../assets/doctors/doctor9.png') },
      { name: 'Dr. Amanda White', specialty: 'Gynecologist', location: 'Texas', email: 'amanda.white@example.com',photo: require('../assets/doctors/doctor10.png') },
      { name: 'Dr. Daniel Nguyen', specialty: 'Urologist', location: 'California', email: 'daniel.nguyen@example.com',photo: require('../assets/doctors/doctor11.png') },
      { name: 'Dr. Jessica Taylor', specialty: 'Pulmonologist', location: 'Illinois', email: 'jessica.taylor@example.com',photo: require('../assets/doctors/doctor12.png') },
      { name: 'Dr. Matthew Clark', specialty: 'Gastroenterologist', location: 'Florida', email: 'matthew.clark@example.com',photo: require('../assets/doctors/doctor13.png') },
      { name: 'Dr. Ashley Brown', specialty: 'Otolaryngologist', location: 'New York', email: 'ashley.brown@example.com',photo: require('../assets/doctors/doctor14.png') },
      { name: 'Dr. Kevin Martinez', specialty: 'Rheumatologist', location: 'Texas', email: 'kevin.martinez@example.com',photo: require('../assets/doctors/doctor15.png') },
      { name: 'Dr. Rachel Kim', specialty: 'Nephrologist', location: 'California', email: 'rachel.kim@example.com',photo: require('../assets/doctors/doctor16.png') },
      { name: 'Dr. Mark Wilson', specialty: 'Dentist', location: 'Florida', email: 'mark.wilson@example.com',photo: require('../assets/doctors/doctor17.png') },
      { name: 'Dr. Samantha Wright', specialty: 'Allergist', location: 'Texas', email: 'samantha.wright@example.com',photo: require('../assets/doctors/doctor18.png')},
      { name: 'Dr. Joshua Baker', specialty: 'Neonatologist', location: 'New York', email: 'joshua.baker@example.com',photo: require('../assets/doctors/doctor19.png') },
      { name: 'Dr. Elizabeth Nguyen', specialty: 'Geriatrician', location: 'California', email: 'elizabeth.nguyen@example.com',photo: require('../assets/doctors/doctor20.png') },
      { name: 'Dr. Ryan Perez', specialty: 'Plastic Surgeon', location: 'California', email: 'ryan.perez@example.com',photo: require('../assets/doctors/doctor21.png') }
    ];
    //Used for filtering results.
    const filteredResults = results.filter((doctor) =>
    //Below lines are used for finding when it is a lowercase.
      doctor.specialty.toLowerCase().includes(specialty.toLowerCase()) &&
      doctor.location.toLowerCase().includes(location.toLowerCase())
    );
    setSearchResults(filteredResults);
    //It is used to set result for search variable results.
  };


  
  const email = (email) => {
    const subject = 'Schedule a Call'; //Defining subject.
    const body = `Hello Dr. ${email},\n\nI would like to schedule a call with you. Please let me know your availability.\n\nBest regards,`; //Constructing body of the mail.
    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; // Constructing all for safe use.
    Linking.openURL(mailToLink); //It is used to open default mail of user.
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Search Doctor</Text>
      </View>
      <View style={styles.form}>
        <Picker
          style={styles.input}
          selectedValue={specialty}
          onValueChange={(value) => setSpecialty(value)}
        >
        <Picker.Item label="Select Specialty" value="" />
    <Picker.Item label="Cardiologist" value="Cardiologist" />
    <Picker.Item label="Dermatologist" value="Dermatologist" />
    <Picker.Item label="Orthopedic Surgeon" value="Orthopedic Surgeon" />
    <Picker.Item label="Pediatrician" value="Pediatrician" />
    <Picker.Item label="Neurologist" value="Neurologist" />
    <Picker.Item label="Ophthalmologist" value="Ophthalmologist" />
    <Picker.Item label="Psychiatrist" value="Psychiatrist" />
    <Picker.Item label="Obstetrician" value="Obstetrician" />
    <Picker.Item label="Endocrinologist" value="Endocrinologist" />
    <Picker.Item label="Gynecologist" value="Gynecologist" />
    <Picker.Item label="Urologist" value="Urologist" />
    <Picker.Item label="Pulmonologist" value="Pulmonologist" />
    <Picker.Item label="Gastroenterologist" value="Gastroenterologist" />
    <Picker.Item label="Otolaryngologist" value="Otolaryngologist" />
    <Picker.Item label="Rheumatologist" value="Rheumatologist" />
    <Picker.Item label="Nephrologist" value="Nephrologist" />
    <Picker.Item label="Dentist" value="Dentist" />
    <Picker.Item label="Allergist" value="Allergist" />
    <Picker.Item label="Neonatologist" value="Neonatologist" />
    <Picker.Item label="Geriatrician" value="Geriatrician" />
    <Picker.Item label="Plastic Surgeon" value="Plastic Surgeon" />
        </Picker>
        <Picker
          style={styles.input}
          selectedValue={location}
          onValueChange={(value) => setLocation(value)}
        >
           <Picker.Item label="Select Location" value="" />
    <Picker.Item label="New York" value="New York" />
    <Picker.Item label="Los Angeles" value="Los Angeles" />
    <Picker.Item label="California" value="California" />
    <Picker.Item label="Texas" value="Texas" />
    <Picker.Item label="Florida" value="Florida" />
    <Picker.Item label="Illinois" value="Illinois" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Search Results:</Text>
          {searchResults.map((doctor, index) => (
            <View key={index} style={styles.resultItem}>
              <Image source={doctor.photo} style={styles.doctorPhoto} />
              <Text>Name: {doctor.name}</Text>
              <Text>Specialty: {doctor.specialty}</Text>
              <Text>Location: {doctor.location}</Text>
              <TouchableOpacity style={styles.scheduleButton} onPress={() => email(doctor.email)}>
                <Text style={styles.scheduleButtonText}>Email Doctor</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#0954a5',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    borderRadius: 5,
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
  resultsContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    marginBottom: 20,
  },
  scheduleButton: {
    backgroundColor: '#0954a5',
    padding: 10,
    width:'10%',
    borderRadius: 5,
    alignItems: 'left',
    marginTop: 10,
  },
  scheduleButtonText: {
    color: 'white',
    fontSize: 16,
  },
  doctorPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
});

export default SearchDoctor;
