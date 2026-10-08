import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { colors } from '../src/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pagina niet gevonden</Text>
      <PrimaryButton label="Naar start" onPress={() => router.replace('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
});
