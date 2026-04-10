import { StyleSheet, Text, View } from 'react-native';
import { HeaderBanner } from '../src/components/atoms/HeaderBanner';

export default function ServiceScreen() {
  return (
    <View style={styles.container}>
      <HeaderBanner title="Activity" />
      <View style={styles.content}>
        <Text style={styles.placeholder}>（コンテンツ placeholder）</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 14,
    color: '#666666',
  },
});