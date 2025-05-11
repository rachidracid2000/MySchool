import React, { useState ,useEffect} from 'react';
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

export default function AjouterEleve() {
  const router = useRouter();
  const [id, setid] = useState<string>('');
  const [nom, setNom] = useState<string>('');
  const [prenom, setPrenom] = useState<string>('');
  const [ date_naissance,  setdate_naissance] = useState<string>('');
  const [classe, setClasse] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showClasseModal, setShowClasseModal] = useState<boolean>(false);
  const validerChamps = () => {
    const nomRegex = /^[A-Za-zÀ-ÿ\s-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[-\/](0[1-9]|1[0-2])[-\/]\d{4}$/;

    if (!nom || !prenom || !email || !date_naissance || !classe) {
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

    if (!dateRegex.test(date_naissance)) {
      alert("La date doit être au format jj-mm-aaaa ou jj/mm/aaaa");
      return false;
    }
  
    if (!emailRegex.test(email)) {
      alert("L'adresse email est invalide.");
      return false;
    }
  
    
  
    return true;
  };
  
  const resetChamps = () => {
    setid('');
    setNom('');
    setPrenom('');
    setdate_naissance('');
    setClasse('');
    setEmail('');
  };
  
  // Liste des classes disponibles
  const [classes, setClasses] = useState<string[]>([]);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://192.168.131.233:3000/ajouterEleve");
        const data = await response.json();
        setClasses(data); // Assure-toi que `data` est un tableau de chaînes
      } catch (error) {
        console.error("Erreur lors du chargement des classes :", error);
      }
    };
  
    fetchClasses();
  }, []);
  
 const enregistrer = async () => {
  if (!validerChamps()) return;

  try {
    const response = await fetch('http://192.168.131.233:3000/ajouterEleve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        nom,
        prenom,
        date_naissance,
        classe,
        email,
      }),
    });

    if (response.ok) {
      alert('Élève ajouté avec succès !');
      // Réinitialiser les champs après ajout
      resetChamps();
      
    } else {
      alert('Erreur lors de l’ajout.');
    }
  } catch (error) {
    console.error(error);
    alert('Erreur de connexion au serveur.');
  }
};

  // const handleSave = async () => {
  //   const payload = { nom, classe,  date_naissance };
  
  //   const method = id ? 'PUT' : 'POST';
  //   const endpoint = id
  //     ? `http://192.168.0.109:3000/ajouterEleve/${id}`
  //     : `http://192.168.0.109:3000/ajouterEleve`;
  
  //   await fetch(endpoint, {
  //     method,
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(payload)
  //   });
  // };
  

  const annuler = () => {
    resetChamps(); // Vide tous les champs
    alert("Les champs ont été réinitialisés.");
  };
  

  const selectClasse = (selectedClasse: string) => {
    setClasse(selectedClasse);
    setShowClasseModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c2193" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un élève   et eleeeeve</Text>
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

        <Text style={styles.label}>Date de naissance</Text>
        <TextInput
          style={styles.input}
          value={ date_naissance}
          onChangeText={ setdate_naissance}
          placeholder="jj/mm/aaaa"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Classe</Text>
        <TouchableOpacity 
          style={styles.comboBox} 
          onPress={() => setShowClasseModal(true)}
        >
          <Text style={classe ? styles.comboBoxText : styles.comboBoxPlaceholder}>
            {classe || "Sélectionner une classe"}
          </Text>
          <Ionicons name="chevron-down" size={24} color="black" style={styles.comboBoxIcon} />
        </TouchableOpacity>

        <Text style={styles.label}>Adresse e-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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

      {/* Modal pour la sélection de classe */}
      <Modal
        visible={showClasseModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowClasseModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner une classe</Text>
              <TouchableOpacity onPress={() => setShowClasseModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={classes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.classItem} 
                  onPress={() => selectClasse(item)}
                >
                  <Text style={styles.classItemText}>{item}</Text>
                  {classe === item && (
                    <Ionicons name="checkmark" size={20} color="#2c2193" />
                  )}
                </TouchableOpacity>
              )}
              style={styles.classesList}
            />
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
  classesList: {
    maxHeight: 300,
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
});
