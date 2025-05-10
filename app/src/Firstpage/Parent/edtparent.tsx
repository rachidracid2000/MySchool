import React from 'react';
import { ScrollView, Text, View, StyleSheet ,Image,TouchableOpacity, ImageBackground,} from 'react-native';
import { useRouter } from "expo-router";

type JourSemaine = 'Dimanche' | 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi';

const edt: Record<JourSemaine, string[]> = {
  Dimanche: ['FRANC', 'ARAB', 'PHYS', 'TD: ARAB', 'TAMZ', 'ANG', 'SCIEN', ''],
  Lundi: ['ANG', 'FRANC', 'MATH', 'TD: MATH', 'TAMZ', 'ANG', '', ''],
  Mardi: ['ARAB', 'MATH', 'H/GEO', '', '', '', '', ''],
  Mercredi: ['DESS', 'TAMZ', 'FRANC', 'MATH', 'ARAB', 'H/GEO', '', ''],
  Jeudi: ['SPORT', 'SPORT', 'TD: FRANC', 'TD: ANG', 'TAMZ', 'PHYS', 'ARAB', '']
};

const horaires = [
  '',
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '13:30-14:30',
  '14:30-15:30',
  '15:30-16:30',
  '16:30-17:30',

];

export default function EmploiDuTemps() {
    const router = useRouter();
  return (
    <View  style={{ flex: 1 }}>
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
              <Text style={styles.text}>Emploi de temps</Text>
            </ImageBackground>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Première colonne (heures) */}
          <View>
            {horaires.map((heure, index) => (
              <View key={index} style={styles.timeCell}>
                <Text style={styles.timeText}>{heure}</Text>
              </View>
            ))}
          </View>
        </View>

        {Object.keys(edt).map((jour) => (
          <View key={jour} style={styles.dayColumn}>
            <View style={styles.headerCell}>
              <Text style={styles.dayText}>{jour}</Text>
            </View>
            {edt[jour as JourSemaine].map((cours, index) => (
              <View key={index} style={styles.courseCell}>
                <Text style={styles.courseText}>{cours}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeCell: {
    backgroundColor: '#dbe4f3',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    width: 100,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dayColumn: {
    marginLeft: 10,
  },
  headerCell: {
    backgroundColor: '#c9d3e3',
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
    width: 100,
    alignItems: 'center',
  },
  dayText: {
    fontWeight: 'bold',
  },
  courseCell: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    width: 100,
    alignItems: 'center',
  },
  courseText: {
    fontWeight: 'bold',
  },
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
  appTitle: {
    marginRight: 256,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
});
