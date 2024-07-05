import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import Footer from './Footer';

const MeditationSession = ({ navigation, route }) => {
  const { email } = route.params;

//Function for redirecting to youtube.
  const redirectToYouTubePlaylist = () => {
    //Indicating Id of playlist.
    const playlistId = 'PLCr82oDz4rx8Z3nunsF7jb7nFWQGtOchA';
    //Making URL of youtube with above ID.
    const youtubePlaylistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
    //Open it with the help linking from react moduel.
    Linking.openURL(youtubePlaylistUrl);
  };

  const handleBack = () => {
    navigation.navigate('PatientHome', { email: email });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={handleBack}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Meditation Session</Text>
      <Text style={styles.description}>
        Immerse yourself in tranquility with our pre-recorded meditation sessions on YouTube.
      </Text>
      <Image
        source={require('../assets/Meditationsession.png')} 
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={redirectToYouTubePlaylist}>
        <Text style={styles.buttonText}>Open Playlist</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 550,
    marginBottom: 20,
  },
  button: {
backgroundColor: '#0954a5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    color: '#0954a5',
    fontSize: 18,
    right:'620px',
  },
});

export default MeditationSession;