import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const mockEnseignants = [
  {
    id: 1,
    nom: "Hadji Imane",
    email: "hadjimane@gmail.com",
    telephone: "0789654372",
    matiere: "Mathématiques",
  },
  {
    id: 2,
    nom: "Hadji Imane",
    email: "hadjimane@gmail.com",
    telephone: "0789654372",
    matiere: "Mathématiques",
  },
  {
    id: 3,
    nom: "Hadji Imane",
    email: "hadjimane@gmail.com",
    telephone: "0789654372",
    matiere: "Mathématiques",
  },
];

export default function AfficherEnseignant() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Barre du haut */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enseignant</Text>
        </View>
        
        
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="white" />
          <Text style={styles.searchText}>Recherche un enseignant</Text>
        </View>
      </View>

      {/* Liste des enseignants */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {mockEnseignants.map((enseignant) => (
          <View key={enseignant.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatarContainer}>
              </View>
              <View style={styles.teacherInfo}>
                <Text style={styles.nom}>{enseignant.nom}</Text>
                <View style={styles.infoRow}>
                  <Ionicons name="mail" size={18} color="black" />
                  <Text style={styles.infoText}>{enseignant.email}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="call" size={18} color="black" />
                  <Text style={styles.infoText}>{enseignant.telephone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="book" size={18} color="black" />
                  <Text style={styles.infoText}>Matière :{enseignant.matiere}</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionBtn}>
                <FontAwesome name="pencil" size={20} color="black" />
                <Text style={styles.actionText}>Modifier</Text>
              </TouchableOpacity>
              <View style={styles.actionDivider} />
              <TouchableOpacity style={styles.actionBtn}>
                <FontAwesome name="trash" size={20} color="black" />
                <Text style={styles.actionText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bouton Ajouter */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/src/Firstpage/Admin/ajouterEnseignants")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f5f5f5", 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c2193",
    paddingVertical: 16,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: { 
    color: "white", 
    fontSize: 24, 
    fontWeight: "bold", 
    marginLeft: 10 
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationContainer: {
    position: "relative",
    marginRight: 15,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 5,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c2193",
    borderRadius: 25,
    padding: 12,
  },
  searchText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    padding: 16,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4da6ff",
  },
  teacherInfo: {
    flex: 1,
    justifyContent: "center",
  },
  nom: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  actions: {
    flexDirection: "row",
    height: 50,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
  actionText: {
    marginLeft: 8,
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#2c2193",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});