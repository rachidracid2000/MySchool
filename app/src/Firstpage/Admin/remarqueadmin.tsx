import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

type Eleve = {
  id: string;
  nom: string;
  prenom: string;
  classe: string;
};

const classes = ['1A', '2B', '3C'];

export default function ListeEleves() {
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [classeSelectionnee, setClasseSelectionnee] = useState('');
  const router = useRouter();

  useEffect(() => {
    setEleves([
      { id: '1', nom: 'Hadji', prenom: 'Imane', classe: '1A' },
      { id: '2', nom: 'Khafi', prenom: 'Badis', classe: '1A' },
      { id: '3', nom: 'Hammami', prenom: 'Sofiane', classe: '2B' },
      { id: '4', nom: 'Hamani', prenom: 'Rachid', classe: '3C' },
    ]);
  }, []);

  const elevesFiltres = eleves.filter(eleve => eleve.classe === classeSelectionnee);

  const renderItem = ({ item, index }: { item: Eleve; index: number }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() =>
        router.push({
          pathname: '/src/Firstpage/Enseignant/[remarque]',
          params: {
            remarque: item.id,
            nom: item.nom,
            prenom: item.prenom,
          },
        })
      }
    >
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.nom}</Text>
      <Text style={styles.cell}>{item.prenom}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>
            <Image source={require("assets/images/image copy.png")} style={styles.bellIcon} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.appTitle}>MySchool</Text>
      </View>

      <ImageBackground source={require("assets/images/backgroundadmin.png")} style={{ height: 189 }}>
        <Text style={styles.text}>Remarques</Text>
      </ImageBackground>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Veuillez sélectionner une classe</Text>

        <Picker
          selectedValue={classeSelectionnee}
          onValueChange={(itemValue) => setClasseSelectionnee(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="-- Choisir une classe --" value="" />
          {classes.map((classe, index) => (
            <Picker.Item label={classe} value={classe} key={index} />
          ))}
        </Picker>

        {classeSelectionnee !== '' && (
          <>
            <View style={styles.tableHeader}>
              <Text style={[styles.cell, styles.headertab]}>N°</Text>
              <Text style={[styles.cell, styles.headertab]}>Nom</Text>
              <Text style={[styles.cell, styles.headertab]}>Prénom</Text>
            </View>

            <FlatList
              data={elevesFiltres}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', color: 'purple', marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 10 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 8, backgroundColor: '#f0f0f0' },
  row: { flexDirection: 'row', borderBottomWidth: 0.5, paddingVertical: 10 },
  cell: { flex: 1, textAlign: 'center' },
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
    paddingVertical: 50,
  },
  appTitle: {
    marginRight: 256,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headertab: { fontWeight: 'bold', padding: 6 },
  picker: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9'
  },
});
