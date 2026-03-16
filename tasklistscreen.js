import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

export default function TaskListScreen() {
    console.log("Екран отримав DB:", db);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Створюємо запит: колекція "tasks", сортування за часом
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));

    // Слухаємо зміни в реальному часі
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
    });

    return () => unsubscribe(); // Відписуємось при виході
  }, []);

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View >
          <Text >{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      )}
    />
  );
}

