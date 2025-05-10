import React , { useState }from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useRouter  } from 'expo-router';

export default function AdminLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
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
        <Image
          source={require('assets/images/image eleve.png')} // image silhouette
          style={styles.avatar}
        />
      </ImageBackground>

      {/* Formulaire */}
      <View style={styles.form}>
        <Text style={styles.subtitle}>Connectez-vous à votre espace éléve</Text>

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888"   value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry placeholderTextColor="#888"  value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Mot De Passe Oublié?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => {
    // tu peux ajouter ici des conditions si besoin
    if (email=="" && password=="") {
      router.push('/src/Firstpage/Eleve/espaceeleve'); // Change ça vers ton écran cible
    } else {
      alert("Veuillez remplir tous les champs");
    }
  }}
    // Tu peux ici envoyer les données à ton backend ou faire une vérification
    
  >
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      height: 55,
      backgroundColor: '#1d1790',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    backArrow: {
      color: 'white',
      fontSize: 24,
      marginRight: 10,
    },
    title: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    headerBackground: {
      height: 190,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#ccc',
      marginBottom: -50,
      zIndex: 10,
    },
    form: {
      marginTop: 60,
      paddingHorizontal: 30,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
        height: 50,
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1.2,             
        borderColor: '#ccc',          
      
    
    },
    forgotPassword: {
      alignItems: 'flex-end',
      marginBottom: 30,
      
    },
    forgotText: {
      color: 'blue',
      fontWeight: '500',
    },
    loginButton: {
      backgroundColor: '#2c22b0',
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: 'center',
    },
    loginText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    bellIcon: {
        width: 24,
        height: 24,
        tintColor: "white",
      },
  });
  