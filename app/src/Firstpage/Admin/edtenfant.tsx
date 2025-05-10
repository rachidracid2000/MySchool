import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const horaires: string[] = [
  "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00",
  "13:30-14:30", "14:30-15:30", "15:30-16:30"
];

const jours: string[] = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"];

export default function EmploiTempsAdmin() {
  const [groupe, setGroupe] = useState<string>("1st2");
  const [jour, setJour] = useState<string>("Dimanche");
  const [emploi, setEmploi] = useState<{ [key: string]: string }>({});

  const handleChangeCours = (time: string, value: string) => {
    setEmploi({ ...emploi, [time]: value });
  };

  const handleSubmit = async () => {
    const dataToSend = {
      groupe,
      jour,
      emploi
    };

    try {
      const response = await fetch('http://localhost:3000/api/emploi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) alert("Emploi enregistré avec succès !");
      else alert("Erreur d'envoi !");
    } catch (error) {
      alert("Erreur réseau !");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Créer un emploi du temps</Text>

      <Text>Sélectionner un groupe :</Text>
      <Picker selectedValue={groupe} onValueChange={(value: string) => setGroupe(value)}>
        <Picker.Item label="1st2" value="1st2" />
        <Picker.Item label="1st1" value="1st1" />
        {/* Ajoute plus de groupes ici */}
      </Picker>

      <Text>Sélectionner un jour :</Text>
      <Picker selectedValue={jour} onValueChange={(value: string) => setJour(value)}>
        {jours.map((j, idx) => (
          <Picker.Item key={idx} label={j} value={j} />
        ))}
      </Picker>

      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>Cours par horaire :</Text>
      {horaires.map((h, index) => (
        <View key={index} style={{ marginBottom: 8 }}>
          <Text>{h}</Text>
          <TextInput
            placeholder="Ex: MATH, TD:PHYS"
            onChangeText={(value: string) => handleChangeCours(h, value)}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              borderRadius: 6
            }}
          />
        </View>
      ))}

      <TouchableOpacity onPress={handleSubmit} style={{
        marginTop: 20,
        backgroundColor: '#3b2eb8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center'
      }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Valider</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
