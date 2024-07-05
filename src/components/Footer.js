import React from 'react'; //Importing react library.
import { View, Text, StyleSheet } from 'react-native'; // Importing all necessary components from react-native, which requires for the page. 

//Defining footer component.
const Footer = () => (
  <View style={styles.footer}> {/* Indicating style for footer. */}
    <Text style={styles.footerText}>© 2024 OneCare. All Rights Reserved.</Text>  {/* Indicating footer text of copy right information and also adding footer text. */}
  </View>
);

//creating style for footer and footer text.
const styles = StyleSheet.create({
  footer: {    // Indicating footer container.
    width: '100%', // Initializing width for it.
    backgroundColor: '#white', // Initializing background color for it.
    padding: 10,   // Initializing padding unit for footer.
    alignItems: 'center', //Setting its align items to center.  
  },
  footerText: {   // Indicating footer text which is inside footer container,  
    color: '#333', // Setting color for footer text.
    fontSize: 12, // Setting font size to text.
    fontWeight: 'bold',  // Setting font weight to text.
  },
});

export default Footer;   //Exporting components from this footer page.
