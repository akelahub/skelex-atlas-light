import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAssessment } from '../src/assessment/AssessmentContext';
import { BackButton } from '../src/components/BackButton';
import { MethodIcon } from '../src/components/MethodIcon';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { ProgressBar } from '../src/components/ProgressBar';
import { METHODS } from '../src/mock/methods';
import { colors } from '../src/theme';

export default function MethodScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { method, setMethod } = useAssessment();

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}>
      <ProgressBar step={2} />
      <View style={styles.header}>
        <BackButton />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Welke methode wil je gebruiken?</Text>
        <Text style={styles.lead}>Kies de methode die past bij jouw situatie.</Text>
        {METHODS.map((item) => {
          const selected = method === item.id;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setMethod(item.id)}
              style={[styles.row, selected ? styles.rowOn : null]}
            >
              <View style={[styles.icon, selected ? styles.iconOn : null]}>
                <MethodIcon id={item.id} active={selected} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.footer}>
        <Text style={styles.note}>Verder blijft dicht tot je één methode kiest.</Text>
        <PrimaryButton
          label="Verder"
          disabled={method == null}
          onPress={() => router.push('/consent')}
        />
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
  title: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
  },
  lead: {
    marginTop: 8,
    marginBottom: 16,
    color: colors.muted,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  rowOn: {
    borderColor: colors.green,
    backgroundColor: '#102112',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#242428',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOn: {
    backgroundColor: '#1C3A20',
  },
  rowText: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 13,
  },
  footer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  note: {
    color: colors.faint,
    fontSize: 13,
    textAlign: 'center',
  },
});
