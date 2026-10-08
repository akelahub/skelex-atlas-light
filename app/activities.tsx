import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from '../src/components/BackButton';
import { ProgressBar } from '../src/components/ProgressBar';
import { colors } from '../src/theme';

const ITEMS = [
  {
    href: '/advisor' as const,
    kicker: 'SUPPORT STRENGTH ADVISOR',
    body: 'Direct inzicht in veiligheidsprestaties en prioriteiten.',
  },
  {
    href: '/roi' as const,
    kicker: 'ROI CALCULATOR',
    body: 'Maak de financiële impact van verbeteringen inzichtelijk.',
  },
];

export default function ActivitiesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}>
      <ProgressBar step={1} />
      <View style={styles.header}>
        <BackButton />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Kies een andere activiteit</Text>
        <Text style={styles.lead}>Deze onderdelen zijn placeholders in Atlas Light.</Text>
        {ITEMS.map((item) => (
          <Pressable key={item.href} onPress={() => router.push(item.href)} style={styles.card}>
            <Text style={styles.kicker}>{item.kicker}</Text>
            <Text style={styles.cardBody}>{item.body}</Text>
            <Text style={styles.open}>Open placeholder</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
  },
  lead: {
    marginTop: 8,
    marginBottom: 18,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 16,
    marginBottom: 12,
  },
  kicker: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  cardBody: {
    marginTop: 8,
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
  },
  open: {
    marginTop: 12,
    color: colors.title,
    fontSize: 14,
    fontWeight: '700',
  },
});
