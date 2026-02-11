

import { Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return <Text style={styles.header}>{title}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 24, 
    marginBottom: 20,
  },
});

export default Header;
