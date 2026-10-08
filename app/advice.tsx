import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAssessment } from '../src/assessment/AssessmentContext';
import { BackButton } from '../src/components/BackButton';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { ProgressBar } from '../src/components/ProgressBar';
import { colors } from '../src/theme';

const EXAMPLES = [
  'Beperk reiken boven schouderhoogte waar dat kan.',
  'Beoordeel een passief schouder-exoskelet bij herhaald bovenhands werk.',
  'Meet opnieuw nadat de taak is aangepast.',
];

export default function AdviceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { reset } = useAssessment();

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}>
      <ProgressBar step={4} />
      <View style={styles.header}>
        <BackButton />
      </View>
      <View style={styles.body}>
        <Text style={styles.kicker}>ADVIES</Text>
        <Text style={styles.title}>Advies</Text>
        <View style={styles.card}>
          <Text style={styles.badge}>PLACEHOLDER</Text>
          <Text style={styles.lead}>
            In de volledige app komen hier concrete maatregelen op basis van de meting. Deze build toont nog geen adviesmodel.
          </Text>
        </View>
        <Text style={styles.exampleTitle}>Voorbeeld van wat hier later staat</Text>
        {EXAMPLES.map((item) => (
          <Text key={item} style={styles.bullet}>
            · {item}
          </Text>
        ))}
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          label="Nieuwe meting"
          onPress={() => {
            reset();
            router.dismissTo('/');
          }}
        />
        <Pressable onPress={() => router.back()} style={styles.backHit}>
          <Text style={styles.backLink}>Terug naar rapport</Text>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  kicker: {
    color: colors.purple,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 6,
    color: colors.white,
    fontSize: 32,
    fontWeight: '800',
  },
  card: {
    marginTop: 16,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 16,
  },
  badge: {
    color: colors.purple,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  lead: {
    marginTop: 8,
    color: colors.text,
    fontSize: 16,
    lineHeight: 23,
  },
  exampleTitle: {
    marginTop: 18,
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  bullet: {
    marginTop: 8,
    color: '#D4D4D8',
    fontSize: 15,
    lineHeight: 21,
  },
  footer: {
    paddingHorizontal: 20,
  },
  backHit: {
    alignSelf: 'center',
    marginTop: 12,
  },
  backLink: {
    color: '#D0D0D6',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
