import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Définition du type pour les annonces
interface Annonce {
  id: string;
  auteur: string;
  date: string;
  contenu: string;
  dateImportant: string;
  suite: string;
  image: any; // Utiliser ImageSourcePropType si tu veux spécifier plus précisément le type de l'image
}

// Données des annonces
const annoncesData: Annonce[] = [
  {
    id: '1',
    auteur: 'Nom Admin',
    date: '5j',
    contenu: "Chers élèves, parents et enseignants, L’école sera fermée le ",
    dateImportant: "10 mars 2025",
    suite: " en raison d’un jour férié.",
    image: require('assets/images/react-logo.png'),
  },
  {
    id: '2',
    auteur: 'Nom Admin',
    date: '8j',
    contenu: "Le ",
    dateImportant: "18 mars",
    suite: ", nous organisons une journée sportive pour tous les élèves. Soyez prêts à participer !",
    image: require('assets/images/react-logo.png'),
  },
  {
    id: '2',
    auteur: 'Nom Admin',
    date: '8j',
    contenu: "Le ",
    dateImportant: "18 mars",
    suite: ", nous organisons une journée sportive pour tous les élèves. Soyez prêts à participer !",
    image: require('assets/images/react-logo.png'),
  },
  {
    id: '2',
    auteur: 'Nom Admin',
    date: '8j',
    contenu: "Le ",
    dateImportant: "18 mars",
    suite: ", nous organisons une journée sportive pour tous les élèves. Soyez prêts à participer !",
    image: require('assets/images/react-logo.png'),
  },
];

// Screen des Annonces
const AnnoncesScreen = () => {
  const [search, setSearch] = useState('');

  // Filtrage des annonces selon la recherche
  const filteredAnnonces = annoncesData.filter(annonce =>
    `${annonce.contenu} ${annonce.suite}`.toLowerCase().includes(search.toLowerCase())
  );

  // Fonction pour rendre chaque annonce
  const renderAnnonce = ({ item }: { item: Annonce }) => (
    <View style={styles.annonceCard}>
      <View style={styles.header}>
          <Image
          source={require('assets/images/image admin.png')}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.auteur}</Text>
          <Text style={styles.date}>
            {item.date} · <Icon name="globe" size={12} />
          </Text>
        </View>
      </View>

      <Text style={styles.content}>
        {item.contenu}
        <Text style={styles.bold}>{item.dateImportant}</Text>
        {item.suite}
      </Text>

      <Image source={item.image} style={styles.image} resizeMode="cover" />
    </View>
  );

    const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MySchool</Text>
      </View>

      {/* Image Background */}
      <ImageBackground
        source={require('assets/images/backgroundadmin.png')}
        style={styles.backgroundImage}
      >
        <Text style={styles.text}>Annonces</Text>
      </ImageBackground>

      {/* Barre de recherche */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Rechercher dans les annonces"
          placeholderTextColor="#D1CFFF"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <Icon name="search" size={20} color="#fff" />
      </View>

      {/* Liste des annonces */}
      <FlatList
        data={filteredAnnonces}
        keyExtractor={(item) => item.id}
        renderItem={renderAnnonce}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBar: {
    backgroundColor: '#1d1790',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 140,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#1d1790',
    margin: 12,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: 12,
  },
  annonceCard: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: '#666',
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  backgroundImage: {
    height: 189,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 50,
  },
});

export default AnnoncesScreen;
