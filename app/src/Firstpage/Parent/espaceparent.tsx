

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {View, Text,StyleSheet,Image, TouchableOpacity,ImageBackground, ScrollView,Modal, Alert,} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SelectionEnfentedt from './enfantsedt'; // ← bien importé
import SelectionEnfentRemarque from './enfantsremarque';
import SelectionEnfentNote from './enfantsnote';
import SelectionEnfentAbsences from './enfantsabsences';

const roles = [
  { label: "annonces", image: require("assets/images/annonce.png") },
  { label: "notes", image: require("assets/images/note2.png") },
  { label: "edt", image: require("assets/images/ddt.png") },
  { label: "remarques", image: require("assets/images/remarque2.png") },
  { label: "absences", image: require("assets/images/abcence.png") },

];

const first = () => {
  const router = useRouter();
  
const [noteVisible, setNoteVisible] = useState(false);
const [absenceVisible, setAbsenceVisible] = useState(false);
const [remarqueVisible, setremarqueVisible] = useState(false);
const [edtVisible, setedtVisible] = useState(false);

  const handleRolePress = (roleLabel: string) => {
    switch (roleLabel.toLowerCase()) {
      case "annonces":
        router.push("/src/Firstpage/Eleve/annonce");
        break;
      case "notes":
        setNoteVisible(true); // ← ici on affiche le modal
        break;
      case "edt":
        setedtVisible(true);
        break;
      case "remarques":
        setremarqueVisible(true);
        break;
        case "absences":
          setAbsenceVisible(true);
          break;
      default:
        break;
    }

  };
  const [menuVisible, setMenuVisible] = useState(false);
  const handleProfile = () => {
     router.push("/src/Firstpage/Parent/profilparent");
     setMenuVisible(false);
   };
 
   const handleLanguage = () => {
     Alert.alert("Langue", "Changement de langue à implémenter");
     setMenuVisible(false);
   };
 
   const handleLogout = () => {
     Alert.alert("Déconnexion", "Déconnecté avec succès !");
     setMenuVisible(false);
     // router.replace("/login"); // si tu veux rediriger
   };
  return (
    <View style={{ flex: 1 }}>
        <Modal
        transparent
        animationType="fade"
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={handleProfile}>
              <MaterialIcons name="person" size={24} color="black" />
              <Text style={styles.menuText}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLanguage}>
              <MaterialIcons name="language" size={24} color="black" />
              <Text style={styles.menuText}>Langue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <MaterialIcons name="power-settings-new" size={24} color="black" />
              <Text style={styles.menuText}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
        {/* Modal */}
        <TouchableOpacity onPress={() => setNoteVisible(true)}>
  
  </TouchableOpacity>
  
  <TouchableOpacity onPress={() => setAbsenceVisible(true)}>
    
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setremarqueVisible(true)}>
    
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setedtVisible(true)}>
    
    </TouchableOpacity>
  
  <SelectionEnfentedt visible={edtVisible} onClose={() => setedtVisible(false)} />
  <SelectionEnfentRemarque visible={remarqueVisible} onClose={() => setremarqueVisible(false)}  />
  <SelectionEnfentNote visible={noteVisible} onClose={() => setNoteVisible(false)} />
  <SelectionEnfentAbsences visible={absenceVisible} onClose={() => setAbsenceVisible(false)} />

  
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity  onPress={() => router.push('/')}>
          <Text style={styles.backArrow}>
            <Image source={require("assets/images/image copy.png")} style={styles.bellIcon} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.appTitle}>MySchool</Text>
        <TouchableOpacity onPress={() => router.push('/src/Firstpage/Parent/notificationparent')}>
               <Image source={require("assets/images/image.png")} style={styles.bellIcon} />
               </TouchableOpacity>
               <TouchableOpacity  onPress={() => setMenuVisible(true)}>
       
               <Image source={require("assets/images/image 3point.png")} style={styles.bellIcon} />
               </TouchableOpacity>
      </View>

      {/* Image Background */}
      <ImageBackground
        source={require("assets/images/backgroundadmin.png")}
        style={{ height: 189 }}
      >
        <Text style={styles.text}>Espace Parent</Text>
      </ImageBackground>

      {/* Role Selection Cards */}
      <ScrollView contentContainerStyle={styles.rolesContainer}>
        {roles.map((role, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handleRolePress(role.label)}>
            <Image source={role.image} style={styles.roleImage} />
            <Text style={styles.roleText}>{role.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    marginRight: 220,
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
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingTop: 50,
    paddingRight: 15,
  },
  menu: {
    backgroundColor: "white",
    borderRadius: 5,
    width: 200,
    elevation: 5,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default first;
