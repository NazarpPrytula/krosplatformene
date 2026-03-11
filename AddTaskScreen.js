import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const saveToFirebase = async () => {
    if (!title.trim() || !desc.trim()) {
      Alert.alert("Помилка", "Заповніть усі поля!");
      return;
    }

    setIsSaving(true);
    try {
      // Додаємо новий документ у колекцію "tasks"
      await addDoc(collection(db, "tasks"), {
        title: title,
        description: desc,
        completed: false,
        createdAt: serverTimestamp() // Автоматичний час від сервера
      });

      Alert.alert("Успіх", "Запис додано до хмари!", [
        { text: "OK", onPress: () => navigation.goBack() } // Повертаємось назад
      ]);
      
      setTitle('');
      setDesc('');
    } catch (e) {
      Alert.alert("Помилка", e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Назва завдання" 
        value={title}
        onChangeText={setTitle} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Опис (що треба зробити?)" 
        value={desc} 
        onChangeText={setDesc}
        style={[styles.input, { height: 100 }]} 
        multiline
      />
      {isSaving ? (
        <ActivityIndicator size="large" color="#2ecc71" />
      ) : (
        <Button title="Зберегти у Firebase" onPress={saveToFirebase} color="#2ecc71" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 8,
    backgroundColor: '#fafafa' 
  }
});