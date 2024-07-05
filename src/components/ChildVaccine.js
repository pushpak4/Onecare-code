import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { db } from '../firebase'; 
import { collection, addDoc } from "firebase/firestore";
import Footer from './Footer';

const ChildVaccine = ({ route, navigation }) => {
  const { email } = route.params;
  const [dummyVaccines] = useState([
    {
      name: "Vaccine A",
      whenToGive: "One Month",
      dose: "1",
      Route: "Oral",
      site: "Left thigh",
      schedule: false,
    },
    {
      name: "Vaccine B",
      whenToGive: "Six Months",
      dose: "2",
      Route: "Intramuscular",
      site: "Right arm",
      schedule: false,
    },
    {
      name: "Vaccine C",
      whenToGive: "One Year",
      dose: "3",
      Route: "Subcutaneous",
      site: "Left shoulder",
      schedule: false,
    },
  ]);

  const [isAddVaccineFormOpen, setIsAddVaccineFormOpen] = useState(false);
  const [selectedVaccineIndex, setSelectedVaccineIndex] = useState(null);
  const [parentName, setParentName] = useState('');
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState('');
  const [newChildGender, setNewChildGender] = useState('');
  const [newChildPhoto, setNewChildPhoto] = useState(null);



  const handleSchedule = (index) => {
    setSelectedVaccineIndex(index);
    setParentName(''); 
    setIsAddVaccineFormOpen(true);
  };

  const add = async () => {
    try {
      const selectedVaccine = dummyVaccines[selectedVaccineIndex];
      const childData = {
        parentName: parentName,
        childName: newChildName,
        childAge: newChildAge,
        childGender: newChildGender,
        childPhoto: newChildPhoto,
        email: email,
        vaccine: selectedVaccine 
      };
      const docRef = await addDoc(collection(db, "children"), childData);
      console.log("Child added with ID: ", docRef.id);
      alert(
        `Vaccination is successfully added for ${newChildName} and reminder also set for vaccine: ${selectedVaccine.name}`
      );
      setParentName('');
      setNewChildName('');
      setNewChildAge('');
      setNewChildGender('');
      setNewChildPhoto(null);
      setIsAddVaccineFormOpen(false); //This is used to hide form until user option is not performed.
    } catch (error) {
      console.error("Error adding child: ", error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]; // Use for getting the file.
    const reader = new FileReader(); // Creating filereader object.
    reader.onloadend = () => { //After reading converting it into string base64.
      setNewChildPhoto(reader.result);
    };
    reader.readAsDataURL(file); //Reading URL of file.
  };

  return (
    <ScrollView>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("PatientHome", { email: email })}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableContainer}>
        <Text style={styles.heading}>Vaccination Information</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Name</Text>
            <Text style={styles.tableHeader}>When to Give</Text>
            <Text style={styles.tableHeader}>Dose</Text>
            <Text style={styles.tableHeader}>Route</Text>
            <Text style={styles.tableHeader}>Site</Text>
            <Text style={styles.tableHeader}>Schedule</Text>
          </View>
          {dummyVaccines.map((vaccine, index) => {
            return (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableData}>{vaccine.name}</Text>
                <Text style={styles.tableData}>{vaccine.whenToGive}</Text>
                <Text style={styles.tableData}>{vaccine.dose}</Text>
                <Text style={styles.tableData}>{vaccine.Route}</Text>
                <Text style={styles.tableData}>{vaccine.site}</Text>
                <Text style={styles.tableData}>
                  <TouchableOpacity onPress={() => handleSchedule(index)}>
                    <Text style={styles.tableStatus}>Schedule</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      {isAddVaccineFormOpen && (
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Add A Child</Text>
          <TextInput
            placeholder="Enter Parent's Name"
            style={styles.input}
            value={parentName}
            onChangeText={text => setParentName(text)}
          />
          <TextInput
            placeholder="Enter Child's Name"
            style={styles.input}
            value={newChildName}
            onChangeText={text => setNewChildName(text)}
          />
          <TextInput
            placeholder="Enter Child's Age"
            style={styles.input}
            value={newChildAge}
            onChangeText={text => setNewChildAge(text)}
          />
          <TextInput
            placeholder="Enter Child's Gender"
            style={styles.input}
            value={newChildGender}
            onChangeText={text => setNewChildGender(text)}
          />
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          <TouchableOpacity onPress={add} style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
      <Footer />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  backButton: {
    fontSize: 18,
    color: '#0954a5',
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 8,
  },
  tableHeader: {
    flex: 1,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableData: {
    flex: 1,
    textAlign: "center",
  },
  tableStatus: {
    backgroundColor: "#33cc33",
    padding: 5,
    height: 30,
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tableStatusBlue: {
    backgroundColor: "#0954a5",
    padding: 5,
    color: "#fff",
    paddingHorizontal: 20,
    width: "auto",
    height: 30,
    borderRadius: 5,
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 8,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChildVaccine;
