

import { useRouter } from "expo-router";
import React from "react";
import {
  View, Text,StyleSheet, Image,TouchableOpacity, ImageBackground, ScrollView,} from "react-native";

const roles = [
  { label: "admin", image: require("assets/images/image admin.png") },
  { label: "enseignant", image: require("assets/images/image enseignant.png") },
  { label: "parent", image: require("assets/images/image parent.png") },
  { label: "élève", image: require("assets/images/image eleve.png") },
];

const first = () => {
  const router = useRouter();

  const handleRolePress = (roleLabel: string) => {
    switch (roleLabel.toLowerCase()) {
      case "admin":
        router.push("/src/Firstpage/Admin/admin");
        break;
      case "enseignant":
        router.push("/src/Firstpage/Enseignant/enseignant");
        break;
      case "parent":
        router.push("/src/Firstpage/Parent/parent");
        break;
      case "élève":
        router.push("/src/Firstpage/Eleve/eleve");
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
       
        <Text style={styles.appTitle}>MySchool</Text>
       
      </View>

      {/* Image Background */}
      <ImageBackground
        source={require("assets/images/background copy.png")}
        style={{  height: 260 }}
      >
        <Text style={styles.text}>Veuillez choisir votre rôle</Text>
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
    height: 60,
    backgroundColor: '#2c22b0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  
  backArrow: {
    fontSize: 24,
    color: "#fff",
  },
  appTitle: {
    marginRight: 0,
    marginLeft:10,
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
    paddingVertical: 89,
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

export default first;
