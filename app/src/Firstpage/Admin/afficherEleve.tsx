import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from "react-native";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { push } from "expo-router/build/global-state/routing";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";


// ✅ Définir le type pour un élève
type Eleve = {
  id: number;
  nom: string;
  classe: string;
  date_naissance: string;
  prenom: string;
  email:string;
};

export default function AfficherEleve() {
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const router = useRouter();

  const fetchEleves = async () => {
    try {
      const response = await fetch("http://192.168.131.233:3000/afficherEleve");
      // const response = await fetch("http://192.168.179.233:3000/afficherEleve"); pour TEL

      const data = await response.json();
      setEleves(data);
    } catch (error) {
      console.error("Erreur de chargement des élèves :", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEleves();
    }, [])
  );
  

  const confirmerSuppression = (id: number) => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer cet élève ?",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => supprimerEleve(id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  
  const supprimerEleve = async (id: number) => {
    try {
      await fetch(`http://192.168.131.233:3000/afficherEleve/${id}`, { method: "DELETE" });
      fetchEleves();
    } catch (error) {
      Alert.alert("Erreur", "Échec de suppression.");
    }
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Élèves</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {eleves.map((eleve) => (
          <View key={eleve.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.studentInfo}>
                <Text style={styles.nom}>{eleve.nom} {eleve.prenom }</Text>
                <View style={styles.infoRow}>
                  <FontAwesome name="graduation-cap" size={18} color="black" />
                  <Text style={styles.infoText}>Classe : {eleve.classe}</Text>
                </View>
                <View style={styles.infoRow}>
                  <FontAwesome name="calendar" size={18} color="black" />
                  <Text style={styles.infoText}>Naissance : {eleve.date_naissance}</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.actions}>
            <TouchableOpacity
  style={styles.actionBtn}
  onPress={() =>
    router.push({
      pathname: "/src/Firstpage/Admin/modfiereleve",
      params: {
        id: eleve.id.toString(),
        nom: eleve.nom,
        prenom: eleve.prenom,
        date_naissance: eleve.date_naissance,
        classe: eleve.classe,
        email: eleve.email ,
            },
    })
  }
>
  <FontAwesome name="pencil" size={20} color="black" />
  <Text style={styles.actionText}>Modifier</Text>
</TouchableOpacity>

              <View style={styles.actionDivider} />
              <TouchableOpacity style={styles.actionBtn} onPress={() => confirmerSuppression(eleve.id)}
              >
                <FontAwesome name="trash" size={20} color="black" />
                <Text style={styles.actionText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/src/Firstpage/Admin/ajouterEleve")
          
        }
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c2193",
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom:20,
  },
  backButton: { padding: 5 },
  headerTitle: { color: "white", fontSize: 24, fontWeight: "bold", marginLeft: 10 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
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
  cardHeader: { flexDirection: "row", padding: 16 },
  studentInfo: { flex: 1, justifyContent: "center" },
  nom: { fontWeight: "bold", fontSize: 20, marginBottom: 5 },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  infoText: { fontSize: 16, marginLeft: 8 },
  divider: { height: 1, backgroundColor: "#e0e0e0" },
  actions: { flexDirection: "row", height: 50 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionDivider: { width: 1, backgroundColor: "#e0e0e0" },
  actionText: { marginLeft: 8, fontSize: 16 },
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
