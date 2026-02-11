

import { Text, StyleSheet } from 'react-native';

const Footer = ({ text }) => {
  return <Text style={styles.footer}>{text}</Text>;
};

const styles = StyleSheet.create({
  footer: {
    fontSize: 12, 
    color: 'gray', 
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default Footer;
