import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBanner } from '@/components/atoms/HeaderBanner';

export default function ContactScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <HeaderBanner title="You" />
      <View style={styles.content}>
        <Text style={styles.placeholder}>（コンテンツ placeholder）</Text>
      </View>
    </SafeAreaView>
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