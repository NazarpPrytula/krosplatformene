import React, { useState } from 'react';
import { StyleSheet, View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MediaScreen() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Запит дозволу на доступ до медіабібліотеки
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Помилка', 'Потрібен доступ до галереї!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Обрати фото з галереї" onPress={pickImage} color="#9b59b6" />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  image: { width: 300, height: 300, marginTop: 20, borderRadius: 10 },
});