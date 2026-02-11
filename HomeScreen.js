import { View, Text, Button, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import ModalExample from './ModalExample';

export default function HomeScreen({ navigation }) {
  const { userName } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Привіт, {userName}! 👋</Text>

      <Button
        title="Перейти до деталей"
        onPress={() => navigation.navigate("Details", {
          message: "Привіт з головного екрану!"
        })}
      />

      <Button
        title="Редагувати ім’я"
        onPress={() => navigation.navigate("Profile")}
      />

      <ModalExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' }
});
