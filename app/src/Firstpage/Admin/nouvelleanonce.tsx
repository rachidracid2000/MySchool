import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Image, ScrollView
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from "expo-router";
import { WebView } from 'react-native-webview';

const CreateAnnonceScreen = () => {
  const [texteAnnonce, setTexteAnnonce] = useState('');
  const [fichier, setFichier] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const router = useRouter();

  const choisirFichier = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled && result.assets.length > 0) {
      setFichier(result.assets[0]);
    }
  };

  const publierAnnonce = () => {
    console.log('Annonce:', texteAnnonce);
    console.log('Fichier:', fichier);
  };

  const renderFichier = () => {
    if (!fichier) return null;

    if (fichier.mimeType?.startsWith('image/')) {
      return (
        <Image source={{ uri: fichier.uri }} style={{ width: '100%', height: 300 }} resizeMode="contain" />
      );
    } else if (fichier.mimeType === 'application/pdf') {
      return (
        <WebView
          source={{ uri: fichier.uri }}
          style={{ height: 300 }}
          originWhitelist={['*']}
          startInLoadingState
        />
      );
    } else {
      return (
        <Text style={{ margin: 10, fontStyle: 'italic', color: 'gray' }}>
          Aperçu non disponible. Fichier sélectionné : {fichier.name}
        </Text>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("assets/images/image copy.png")} style={styles.bellIcon} />
        </TouchableOpacity>
        <Text style={styles.appTitle}>MySchool</Text>
      </View>

      {/* Profil */}
      <View style={styles.profileContainer}>
        <Image source={require("assets/images/image admin.png")} style={styles.avatar} />
        <Text style={styles.name}>Nom Admin</Text>
      </View>

      {/* Champ de texte */}
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="À quoi pensez-vous ?"
          placeholderTextColor="#000"
          multiline
          style={styles.textInput}
          value={texteAnnonce}
          onChangeText={setTexteAnnonce}
        />
      </View>

      {/* Ajouter un fichier */}
      <TouchableOpacity style={styles.fileButton} onPress={choisirFichier}>
        <Image source={require("assets/images/document3.png")} style={styles.fileIcon} />
        <Text style={styles.fileText}>
          {fichier ? fichier.name : 'Ajouter un fichier'}
        </Text>
      </TouchableOpacity>

      {/* Aperçu du fichier */}
      {renderFichier()}

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.publishButton} onPress={publierAnnonce}>
          <Text style={styles.publishText}>Publier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateAnnonceScreen;

// styles inchangés, tu peux garder les tiens



const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  // header: {
  //   backgroundColor: '#2f1bb4',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 16,
  //   paddingVertical: 12,
  //   borderRadius: 5,
  // },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight:215,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
    marginLeft:10,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: '#555',
  },
  textInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
    marginLeft:10,
    marginRight:10,

  },
  textInput: {
    fontSize: 17,
    //fontWeight: 'bold',
    color: '#000',
    minHeight: 100,
    textAlignVertical: 'top',
    

  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  fileIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  fileText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  publishButton: {
    backgroundColor: '#2f1bb4',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginLeft:50,
  },
  publishText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    backgroundColor: '#fff',
    marginRight:50,
  },
  cancelText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: "#1d1790",
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
});
