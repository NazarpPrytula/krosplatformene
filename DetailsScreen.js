
import { View, Text, StyleSheet, Button } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { message } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Екран деталей</Text>

      <Text style={styles.message}>
        {message}
      </Text>

      <View style={styles.button}>
        <Button
          title="Повернутися назад"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    color: 'blue',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: 200,
  },
});
