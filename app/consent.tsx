import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAssessment } from '../src/assessment/AssessmentContext';
import { BackButton } from '../src/components/BackButton';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { ProgressBar } from '../src/components/ProgressBar';
import { colors } from '../src/theme';

export default function ConsentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { method, personConsent, deviceConsent, setPersonConsent, setDeviceConsent, acceptConsent } =
    useAssessment();
  const ready = personConsent && deviceConsent;

  useEffect(() => {
    if (!method) {
      router.replace('/method');
    }
  }, [method, router]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}>
      <ProgressBar step={3} />
      <View style={styles.header}>
        <BackButton />
      </View>
      <View style={styles.body}>
        <Text style={styles.kicker}>AKKOORD & OPNEMEN</Text>
        <Text style={styles.title}>Eerst toestemming</Text>
        <Text style={styles.lead}>
          De persoon in beeld moet akkoord zijn. Video blijft op dit apparaat en gaat niet naar een server.
        </Text>
        <View style={styles.note}>
          <Text style={styles.noteText}>
            Deze build gebruikt de camera niet. Je ziet een simulatie met een voorbeeldfoto en een nagebootst skelet.
          </Text>
        </View>
        <CheckRow
          checked={personConsent}
          label="De persoon in beeld is akkoord met deze opname."
          onPress={() => setPersonConsent(!personConsent)}
        />
        <CheckRow
          checked={deviceConsent}
          label="Ik begrijp dat video op het apparaat blijft."
          onPress={() => setDeviceConsent(!deviceConsent)}
        />
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          label="Akkoord & opnemen"
          disabled={!ready}
          onPress={() => {
            acceptConsent();
            router.push('/record');
          }}
        />
      </View>
    </View>
  );
}

function CheckRow({
  checked,
  label,
  onPress,
}: {
  checked: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={onPress} style={styles.check}>
      <View style={[styles.box, checked ? styles.boxOn : null]}>
        {checked ? <Text style={styles.tick}>✓</Text> : null}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </Pressable>
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
    color: colors.teal,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 8,
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  lead: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 22,
  },
  note: {
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: '#142018',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#245C32',
    padding: 14,
  },
  noteText: {
    color: colors.title,
    fontSize: 14,
    lineHeight: 20,
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 14,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#5A5A62',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOn: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  tick: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  checkLabel: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    lineHeight: 21,
  },
  footer: {
    paddingHorizontal: 20,
  },
});
