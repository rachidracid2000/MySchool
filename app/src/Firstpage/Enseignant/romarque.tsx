import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Image,ImageBackground, } from 'react-native';
import { useRouter } from 'expo-router';

type Eleve = {
  id: string;
  nom: string;
  prenom: string;
};

export default function ListeEleves() {
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const router = useRouter();

  useEffect(() => {
    setEleves([
      { id: '1', nom: 'Hadji', prenom: 'Imane' },
      { id: '2', nom: 'Khafi', prenom: 'Badis' },
      { id: '3', nom: 'Hammami', prenom: 'Sofiane' },
      { id: '4', nom: 'Hamani', prenom: 'Rachid' },
    ]);
  }, []);

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
                    <Text style={styles.text}>Remarques</Text>
                  </ImageBackground>
                  <View style={styles.container}>
      <Text style={styles.subtitle}>Veuillez sélectionner un élève</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.headertab]}>N°</Text>
        <Text style={[styles.cell, styles.headertab]}>Nom</Text>
        <Text style={[styles.cell, styles.headertab]}>Prénom</Text>
      </View>

      <FlatList
        data={eleves}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
          </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', color: 'purple', marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20,marginTop:10, },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 8, backgroundColor: '#f0f0f0' },
  row: { flexDirection: 'row', borderBottomWidth: 0.5, paddingVertical: 10 },
  cell: { flex: 1, textAlign: 'center' },
  header: {  backgroundColor: "#2c22b0",
    height: 60,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", },
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
      headertab: { fontWeight: 'bold', padding:6 },
});
