import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { message } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Екран деталей</Text>
      <Text style={styles.message}>{message}</Text>

      <Button title="Назад" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  message: { fontSize: 20, color: 'blue', textAlign: 'center', marginBottom: 20 }
});
