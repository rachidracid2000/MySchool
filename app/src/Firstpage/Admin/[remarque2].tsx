import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';

export default function RemarqueEleve() {
  const { remarque, nom, prenom } = useLocalSearchParams();
  const [remarqueText, setRemarqueText] = useState('');
  const router = useRouter();

  const handleEnvoyer = () => {
    Alert.alert('Remarque envoyée !', `Pour ${prenom} ${nom} : ${remarqueText}`);
    router.back(); // Retour à la liste
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Remarque</Text>

      <View style={styles.inputBox}>
        <Text style={styles.inputText}>{nom}</Text>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.inputText}>{prenom}</Text>
      </View>

      <Text style={styles.label}>La remarque :</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={6}
        placeholder="Écrire la remarque ici..."
        value={remarqueText}
        onChangeText={setRemarqueText}
      />

      <TouchableOpacity style={styles.button} onPress={handleEnvoyer}>
        <Text style={styles.buttonText}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2c22b0', marginBottom: 20 },
  inputBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  inputText: { fontSize: 18 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  textArea: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 20,
    height: 190,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#32127A',
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
