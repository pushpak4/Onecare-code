import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const InfoCard = ({ title, description,imageSource, onPress }) => (
  <TouchableOpacity style={styles.infoCard} onPress={onPress}>
    <Image source={imageSource} style={styles.infoCardImage} />
    <Text style={styles.infoCardTitle}>{title}</Text>
    <Text style={styles.infoCardDescription}>{description}</Text>
  </TouchableOpacity>
);

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2024 OneCare. All Rights Reserved.</Text>
  </View>
);

const PatientHome = ({ route }) => {
  const { email } = route.params || {};
  const navigation = useNavigation();

  const handleSearchDoctor = () => {
    navigation.navigate('SearchDoctor', { email });
  };
  const SymptomsTracker = () => {
    navigation.navigate('SymptomsTracker', { email });
  };
  const MeditationSession = () => {
    navigation.navigate('MeditationSession', { email });
  };
  const MedicationReminder = () => {
    navigation.navigate('MedicationReminder', { email });
  };

  const labTestBooking = () => {
    navigation.navigate('LabTestBooking', { email });
  };
  const healthresources = () => {
    navigation.navigate('HealthResources', { email });
  };
  const handleLogout = () => {
    navigation.navigate('Login');
  };
  const  handleDiet = () => {
    navigation.navigate('DietDisplay');
  };

  const PrescriptionUpload = () => {
    navigation.navigate('PrescriptionUpload', { email });
  };

  const ChildVaccine = () => {
    navigation.navigate('ChildVaccine', { email });
  };
  const CalorieCount = () => {
    navigation.navigate('CalorieCount');
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeMessage}>Welcome, {email}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bannerContainer}>
        <Image
          source={require('../assets/doctor-picture.png')}
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerText}>
            Health comes first
          </Text>
          <Text style={styles.bannerSubtitle}>
            Find your Doctor and make an Appointment. On-demand healthcare services at your fingertips.
          </Text>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bookAppointmentButton}
            onPress={() => navigation.navigate('AppointmentBooking', { email })}
          >
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookAppointmentButton}
            onPress={() => navigation.navigate('ManageAppointments', { email })}
          >
            <Text style={styles.buttonText}>Manage  my appointments</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.title}>Explore various features to manage your health needs:</Text>

      <View style={styles.infoCardsContent}>
        <View style={styles.infoCardsRow}>
          <InfoCard
            imageSource={require('../assets/features/SymptomChecker.webp')}
            title="Symptoms Tracker"
            description="Effortlessly track your symptoms and health metrics with our intuitive Symptoms Tracker feature. Stay informed about your health status and easily share relevant information with your healthcare provider for personalized care."
            onPress={SymptomsTracker}
          />
          <InfoCard
            imageSource={require('../assets/features/MeditationSessions.jpeg')}
            title="Meditation sessions"
            description="Take a moment to prioritize your mental well-being with our Stress Management feature. Access a library of guided meditation sessions and relaxation techniques designed to promote mindfulness and reduce stress levels."
            onPress={MeditationSession}
          />
            </View>
          <View style={styles.infoCardsRow}>
          <InfoCard
           imageSource={require('../assets/features/medicationReminder2.jpeg')}
            title="Medication Reminder"
            description="Stay on top of your medication schedule with our Medication Reminder feature. Set up reminders for medication doses, refill dates, and doctor appointments to ensure you never miss an important healthcare task."
            onPress={MedicationReminder}
          />
          <InfoCard
          imageSource={require('../assets/features/SearchDoctor.jpeg')}
            title="Search a Doctor"
            description="Find the right healthcare provider for your needs with our Search a Doctor feature. Browse through a curated list of doctors, apply filters based on specialty, location, and availability, and book appointments with ease."
            onPress={handleSearchDoctor}
          />
          </View>
          <View style={styles.infoCardsRow}>
          <InfoCard
          imageSource={require('../assets/features/LabTest.jpeg')}
            title="Lab Test Booking"
            description="Book lab tests hassle-free. Our platform offers a seamless experience for scheduling lab tests. Choose from a variety of tests, select a convenient location, and schedule your appointment with ease."
            onPress={labTestBooking}
          />
          <InfoCard
          imageSource={require('../assets/features/HealthResources.jpeg')}
            title="Health resources"
            description="Discover a wealth of health resources at your fingertips. Access valuable information, articles, and tips to enhance your well-being. Stay informed and take charge of your health journey with our comprehensive health resources."
            onPress={healthresources}
          />
        </View>
        <View style={styles.infoCardsRow}>
          <InfoCard
          imageSource={require('../assets/features/dietbanner.jpeg')}
            title="Diet Display"
            description="Find the right  diet plans tailored to your specific medical condition. Whether you're managing diabetes, hypertension, or high cholesterol, find curated meal recommendations designed to support your health and well-being."
            onPress={handleDiet}
          />
          <InfoCard
          imageSource={require('../assets/features/prescriptionIcon.jpeg')}
            title="Manage Prescriptions"
            description="Easily upload and share your prescriptions with healthcare providers using our Prescription Management feature. Keep track of your medications and ensure timely refills. Take control of your health journey with convenience and efficiency."
            onPress={PrescriptionUpload}
          />
          </View>
          <View style={styles.infoCardsRow}>
          <InfoCard
          imageSource={require('../assets/features/ChildVaccine.jpeg')}
            title="Child Vaccination"
            description="Stay up-to-date with your child's vaccination schedule and ensure their optimal health with our Child Vaccination feature. Access information on recommended vaccines, track vaccination history, and receive reminders for upcoming immunizations."
            onPress={ChildVaccine}
          />
          <InfoCard
          imageSource={require('../assets/features/CalorieCount.png')}
            title="CalorieCounter"
            description="Find the right  diet plans tailored to your specific medical condition. Whether you're managing diabetes, hypertension, or high cholesterol, find curated meal recommendations designed to support your health and well-being."
            onPress={CalorieCount}
          />
        </View>
        
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#0954a5',
    padding: 8,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
  },
  bannerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bannerImage: {
    width: '40%', 
    height: 400,
    borderRadius: 8,
  },
  bannerTextContainer: {
    flex: 1,
    paddingLeft: 90,
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  bannerSubtitle: {
    fontSize: 16,
    marginBottom: 10,
   
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10, 
  },
  bookAppointmentButton: {
    backgroundColor: '#0954a5',
    padding: 9,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 'auto',

  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  infoCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20, 
  },

  infoCard: {
    width: '48%', 
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
    elevation: 4, 
  },

  infoCardTitle: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoCardDescription: {
    color: 'light-blue',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#333',
    fontSize: 12,
  },
  infoCardImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default PatientHome;