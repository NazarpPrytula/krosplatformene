import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function SensorScreen() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // Вмикаємо акселерометр
    const subscription = Accelerometer.addListener(setData);
    Accelerometer.setUpdateInterval(100); // Оновлення кожні 100 мс

    return () => subscription.remove(); // Відписка при виході
  }, []);

  // Якщо нахил по осі X більше 0.5 — текст червоний, інакше зелений
  const textColor = x > 0.5 || x < -0.5 ? '#e74c3c' : '#2ecc71';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Нахиляйте телефон вліво/вправо:</Text>
      <Text style={[styles.text, { color: textColor }]}>
        X: {x.toFixed(2)}
      </Text>
      <View style={styles.details}>
        <Text>Y (вперед/назад): {y.toFixed(2)}</Text>
        <Text>Z (вгору/вниз): {z.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
  label: { fontSize: 16, marginBottom: 10, color: '#666' },
  text: { fontSize: 40, fontWeight: 'bold', marginBottom: 20 },
  details: { alignItems: 'center' }
});