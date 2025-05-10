import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Image, ImageBackground, } from 'react-native';
import { useRouter } from "expo-router";

const trimestres = ['1er trimestre', '2eme trimestre', '3eme trimestre'];

const matieres = [
  'Arabe',
  'Tamazight',
  'Français',
  'Anglais',
  'Physique',
  'Mathématiques',
  'Histoire-Géographie',
];

const colonnes = ['CC', 'Devoir1', 'Devoir2', 'Examen'];


const BulletinScreen = () => {
    const router = useRouter();
  return (
    <View  style={{ flex: 1 }}>

        <View style={styles.header}>
              <TouchableOpacity  onPress={() => router.back()}>
                <Text style={styles.backArrow}>
                  <Image source={require("assets/images/image copy.png")} style={styles.bellIcon} />
                </Text>
              </TouchableOpacity>
              <Text style={styles.appTitle}>MySchool</Text>
             
            </View>
      
            {/* Image Background */}
            <ImageBackground
              source={require("assets/images/backgroundadmin.png")}
              style={{ height: 189 }}
            >
              <Text style={styles.text}> Notes</Text>
            </ImageBackground>
      {/* Scroll horizontal pour les trimestres */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trimestreContainer}>
        {trimestres.map((item, index) => (
          <TouchableOpacity key={index} style={styles.trimestreButton}>
            <Text style={styles.trimestreText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Scroll horizontal pour le tableau */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* En-tête */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.matieresHeader]}>Matière</Text>
            {colonnes.map((col, index) => (
              <Text key={index} style={styles.headerCell}>{col}</Text>
            ))}
          </View>

          {/* Lignes des matières */}
          {matieres.map((matiere, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={[styles.cell, styles.matieresCell]}>{matiere}</Text>
              {colonnes.map((_, i) => (
                <Text key={i} style={styles.cell}>—</Text> // Valeurs non modifiables
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Moyenne générale */}
      <View style={styles.moyenneContainer}>
        <Text style={styles.moyenneText}>moyenne générale :</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  trimestreContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  trimestreButton: {
    backgroundColor: '#2c22b0',
    borderRadius: 50,
    paddingHorizontal: 30, // espace gauche/droite
    paddingVertical: 0,   // espace haut/bas
    marginRight: 10,
    marginTop: 5,

    justifyContent: 'center',
    alignItems: 'center',
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
rolesContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-around",
  paddingVertical: 30,
  paddingHorizontal: 10,
},
card: {
  width: "40%",
  backgroundColor: "#fff",
  borderRadius: 12,
  alignItems: "center",
  paddingVertical: 20,
  marginBottom: 20,
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
roleImage: {
  width: 60,
  height: 60,
  marginBottom: 10,
  resizeMode: "contain",
},
roleText: {
  fontSize: 16,
  fontWeight: "500",
  color: "#333",
},
});

export default BulletinScreen;
