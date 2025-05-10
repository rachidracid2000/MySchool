
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image ,ImageBackground,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from "expo-router";
type Document = {
  id: string;
  teacherName: string;
  subject: string;
  isFavorite: boolean;
};

const mockDocuments: Document[] = [
  { id: '1', teacherName: 'Mme Dupont', subject: 'Mathématiques', isFavorite: true },
  { id: '2', teacherName: 'M. Martin', subject: 'Histoire', isFavorite: false },
  { id: '3', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '4', teacherName: 'M. Bernard', subject: 'Physique', isFavorite: true },
  { id: '5', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '6', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '7', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '8', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '9', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '0', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '11', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '12', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '33', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '31', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '32', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },
  { id: '333', teacherName: 'Mme Lopez', subject: 'SVT', isFavorite: false },

];

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    // Simuler un chargement depuis une base de données
    setDocuments(mockDocuments);
  }, []);

  const toggleFavorite = (id: string) => {
    const updated = documents.map((doc) =>
      doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
    );
    setDocuments(updated);
  };

  const renderItem = ({ item }: { item: Document }) => (
    <View style={styles.item}>
      <Image
        source={require('assets/images/document2.png')} // Mets ton image dossier ici
        style={styles.folderIcon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>nom enseignant</Text>
        <Text style={styles.subtitle}>objet</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Icon
          name={item.isFavorite ? 'star' : 'star-o'}
          size={24}
          color={item.isFavorite ? '#FFD700' : '#ffffff'}
        />
      </TouchableOpacity>
    </View>
  );
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const router = useRouter();
  return (
   <View  style={{}}> 
      <View style={styles.header}>
              <TouchableOpacity  onPress={() => router.back()}>
                <Text style={styles.backArrow}>
                  <Image source={require("assets/images/image copy.png")} style={styles.bellIcon} />
                </Text>
              </TouchableOpacity>
              <Text style={styles.appTitle}>MySchool</Text>
             
            </View >
      <View style={{backgroundColor:"white"}}></View>
            {/* Image Background */}
            {/* <ImageBackground
              source={require("assets/images/backgroundadmin.png")}
              style={{ height: 189 ,backgroundColor:"#fff" }}
            >
              <Text style={styles.text}>Documents</Text>
            </ImageBackground> */}
            <View style={styles.searchBar}>
            <TextInput
        placeholder="Rechercher dans les documents"
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        
      />
        <Icon name="search" size={20} color="#fff"  />
        </View>
    <FlatList
      data={documents}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />


</View>
  );
};

export default DocumentList;




const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: '#1d1790',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  folderIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
  },
  header: {
    backgroundColor: "#1d1790",
    height: 55,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth:1
    
    
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
    tintColor: "white",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 50,
  },
  rolesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
 
  roleImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  roleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
    searchBar: {
    // backgroundColor: '#fff',
    // borderRadius: 25,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // fontSize: 16,
    // marginBottom: 16,
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    color:"#fff",
textDecorationColor:"green"
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color:"#fff"
  },
});
