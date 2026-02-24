import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserStorage() {
  const [userName, setUserName] = useState(''); // Стан для TextInput
  const [displayedName, setDisplayedName] = useState(''); // Стан для відображення збережених даних

  const STORAGE_KEY = 'user_name_key';

  // 4. Під час завантаження компоненту отримуємо дані з AsyncStorage
  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedValue !== null) {
          setDisplayedName(storedValue);
        }
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };

    fetchStoredData();
  }, []);

  // 3. Функція для збереження імені
  const handleSave = async () => {
    if (userName.trim() === '') {
      Alert.alert("Попередження", "Поле не може бути порожнім");
      return;
    }
    try {
      await AsyncStorage.setItem(STORAGE_KEY, userName);
      setDisplayedName(userName);
      setUserName(''); // Очищуємо інпут після збереження
      Alert.alert("Успіх", "Ім’я збережено у пам'ять пристрою");
    } catch (error) {
      console.error("Помилка при збереженні:", error);
    }
  };

  // 5. Функція для очищення даних
  const handleClear = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setDisplayedName('');
      Alert.alert("Очищено", "Збережене значення видалено");
    } catch (error) {
      console.error("Помилка при видаленні:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Збережене ім'я: {displayedName || '—'}</Text>

      {/* 2. Поле TextInput для введення імені */}
      <TextInput
        style={styles.input}
        placeholder="Введіть ім'я..."
        value={userName}
        onChangeText={setUserName}
      />

      <View style={styles.row}>
        {/* 3. Кнопка "Зберегти" */}
        <Button title="Зберегти" onPress={handleSave} color="#4CAF50" />
        <View style={{ width: 10 }} />
        {/* 5. Кнопка "Очистити" */}
        <Button title="Очистити" onPress={handleClear} color="#F44336" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  }
});