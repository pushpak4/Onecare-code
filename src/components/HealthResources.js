import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from './Footer';

const InfoCard = ({ title, description, imageSource }) => (
  <TouchableOpacity style={styles.infoCard}>
    <Image source={imageSource} style={styles.infoCardImage} />
    <Text style={styles.infoCardTitle}>{title}</Text>
    <Text style={styles.infoCardDescription}>{description}</Text>
  </TouchableOpacity>
);

const HealthResources = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;

  const handleGoBack = () => {
    navigation.goBack({ email });
  };
//This code is almost similar to patient home page and names and few changes have made in it.
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Health Resources:</Text>
      <Text style={styles.subtitle}>Explore various health resources to improve your well-being.</Text>
      <View style={styles.infoCardsContent}>
        <View style={styles.infoCardsRow}>
          <InfoCard
           title="Fitness Workouts"
           description="Discover effective fitness workouts to stay active and improve your physical health."
           imageSource={require('../assets/HealthResources/first.png')}
          />
          <InfoCard
          title="Nutrition Tips"
          description="Explore valuable nutrition tips to maintain a healthy diet and lifestyle."
          imageSource={require('../assets/HealthResources/second.png')}
          />
          <InfoCard
          title="Healthy Routine"
          description="Learn tips to leed healthy and happy life."
          imageSource={require('../assets/HealthResources/third.png')}
          />
        </View>
        <View style={styles.infoCardsRow}>
          <InfoCard
           title="Mental Wellness"
           description="Learn about mental wellness and find resources to support your mental health."
           imageSource={require('../assets/HealthResources/fourth.png')}
          />
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    fontSize: 18,
    color: '#0954a5',
  },
  title: {
    fontSize: 46,
    fontWeight: 'bold',
    marginBottom: 150,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  infoCard: {
    height: 400,
    width: 350,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 30,
    borderWidth: 1,
    borderColor: 'black',
    elevation: 10, 
  },
  infoCardTitle: {
    color: 'blue',
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20, 
    textAlign: 'center',
  },
  infoCardDescription: {
    color: 'light-blue',
    fontSize: 18, 
    textAlign: 'center',
  },
  infoCardImage: {
    width: 200, 
    height: 200, 
    marginBottom: 20, 
    alignSelf: 'center',
  },
});

export default HealthResources;
