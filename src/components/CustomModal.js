import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const CustomModal = ({ visible, title, body, onConfirm, onCancel }) => (
  <Modal visible={visible} transparent>
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={onConfirm} />
          <Button title="Cancel" onPress={onCancel} />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CustomModal;
