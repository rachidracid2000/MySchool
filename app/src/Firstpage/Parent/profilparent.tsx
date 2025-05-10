import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ActivityIndicator,ImageBackground, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter  } from 'expo-router';

// 🔐 Typage explicite de l'utilisateur
type User = {
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
};

const ProfilScreen = () => {
  // ✅ Typé correctement
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      // Simuler une requête API
      const fakeUser: User = {
        nom: 'Boukharouba',
        prenom: 'Rachid',
        dateNaissance: '1992-05-10',
        email: 'rachid@example.com',
      };

      setTimeout(() => {
        setUser(fakeUser);
        setLoading(false);
      }, 1000);
    };

    fetchUser();
  }, []);

  if (loading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2c22b0" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
     <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.backArrow}><Image source={require("assets/images/image copy.png")} style={styles.bellIcon} /></Text>
            </TouchableOpacity>
            <Text style={styles.title}>MySchool</Text>
          </View>
    
          {/* Background shape */}
          <ImageBackground
            source={require('assets/images/backgroundadmin.png')} // remplace ce fichier par ton fond bleu ondulé si tu l'as
            style={styles.headerBackground}
            imageStyle={{ resizeMode: 'cover' }}
            
          >
            <Text style={styles.text}>Profil</Text>
            <Image
              source={require('assets/images/image parent.png')} // image silhouette
              style={styles.avatar}
              
            />
            
          </ImageBackground>
    

      {/* Informations utilisateurs */}
      <View style={styles.infoContainer}>
        <Text style={styles.label1}>Nom:</Text>
        <Text style={styles.value}>{user.nom}</Text>

        <Text style={styles.label}>Prénom:</Text>
        <Text style={styles.value}>{user.prenom}</Text>

        <Text style={styles.label}>Date de naissance:</Text>
        <Text style={styles.value}>{user.dateNaissance}</Text>

        <Text style={styles.label}>Adresse e-mail:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfilScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
//   header: {
//     backgroundColor: '#2c22b0',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  waveContainer: {
    backgroundColor: '#2c22b0',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 20,
  },
  title: {
    marginRight: 250,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    marginTop:10,
  },
  label1: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    marginTop:20,
  },
  value: {
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
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
    color: 'white',
    fontSize: 24,
    marginRight: 10,
  },
 
  headerBackground: {
    height: 190,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    padding: 0,
    borderRadius: 0,
    textAlign: "center",
    paddingVertical: 20,
   // marginTop:70,
  },
});
