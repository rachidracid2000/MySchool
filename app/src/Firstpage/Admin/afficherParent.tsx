import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

type Parent = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  enfants: string; // ou `number` si tu stockes le nombre d’enfants
  dateNaissance: string , 
};


export default function AfficherParent() {
  const router = useRouter();
  const [parents, setParents] = React.useState<Parent[]>([]);

 // const [parents, setParents] = React.useState([]);
  React.useEffect(() => {
    fetch('http://192.168.1.33:3000/parents') // remplace avec ta vraie IP si besoin
      .then(res => res.json())
      .then(data => setParents(data))
      .catch(error => {
        console.error("Erreur lors du chargement des parents :", error);
      });
  }, []);
  
  const supprimerParent = async (id: number) => {
    try {
      const response = await fetch(`http://192.168.1.33:3000/parents/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert("Parent supprimé avec succès !");
        // Met à jour la liste après suppression
        setParents(parents.filter(parent => parent.id !== id));
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur réseau !");
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Barre du haut */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Parent</Text>
        </View>
      </View>

      {/* Barre de recherche */}
      {/* <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="white" />
          <Text style={styles.searchText}>Recherche un parent</Text>
        </View>
      </View> */}

      {/* Liste des parents */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {parents.map((parent) => (
          <View key={parent.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatarContainer}>
            
              </View>
              <View style={styles.parentInfo}>
                <Text style={styles.nom}>{parent.nom}</Text>
                <View style={styles.infoRow}>
                  <Ionicons name="mail" size={18} color="black" />
                  <Text style={styles.infoText}>{parent.email}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="call" size={18} color="black" />
                  <Text style={styles.infoText}>{parent.telephone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="people" size={18} color="black" />
                  <Text style={styles.infoText}>Enfants :{parent.enfants}</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.actions}>
            <TouchableOpacity
  style={styles.actionBtn}
  onPress={() =>
    router.push({
      pathname: "/src/Firstpage/Admin/modfierparent",
      params: {
        id: parent.id.toString(),
        nom: parent.nom,
        prenom: parent.prenom,
        email: parent.email,
        telephone: parent.telephone,
        enfants: JSON.stringify(parent.enfants),
        dateNaissance: parent.dateNaissance,
      },
    })
  }
>

  <FontAwesome name="pencil" size={20} color="black" />
  <Text style={styles.actionText}>Modifier</Text>
</TouchableOpacity>

              <View style={styles.actionDivider} />
              <TouchableOpacity
  style={styles.actionBtn}
  onPress={() => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer ce parent ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Oui", onPress: () => supprimerParent(parent.id) }
      ]
    );
  }}
>
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
        onPress={() => router.push("/src/Firstpage/Admin/ajouterParent")}
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
    marginBottom: 15,
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
  parentInfo: {
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