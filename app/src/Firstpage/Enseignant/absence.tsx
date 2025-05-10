import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Modal , Image,ImageBackground} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const elevesMock = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  nom: i < 4 ? ['Hamani', 'Hammami', 'Khafi', 'Hadji'][i] : 'Cell Data',
  prenom: i < 4 ? ['Rachid', 'Sofiane', 'Badis', 'Imane'][i] : 'Cell Data',
  present: i % 4 !== 0,
}));

export default function AbsenceScreen() {
  const router = useRouter();
  const [horaire, setHoraire] = useState('11:00-12:00');
  const [modalVisible, setModalVisible] = useState(false);
  const [eleves, setEleves] = useState(elevesMock);

  const heuresDisponibles = [
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
  ];

  const togglePresence = (index: number) => {
    const newList = [...eleves];
    newList[index].present = !newList[index].present;
    setEleves(newList);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      
            <View style={ {
    backgroundColor: "#2c22b0",
    height: 60,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }}>
                   <TouchableOpacity  onPress={() => router.back()}>
                     <Text style={{
    fontSize: 24,
    color: "#fff",
  }}>
                       <Image source={require("assets/images/image copy.png")} style={{
    width: 24,
    height: 24,
    tintColor: "#FFD700",
  }} />
                     </Text>
                   </TouchableOpacity>
                   <Text style={{
    marginRight: 256,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  }}>MySchool</Text>
                  
                 </View>
           
                 {/* Image Background */}
                 <ImageBackground
                   source={require("assets/images/backgroundadmin.png")}
                   style={{ height: 189 }}
                 >
                   <Text style={ {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 50,
  }}>Absences</Text>
                 </ImageBackground>

      {/* Sélecteur d'heure comme ComboBox */}
      <View style={{ alignItems: 'center', marginVertical: 5 }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: '#2D1E99',
            paddingHorizontal: 50,
            paddingVertical: 12,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>{horaire}</Text>
          <Ionicons name="chevron-down" color="white" size={20} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)'
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 20,
            width: '100%'
          }}>
            {heuresDisponibles.map((h, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setHoraire(h);
                  setModalVisible(false);
                }}
                style={{ paddingVertical: 10 }}
              >
                <Text style={{ fontSize: 18 }}>{h}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Table */}
      <ScrollView horizontal>
        <View style={{ paddingHorizontal: 10 }}>
          {/* Table Header */}
          <View style={{ flexDirection: 'row', backgroundColor: '#f0f4f8', padding: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            <Text style={{ width: 50, fontWeight: 'bold' }}>N°</Text>
            <Text style={{ width: 100, fontWeight: 'bold' }}>nom</Text>
            <Text style={{ width: 100, fontWeight: 'bold' }}>prenom</Text>
            <Text style={{ width: 100, fontWeight: 'bold' }}>présence</Text>
          </View>

          {/* Table Body */}
          <FlatList
            data={eleves}
            keyExtractor={(item) => item.id.toString()}
            style={{ maxHeight: 700 }}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#e0e0e0' }}>
                <Text style={{ width: 50 }}>{item.id}</Text>
                <Text style={{ width: 100 }}>{item.nom}</Text>
                <Text style={{ width: 100 }}>{item.prenom}</Text>
                <TouchableOpacity
                  style={{ width: 100, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => togglePresence(index)}
                >
                  <Ionicons
                    name={item.present ? "checkmark" : "close"}
                    size={18}
                    color={item.present ? "green" : "red"}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={{ color: item.present ? "green" : "red" }}>
                    {item.present ? "Présent" : "Absent"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Bouton Enregistrer */}
      <View style={{ padding: 16 }}>
        <TouchableOpacity style={{
          backgroundColor: '#2D1E99',
          padding: 16,
          borderRadius: 30,
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 18 }}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
