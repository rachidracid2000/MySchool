import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 
import { useLocalSearchParams } from 'expo-router'; 

const Absence = () => {
  const router = useRouter(); 
  const { nom } = useLocalSearchParams(); 

  // ✅ Données simulées
  const absencesByDate: Record<string, any[]> = {
    '2025-04-14': [
      { id: '1', time: '08:00 - 09:00', subject: 'Mathématiques', teacher: 'Mr. Karim' },
      { id: '2', time: '09:00 - 10:00', subject: 'Physique', teacher: 'Mme Amina' },
    ],
    '2025-04-15': [
      { id: '3', time: '10:00 - 11:00', subject: 'Histoire', teacher: 'Mme Laila' },
    ],
    '2025-04-16': [],
  };

  const getToday = () => new Date().toISOString().split('T')[0]; // Utilise le format ISO pour la date
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [absences, setAbsences] = useState<any[]>([]);

  useEffect(() => {
    const data = absencesByDate[selectedDate] || [];
    setAbsences(data);
  }, [selectedDate]);

  const handlePressBack = () => {
    router.push("/src/Firstpage/Parent/espaceparent"); 
  };

  const changeDate = (direction: 'prev' | 'next') => {
    const current = new Date(selectedDate);
    const newDate = new Date(current);
    newDate.setDate(current.getDate() + (direction === 'next' ? 1 : -1));

    // Formater la nouvelle date au format ISO (YYYY-MM-DD)
    const formatted = newDate.toISOString().split('T')[0];
    setSelectedDate(formatted);
  };

  // Fonction pour formater la date en français (par exemple: 14 avril 2025)
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', options); // Affichage en français
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.timeHeader}>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.subject}>Matière : {item.subject}</Text>
        <Text style={styles.teacher}>Enseignant : {item.teacher}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header identique */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePressBack}>
          <Text style={styles.backArrow}>
            <Image source={require('assets/images/image copy.png')} style={styles.bellIcon} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.appTitle}>MySchool</Text>
      </View>

      {/* Image de fond */}
      <ImageBackground
        source={require('assets/images/backgroundadmin.png')}
        style={{ height: 189 }}
      >
        <Text style={styles.text}>Absences</Text>
      </ImageBackground>

      {/* Navigation par date */}
      <View style={styles.datePicker}>
        <TouchableOpacity onPress={() => changeDate('prev')}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text> {/* Formatée ici */}
        <TouchableOpacity onPress={() => changeDate('next')}>
          <Ionicons name="chevron-forward" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Liste des absences */}
      {absences.length === 0 ? (
        <Text style={styles.noAbsence}>Aucune absence pour cette date.</Text>
      ) : (
        <FlatList
          data={absences}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#2c22b0',
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backArrow: {
    fontSize: 24,
    color: '#fff',
  },
  appTitle: {
    marginRight: 256,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bellIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFD700',
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
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: '#2c22b0',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginHorizontal: 16,
  },
  noAbsence: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  timeHeader: {
    backgroundColor: '#2c22b0',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  time: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
  },
  subject: {
    fontSize: 14,
    marginBottom: 4,
  },
  teacher: {
    fontSize: 14,
    color: '#555',
  },
});

export default Absence;
