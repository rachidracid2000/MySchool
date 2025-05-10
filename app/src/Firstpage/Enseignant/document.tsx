// app/document.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,ImageBackground,ScrollView ,KeyboardAvoidingView, Platform,} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import { WebView } from 'react-native-webview';


export default function DocumentScreen() {
  const [nom, setNom] = useState('');
  const [groupe, setGroupe] = useState('');
  const [objet, setObjet] = useState('');
  const [message, setMessage] = useState('');
  const [fichier, setFichier] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        setFichier(result.assets[0]); // ici on récupère le fichier sélectionné
      }
    } catch (error) {
      console.error('Erreur lors de la sélection du fichier :', error);
    }
  };

  const handleSend = () => {
    console.log({ nom, groupe, objet, message, fichier });
    // Envoi vers Firebase ou autre backend ici
  };
   const router = useRouter();
  return (
    <View style={styles.container}>
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
                      <Text style={styles.text}>Envoyer des Documents</Text>
                    </ImageBackground>
                    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>


      <Text style={styles.label}>De</Text>
      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={setNom}
        placeholder="Nom enseignant"
      />

      <Text style={styles.label}>À</Text>
      <Picker
        selectedValue={groupe}
        onValueChange={(itemValue) => setGroupe(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionnez un class" value="" />
        <Picker.Item label="1ère année" value="g1" />
        <Picker.Item label="2ème année" value="g2" />
        {/* ajoute d'autres groupes ici */}
      </Picker>

      <Text style={styles.label}>Objet</Text>
      <TextInput
        style={styles.input}
        value={objet}
        onChangeText={setObjet}
        placeholder="Objet du message"
      />

      <Text style={styles.label}>Rédigez votre message</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={5}
        value={message}
        onChangeText={setMessage}
        placeholder="écrire ici ..."
      />

      <TouchableOpacity style={styles.fileContainer} onPress={handlePickFile}>
        <Image source={require('assets/images/document3.png')} style={{ marginLeft: 10, width: 30, height: 30 }} />
        <Text style={{ marginLeft: 10 }}>Ajouter un fichier</Text>
      </TouchableOpacity>

      {/* Affichage du nom du fichier s’il est sélectionné */}
      {fichier && (
  <View style={{ margin: 10 }}>
    <Text style={styles.fichierNom}>Fichier sélectionné : {fichier.name}</Text>

    {fichier.mimeType?.startsWith('image/') && (
      <Image
        source={{ uri: fichier.uri }}
        style={{ width: '100%', height: 200, resizeMode: 'contain', borderRadius: 10 }}
      />
    )}

    {fichier.mimeType === 'application/pdf' && (
      <View style={{ height: 400 }}>
        <WebView source={{ uri: fichier.uri }} />
      </View>
    )}

    {(fichier.mimeType === 'application/msword' ||
      fichier.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && (
      <Text style={{ fontStyle: 'italic', color: 'gray' }}>
        Aperçu non disponible pour les fichiers Word.
      </Text>
    )}
  </View>
)}


      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Envoyer</Text>
      </TouchableOpacity>
      </ScrollView>
      
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      backgroundColor: '#fff',
    },
    label: {
      fontWeight: 'bold',
      marginTop: 10,
      marginLeft: 10,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#000',
      marginBottom: 10,
      paddingVertical: 5,
      marginLeft: 20,
      marginRight: 20,
    },
    picker: {
       
      marginBottom: 10,
      
    },
    textArea: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      textAlignVertical: 'top',
      marginLeft: 15,
      marginRight: 20,
      marginTop: 10,
    },
    fileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    fichierNom: {
      fontStyle: 'italic',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#2E1BA4',
      padding: 15,
      alignItems: 'center',
      borderRadius: 50,
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
    },
    buttonText: {
      color: '#fff',
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
        paddingVertical: 50,}
  });
  




//   Quand tu cliqueras sur Envoyer, voici ce que tu peux envoyer vers ton backend Firebase ou autre :

//   json
//   Copy
//   Edit
//   {
//     "de": "M. Samir",
//     "a": "2ème année",
//     "objet": "Rappel devoirs",
//     "message": "N'oubliez pas de remettre vos travaux avant lundi.",
//     "fichier": {
//       "uri": "file:///....pdf",
//       "name": "devoir.pdf",
//       "mimeType": "application/pdf"
//     }
//   }  