import { View, Text, Button, StyleSheet } from 'react-native';
import Header from './header';
import Footer from './footer';
import ModalExample from './ModalExample';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="HEADER" />
      <Text style={styles.title}>Це головний екран</Text>

      <Button
        title="Перейти до деталей"
        onPress={() =>
          navigation.navigate('Details', {
            message: "Привіт з головного екрану!"
          })
        }
      />
        <ModalExample />

      <Footer text="FOOTER" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
