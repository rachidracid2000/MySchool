import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Notifications() {
  const notifications = [
    { id: '1', titre: 'Nouvelle annonce', date: '2024-04-20' },
    { id: '2', titre: 'Réunion reportée', date: '2024-04-19' },
  ];

  const supprimerNotif = (id: string) => {
    console.log('Supprimer la notif avec id:', id);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.notification}>
      <Image source={require('assets/images/image.png')} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.titre}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <TouchableOpacity onPress={() => supprimerNotif(item.id)}>
        <Image source={require('assets/images/suppicon.png')} style={styles.close} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2a2ea0', paddingTop: 50, paddingHorizontal: 20 },
  header: { fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 20 },
  notification: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  icon: { width: 25, height: 25, tintColor: 'orange', marginRight: 10 },
  close: { width: 25, height: 25, tintColor: 'red', marginLeft: 'auto' },
  textContainer: { flex: 1 },
  title: { fontSize: 16, color: 'white' },
  date: { fontSize: 14, color: '#ccc' },
  separator: { height: 1, backgroundColor: '#ccc', opacity: 0.3 },
});
