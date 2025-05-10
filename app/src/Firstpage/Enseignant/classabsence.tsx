import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  visible: boolean;
  onClose: () => void;      
 };

const classes = ['1ST2', '1L3', '3ST1', '2SE3'];

const SelectionClasseAbsenceModal = ({ visible, onClose }: Props) => {
  const router = useRouter();

  const handleSelect = (classe: string) => {
    onClose(); // ferme le modal
    router.push('/src/Firstpage/Enseignant/absence'); // redirige
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Sélectionner une classe</Text>

          <FlatList
            data={classes}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity style={styles.classItem} onPress={() => handleSelect(item)}>
                  <Image
                    source={require('assets/images/class.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.classText}>{item}</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
              </>
            )}
          />

          <TouchableOpacity onPress={onClose} style={styles.okButton}>
            <Text style={styles.okText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectionClasseAbsenceModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#2c22b0',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    maxHeight: '80%',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  classItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  classText: {
    color: '#fff',
    fontSize: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 8,
  },
  okButton: {
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  okText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
