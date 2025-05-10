import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AjouterParent(): JSX.Element {
  const router = useRouter();
  const [nom, setNom] = useState<string>('');
  const [prenom, setPrenom] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedEnfants, setSelectedEnfants] = useState<string[]>([]);
  const [dateNaissance, setDateNaissance] = useState<string>('');
  const [showEnfantsModal, setShowEnfantsModal] = useState<boolean>(false);
  const validerChamps = () => {
    const nomRegex = /^[A-Za-zÀ-ÿ\s-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[-\/](0[1-9]|1[0-2])[-\/]\d{4}$/;
    const telephoneRegex = /^(05|06|07)[0-9]{8}$/;

    if (!nom || !prenom || !email || !dateNaissance || !telephone) {
      alert("Tous les champs doivent être remplis.");
      return false;
    }
    if (!nomRegex.test(nom)) {
      alert("Le nom ne doit contenir que des lettres.");
      return false;
    }
  
    if (!nomRegex.test(prenom)) {
      alert("Le prénom ne doit contenir que des lettres.");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("L'adresse email est invalide.");
      return false;
    }

    if (!dateRegex.test(dateNaissance)) {
      alert("La date doit être au format jj-mm-aaaa ou jj/mm/aaaa");
      return false;
    }
    if (!telephoneRegex.test(telephone)) {
      alert("Le numéro doit contenir 10 chiffres et commencer par 05, 06 ou 07");
      return false;
    }
  
    return true;
  };
  const resetChamps = () => {
    setDateNaissance('');
    setSelectedEnfants([]); 
    setPrenom('');
    setTelephone('');
    setNom('');
    setEmail('');
  };
  // Liste des enfants disponibles
  const [enfantsList, setEnfantsList] = useState<string[]>([]);
  useEffect(() => {
    const fetchEnfants = async () => {
      try {
        const response = await fetch('http://192.168.1.33:3000/enfants');
        const data = await response.json();
        setEnfantsList(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des enfants :', error);
      }
    };
  
    fetchEnfants();
  }, []);
  

  const enregistrer = async (): Promise<void> => {
    if (!validerChamps()) return;

    try {
      const response = await fetch('http://192.168.1.33:3000/ajouterParent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom,
          prenom,
          telephone,
          email,
          enfants: selectedEnfants,
          dateNaissance,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Parent ajouté avec succès');
        resetChamps();
      } else {
        alert('Erreur : ' + data.error);
      }
    } catch (error) {
      console.error('Erreur fetch:', error);
      alert('Erreur de connexion au serveur');
    }
  };
  

  const annuler = () => {
    resetChamps(); // Vide tous les champs
    alert("Les champs ont été réinitialisés.");
  };

  
  const toggleEnfantSelection = (enfant: string) => {
    if (selectedEnfants.includes(enfant)) {
      setSelectedEnfants(selectedEnfants.filter(item => item !== enfant));
    } else {
      setSelectedEnfants([...selectedEnfants, enfant]);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c2193" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ajouter un parent</Text>
        </View>
      </View>

      {/* Formulaire */}
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nom</Text>
        <TextInput 
          style={styles.input} 
          value={nom} 
          onChangeText={setNom}
          placeholder=""
        />

        <Text style={styles.label}>Prenom</Text>
        <TextInput 
          style={styles.input} 
          value={prenom} 
          onChangeText={setPrenom}
          placeholder=""
        />

        <Text style={styles.label}>NumTel</Text>
        <TextInput
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
          placeholder=""
        />

        <Text style={styles.label}>Adresse e-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder=""
        />

        <Text style={styles.label}>Enfants</Text>
        <TouchableOpacity 
          style={styles.comboBox} 
          onPress={() => setShowEnfantsModal(true)}
        >
          <Text style={selectedEnfants.length > 0 ? styles.comboBoxText : styles.comboBoxPlaceholder}>
            {selectedEnfants.length > 0 
              ? `${selectedEnfants.length} enfant(s) sélectionné(s)` 
              : "Sélectionner des enfants"}
          </Text>
          <Ionicons name="chevron-down" size={24} color="black" style={styles.comboBoxIcon} />
        </TouchableOpacity>

        <Text style={styles.label}>Date de naissance</Text>
        <TextInput
          style={styles.input}
          value={dateNaissance}
          onChangeText={setDateNaissance}
          placeholder=""
        />

        {/* Boutons */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.saveBtn} onPress={enregistrer}>
            <Text style={styles.saveText}>Enregistrer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={annuler}>
            <Text style={styles.cancelText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal pour la sélection d'enfants avec checkboxes */}
      <Modal
        visible={showEnfantsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEnfantsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner des enfants</Text>
              <TouchableOpacity onPress={() => setShowEnfantsModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={enfantsList}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.enfantItem} 
                  onPress={() => toggleEnfantSelection(item)}
                >
                  <Text style={styles.enfantItemText}>{item}</Text>
                  <View style={styles.checkbox}>
                    {selectedEnfants.includes(item) ? (
                      <Ionicons name="checkbox" size={24} color="#2c2193" />
                    ) : (
                      <Ionicons name="square-outline" size={24} color="#999" />
                    )}
                  </View>
                </TouchableOpacity>
              )}
              style={styles.enfantsList}
            />
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={() => setShowEnfantsModal(false)}
              >
                <Text style={styles.confirmButtonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#2c2193',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContainer: {
    position: 'relative',
    marginRight: 15,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 5,
  },
  form: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
  },
  input: {
    height: 55,
    borderRadius: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    fontSize: 16,
  },
  comboBox: {
    height: 55,
    borderRadius: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  comboBoxText: {
    fontSize: 16,
    color: '#000',
  },
  comboBoxPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  comboBoxIcon: {
    marginLeft: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  saveBtn: {
    backgroundColor: '#2c2193',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 2,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2c2193',
  },
  cancelBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 2,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  enfantsList: {
    maxHeight: 300,
  },
  enfantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  enfantItemText: {
    fontSize: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#2c2193',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 120,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});