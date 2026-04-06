import { StyleSheet, Text, View } from 'react-native';

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You</Text>
      <Text style={styles.placeholder}>（コンテンツ placeholder）</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#12A497',
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 14,
    color: '#666666',
  },
});