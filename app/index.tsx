import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtlasLogo } from '../src/components/AtlasLogo';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { ProgressBar } from '../src/components/ProgressBar';
import { colors } from '../src/theme';

export default function StartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <ProgressBar step={1} />
      <View style={styles.center}>
        <AtlasLogo />
        <Text style={styles.title}>Wat wil je doen?</Text>
        <Text style={styles.subtitle}>Klaar om een betere beslissing te nemen.</Text>
        <PrimaryButton
          label="Ik ga een Risk Assessment doen"
          onPress={() => router.push('/method')}
        />
        <Pressable accessibilityRole="link" onPress={() => router.push('/activities')} style={styles.linkHit}>
          <Text style={styles.link}>Of kies een andere activiteit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 48,
  },
  title: {
    marginTop: 36,
    color: colors.title,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 28,
    color: '#B5B5BE',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  linkHit: {
    alignSelf: 'center',
    marginTop: 18,
    paddingVertical: 6,
  },
  link: {
    color: '#C8C8D0',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
