import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import { useRouter } from "expo-router";

const trimestres = ['1er trimestre', '2eme trimestre', '3eme trimestre'];

const eleves = [
  'Ahmed Benali', 'Sara Boudiaf', 'Khaled Amrane', 'Leila Cherif', 
  'Leila Cherif', 'Leila Cherif', 'Leila Cherif', 'Leila Cherif', 
  'Leila Cherif', 'Leila Cherif', 'Leila Cherif', 'Leila Cherif',
  'Leila Cherif', 'Leila Cherif', 'Leila Cherif', 'Leila Cherif', 
  'Leila Cherif', 'Leila Cherif', 'Leila Cherif', 'Leila Cherif',
  'Leila Cherif', 'Leila Cherif', 'Leila Cherif', 'Leila Cherif',
  'Leila Cherif', 'Leila Cherif', 'Leila Cherif', 'Leila Cherif', 
  'Leila Cherif', 'Leila Cherif', 'Leila Cherif', 'Leila Cherif', 
  'Leila Cherif', 'Leila Cherif'
];

const colonnes = ['CC', 'Devoir1', 'Devoir2', 'Examen'];

const SaisieNotesScreen = () => {
  const router = useRouter();
  const [notes, setNotes] = useState<Record<string, Record<string, string>>>({});

  const handleNoteChange = (eleve: string, col: string, value: string) => {
    setNotes(prev => ({
      ...prev,
      [eleve]: {
        ...prev[eleve],
        [col]: value,
      },
    }));
  };

  const validerNotes = () => {
    console.log('Notes validées :', notes);
    // Ici on peut envoyer les notes à la base de données
  };

  return (
    <View style={{ flex: 1 }}>

      <View style={styles.header}>
        <TouchableOpacity  onPress={() => router.push('/src/Firstpage/Enseignant/espaceenseignant')}>
          <Text style={styles.backArrow}>
            <Image source={require("assets/images/image copy.png")} style={styles.bellIcon} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.appTitle}>MySchool</Text>
      </View>

      <ImageBackground
        source={require("assets/images/backgroundadmin.png")}
        style={{ height: 189 }}
      >
        <Text style={styles.text}>Saisie des Notes</Text>
      </ImageBackground>

      <View style={styles.fixedTrimesterButtons}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trimestres.map((item, index) => (
            <TouchableOpacity key={index} style={styles.trimestreButton}>
              <Text style={styles.trimestreText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.matieresHeader]}>Élève</Text>
            {colonnes.map((col, index) => (
              <Text key={index} style={styles.headerCell}>{col}</Text>
            ))}
          </View>

          <ScrollView style={styles.studentList} contentContainerStyle={{ paddingBottom: 20 }}>
            {eleves.map((eleve, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={[styles.cell, styles.matieresCell]}>{eleve}</Text>
                {colonnes.map((col, i) => (
                  <TextInput
                    key={i}
                    style={styles.cellInput}
                    keyboardType="numeric"
                    placeholder="—"
                    onChangeText={value => handleNoteChange(eleve, col, value)}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.moyenneContainer} onPress={validerNotes}>
        <Text style={styles.moyenneText}>Valider</Text>
      </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2c22b0",
    height: 60,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backArrow: {
    fontSize: 24,
    color: "#fff",
  },
  appTitle: {
    marginRight: 256,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bellIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFD700",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 50,
  },
  trimestreContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  trimestreButton: {
    backgroundColor: '#2c22b0',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  trimestreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  headerCell: {
    width: 80,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    width: 80,
    padding: 10,
    textAlign: 'center',
  },
  matieresHeader: {
    width: 140,
    textAlign: 'left',
  },
  matieresCell: {
    width: 140,
    textAlign: 'left',
  },
  cellInput: {
    width: 80,
    padding: 10,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  moyenneContainer: {
    marginTop: 20,
    marginHorizontal: 30,
    backgroundColor: '#2c22b0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  moyenneText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentList: {
    maxHeight: '100%', // Set a limit to avoid excessive scrolling
  },
  fixedTrimesterButtons: {
  
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
    borderTopWidth: 0,
  
  },
});

export default SaisieNotesScreen;
