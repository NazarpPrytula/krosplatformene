import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { UserContext } from './UserContext';

export default function ProfileScreen() {
  const { userName, setUserName } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ваше ім’я:</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
        placeholder="Введіть ім’я"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10, fontSize: 16 }
});
