import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const classes = ['Enseignant', 'Enfant'];

const SelectionedtModal = ({ visible, onClose }: Props) => {
  const router = useRouter();

  const handleSelect = (classe: string) => {
    onClose();

    if (classe === 'Enseignant') {
      router.push('/src/Firstpage/Admin/edtenseignant');
    } else if (classe === 'Enfant') {
      router.push('/src/Firstpage/Admin/edtenfant');
    }
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
          <Text style={styles.title}>Sélectionner une interface</Text>

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

export default SelectionedtModal;

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
