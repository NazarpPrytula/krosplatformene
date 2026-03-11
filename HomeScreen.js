import React, { useEffect, useState, useContext } from 'react';
import UserStorage from './UserStorage';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity, 
  Button, 
  TextInput,
  Image,
  ScrollView 
} from 'react-native';
import { UserContext } from './UserContext';
import ModalExample from './ModalExample';

export default function HomeScreen({ navigation }) {
  const { userName } = useContext(UserContext); 

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [formError, setFormError] = useState('');

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    setShowProducts(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (inputName.trim() === '' || inputEmail.trim() === '') {
      setFormError('Будь ласка, заповніть усі поля!'); 
    } else {
      setFormError('');
      console.log('Дані форми:', { name: inputName, email: inputEmail });
      alert(`Дані надіслано: ${inputName}`);
      setInputName('');
      setInputEmail('');
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Кнопки навігації Firebase */}
      <View style={styles.firebaseButtons}>
        <View style={styles.buttonContainer}>
          <Button 
            title="☁️ Список завдань" 
            onPress={() => navigation.navigate("TaskList")} 
            color="#3498db" 
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title="➕ Додати завдання" 
            onPress={() => navigation.navigate("AddTask")} 
            color="#2ecc71" 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.lolcontainer} horizontal={true} showsHorizontalScrollIndicator={false}> 
        <Image
          source={require('./assets/house.jpg')}
          style={styles.localImage}
          resizeMode="contain"
        />
        <Image
          source={{uri: 'https://thermohouse.ie/wp-content/uploads/2019/04/hero-image.jpg'}}
          style={styles.networkImage}
          resizeMode="stretch"
        />
      </ScrollView>
     
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Реєстрація</Text>
        <TextInput
          style={styles.input}
          placeholder="Ім’я користувача"
          value={inputName}
          onChangeText={(text) => setInputName(text)} 
        />
        <TextInput
          style={styles.input}
          placeholder="Електронна пошта"
          value={inputEmail}
          onChangeText={(text) => setInputEmail(text)}
          keyboardType="email-address"
        />
        {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
        <View style={styles.buttonWrapper}>
          <Button title="Надіслати" onPress={handleSubmit} color="#007AFF" />
        </View>
      </View>

      <Text style={styles.welcomeTitle}>Лаба 9</Text>
      <UserStorage />

      <View style={styles.buttonContainer}>
        <Button title="Редагувати профіль" onPress={() => navigation.navigate("Profile")} color="#6c757d" />
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title={showProducts ? "Оновити продукти" : "Показати продукти"} 
          onPress={fetchProducts} 
          color="#28a745"
        />
      </View>

      <ModalExample />
      
      {showProducts && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Продукти:</Text>
          {productsLoading ? (
            <ActivityIndicator size="small" color="#28a745" />
          ) : (
            products.map(item => (
              <View key={item.id} style={styles.productItem}>
                <Text numberOfLines={1} style={styles.productTitle}>📦 {item.title}</Text>
              </View>
            ))
          )}
        </View>
      )}

      <Text style={[styles.subtitle, { marginTop: 20 }]}>Список користувачів API:</Text>
    </View>
  );

  if (usersLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader()} 
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.userCard} 
            onPress={() => navigation.navigate("Details", { user: item })}
          >
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, backgroundColor: '#fff' },
  firebaseButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  welcomeTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  formContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    elevation: 3,
  },
  formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
  },
  errorText: { color: 'red', marginBottom: 10, textAlign: 'center' },
  buttonWrapper: { marginTop: 5 },
  buttonContainer: { marginBottom: 10, flex: 0.48 }, // Трохи менше половини для ряду
  section: { marginTop: 10, padding: 10, backgroundColor: '#e9ecef', borderRadius: 10 },
  subtitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  listContent: { paddingBottom: 20 },
  userCard: { 
    padding: 15, 
    backgroundColor: '#fff', 
    marginHorizontal: 15, 
    marginTop: 10, 
    borderRadius: 8,
    elevation: 2,
  },
  userName: { fontSize: 16, fontWeight: 'bold' },
  userEmail: { color: '#666' },
  productItem: { padding: 8, backgroundColor: '#fff', marginBottom: 5, borderRadius: 5 },
  productTitle: { fontSize: 14, color: '#333' },
  lolcontainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  localImage:{
    width: 150,
    height: 150,
    marginRight: 15,
    borderRadius: 10
  },
  networkImage: {
    width: 150,
    height: 150,
    borderRadius: 20
  }
});