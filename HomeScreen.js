import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import { UserContext } from './UserContext';
import ModalExample from './ModalExample';

export default function HomeScreen({ navigation }) {
  const { userName } = useContext(UserContext);

  
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
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setProductsLoading(false);
    }
  };

  const ListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Привіт, {userName}! 👋</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Редагувати профіль" onPress={() => navigation.navigate("Profile")} />
      </View>

      

      <ModalExample />
      
      
      {showProducts && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Продукти:</Text>
          {productsLoading ? (
            <ActivityIndicator size="small" color="#000000" style={{ marginVertical: 10 }} />
          ) : (
            products.map(item => (
              <View key={item.id} style={styles.productItem}>
                <Text style={styles.productTitle}> {item.title.substring(0, 40)}...</Text>
              </View>
            ))
          )}
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button 
          title={showProducts ? "Оновити продукти" : "Показати продукти"} 
          onPress={fetchProducts} 
          color="#28a745"
        />
      </View>
      <Text style={[styles.subtitle, { marginTop: 20 }]}>Список користувачів:</Text>

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
        ListHeaderComponent={ListHeader}
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
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  buttonContainer: { marginBottom: 10 },
  section: { marginTop: 10, padding: 10, backgroundColor: '#e9ecef', borderRadius: 10 },
  subtitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  listContent: { paddingBottom: 20 },
  
  
  userCard: { 
    padding: 15, 
    backgroundColor: '#fff', 
    marginHorizontal: 15, 
    marginTop: 10, 
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userName: { fontSize: 16, fontWeight: 'bold' },
  userEmail: { color: '#666' },

  
  productItem: { 
    padding: 8, 
    backgroundColor: '#fff', 
    marginBottom: 5, 
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745'
  },
  productTitle: { fontSize: 14, color: '#333' }
});