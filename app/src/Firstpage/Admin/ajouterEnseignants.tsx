import React, { useState,useEffect } from 'react';
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

export default function AjouterEnseignant(): JSX.Element {
  const router = useRouter();
  const [nom, setNom] = useState<string>('');
  const [prenom, setPrenom] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [matiere, setMatiere] = useState<string>('');
  const [dateNaissance, setDateNaissance] = useState<string>('');
  const [showMatiereModal, setShowMatiereModal] = useState<boolean>(false);
  const [showClassesModal, setShowClassesModal] = useState<boolean>(false);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]); // ✅ déclaration correcte

  // Liste des matières disponibles
  const matieres: string[] = [
    'Mathématiques', 'Physique', 'Chimie', 'Biologie', 
    'Histoire', 'Géographie', 'Français', 'Anglais',
    'Informatique', 'Philosophie', 'Éducation Physique'
  ];

  // Liste des classes disponibles
  useEffect(() => {
    fetch('http://192.168.1.33:3000/classes') // ou IP du backend
      .then(response => response.json())
      .then(data => {
        setClasses(data); // par exemple : ['1ST1', '1ST2', '2L3']
      })
      .catch(error => console.error('Erreur lors du chargement des classes', error));
  }, []);
  

  const toggleClassSelection = (classe: string) => {
    if (selectedClasses.includes(classe)) {
      setSelectedClasses(selectedClasses.filter(item => item !== classe));
    } else {
      setSelectedClasses([...selectedClasses, classe]);
    }
  };

  const enregistrer = async (): Promise<void> => {
    const donnees = {
      nom,
      prenom,
      telephone,
      email,
      matiere,
      dateNaissance,
      classes: selectedClasses
    };
  
    try {
      const response = await fetch('http://192.168.1.33:3000/ajouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donnees),
      });
  
      const resultat = await response.json();
  
      if (response.ok) {
        alert('Enseignant ajouté avec succès');
        router.back();
      } else {
        alert(`Erreur: ${resultat.message}`);
      }
    } catch (error) {
      alert('Erreur lors de la connexion au serveur');
      console.error(error);
    }
  };
  

  const annuler = (): void => {
    router.back();
  };

  const selectMatiere = (selectedMatiere: string) => {
    setMatiere(selectedMatiere);
    setShowMatiereModal(false);
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
          <Text style={styles.headerTitle}>Ajouter un enseignant</Text>
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

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder=""
        />

        <Text style={styles.label}>Matière enseignée</Text>
        <TouchableOpacity 
          style={styles.comboBox} 
          onPress={() => setShowMatiereModal(true)}
        >
          <Text style={matiere ? styles.comboBoxText : styles.comboBoxPlaceholder}>
            {matiere || "Sélectionner une matière"}
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

        <Text style={styles.label}>Classes assignées</Text>
        <TouchableOpacity 
          style={styles.comboBox} 
          onPress={() => setShowClassesModal(true)}
        >
          <Text style={selectedClasses.length > 0 ? styles.comboBoxText : styles.comboBoxPlaceholder}>
            {selectedClasses.length > 0 
              ? `${selectedClasses.length} classe(s) sélectionnée(s)` 
              : "Sélectionner des classes"}
          </Text>
          <Ionicons name="chevron-down" size={24} color="black" style={styles.comboBoxIcon} />
        </TouchableOpacity>

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

      {/* Modal pour la sélection de matière */}
      <Modal
        visible={showMatiereModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMatiereModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner une matière</Text>
              <TouchableOpacity onPress={() => setShowMatiereModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={matieres}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.matiereItem} 
                  onPress={() => selectMatiere(item)}
                >
                  <Text style={styles.matiereItemText}>{item}</Text>
                  {matiere === item && (
                    <Ionicons name="checkmark" size={20} color="#2c2193" />
                  )}
                </TouchableOpacity>
              )}
              style={styles.matieresList}
            />
          </View>
        </View>
      </Modal>

      {/* Modal pour la sélection des classes avec checkboxes */}
      <Modal
        visible={showClassesModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowClassesModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner des classes</Text>
              <TouchableOpacity onPress={() => setShowClassesModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={classes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.classItem} 
                  onPress={() => toggleClassSelection(item)}
                >
                  <Text style={styles.classItemText}>{item}</Text>
                  <View style={styles.checkbox}>
                    {selectedClasses.includes(item) ? (
                      <Ionicons name="checkbox" size={24} color="#2c2193" />
                    ) : (
                      <Ionicons name="square-outline" size={24} color="#999" />
                    )}
                  </View>
                </TouchableOpacity>
              )}
              style={styles.classesList}
            />
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={() => setShowClassesModal(false)}
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
  matieresList: {
    maxHeight: 300,
  },
  classesList: {
    maxHeight: 300,
  },
  matiereItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  matiereItemText: {
    fontSize: 16,
  },
  classItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  classItemText: {
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