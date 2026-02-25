import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext';

export default function UserStorage() {
  const [inputText, setInputText] = useState('');
  const { setUserName } = useContext(UserContext); 

  const STORAGE_KEY = 'user_name'; 
  const saveName = async () => {
    if (inputText.trim() === '') {
      Alert.alert('Помилка', 'Введіть ім’я');
      return;
    }
    try {
      await AsyncStorage.setItem(STORAGE_KEY, inputText); 
      setUserName(inputText); 
      setInputText('');
      Alert.alert('Успіх', 'Ім’я збережено!');
    } catch (e) {
      console.error('Помилка збереження:', e);
    }
  };

  const clearName = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY); 
      setUserName('Гість'); 
      Alert.alert('Очищено', 'Ім’я видалено');
    } catch (e) {
      console.error('Помилка видалення:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Керування профілем</Text>

      
      <View style={styles.buttonCenterContainer}>
        <TouchableOpacity 
          style={[styles.smallBtn, styles.saveBtn]} 
          onPress={saveName}
        >
          <Text style={styles.btnText}>Зберегти</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.smallBtn, styles.clearBtn]} 
          onPress={clearName}
        >
          <Text style={styles.btnText}>Стерти</Text>
        </TouchableOpacity>
      </View>

      
      <TextInput
        style={styles.input}
        placeholder="Введіть нове ім'я..."
        value={inputText}
        onChangeText={setInputText} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
    textAlign: 'center', 
  },
  buttonCenterContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    gap: 15, 
    marginBottom: 12,
  },
  smallBtn: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 6,
    minWidth: 90,
    alignItems: 'center',
  },
  saveBtn: {
    backgroundColor: '#28a745',
  },
  clearBtn: {
    backgroundColor: '#dc3545',
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#fafafa',
    fontSize: 14,
    textAlign: 'center', 
  },
});