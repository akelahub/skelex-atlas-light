import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAssessment } from '../src/assessment/AssessmentContext';
import { BackButton } from '../src/components/BackButton';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { ProgressBar } from '../src/components/ProgressBar';
import { formatDuration } from '../src/format';
import type { MethodId } from '../src/mock/methods';
import {
  COMPARISON,
  REPORT_WITH_EXO,
  REPORT_WITHOUT,
  comparisonDisclaimer,
  comparisonIntro,
  methodNote,
  scoreColumnLabel,
  type ScoreTone,
} from '../src/mock/report';
import { colors } from '../src/theme';

const TONE_COLOR: Record<ScoreTone, string> = {
  low: colors.good,
  mid: colors.orange,
  high: colors.bad,
};

export default function ReportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { method, durationSec, usedExo, reset } = useAssessment();
  const activeMethod: MethodId = method ?? 'RULA';
  const report = usedExo ? REPORT_WITH_EXO : REPORT_WITHOUT;
  const note = methodNote(activeMethod);
  const rows = COMPARISON.map((row, index) => {
    if (index === 0) {
      return { ...row, label: scoreColumnLabel(activeMethod, 'avg') };
    }
    if (index === 1) {
      return { ...row, label: scoreColumnLabel(activeMethod, 'max') };
    }
    return row;
  });

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ProgressBar step={4} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: insets.bottom + 28,
        }}
      >
        <BackButton />
        <Text style={styles.kicker}>RAPPORT & INZICHT</Text>
        <Text style={styles.title}>Risk Assessment – {activeMethod}</Text>
        <Text style={styles.meta}>
          Opname {formatDuration(durationSec)} · simulatie {usedExo ? 'aan' : 'uit'}
        </Text>
        <Text style={[styles.risk, { color: TONE_COLOR[report.tone] }]}>{report.riskLabel}</Text>
        <Text style={styles.scoreLine}>
          Score: <Text style={styles.score}>{report.score}</Text>
        </Text>
        <Text style={[styles.action, { color: TONE_COLOR[report.tone] }]}>{report.action}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Analyse</Text>
          {report.rows.map((row, index) => (
            <View key={row.label} style={[styles.analyseRow, index === 0 ? styles.firstRow : null]}>
              <Text style={styles.analyseLabel}>{row.label}</Text>
              <Text style={[styles.analyseValue, { color: TONE_COLOR[row.tone] }]}>{row.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Conclusie</Text>
          <Text style={styles.conclusion}>{report.conclusion}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Met en zonder exoskelet</Text>
          <Text style={styles.intro}>{comparisonIntro(usedExo)}</Text>
          <View style={styles.tableHead}>
            <Text style={styles.headLabel}> </Text>
            <Text style={[styles.headValue, styles.colWithout]}>ZONDER</Text>
            <Text style={[styles.headValue, styles.colWith]}>MET</Text>
            <Text style={[styles.headValue, styles.colDiff]}>VERSCHIL</Text>
          </View>
          {rows.map((row) => (
            <View key={row.label} style={styles.tableRow}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text
                style={[
                  styles.rowValue,
                  styles.colWithout,
                  { color: row.withoutTone === 'red' ? colors.bad : colors.worse },
                ]}
              >
                {row.without}
              </Text>
              <Text style={[styles.rowValue, styles.colWith, styles.good]}>{row.withExo}</Text>
              <Text style={[styles.rowValue, styles.colDiff, styles.good]}>{row.diff}</Text>
            </View>
          ))}
          <Text style={styles.disclaimer}>{comparisonDisclaimer()}</Text>
          {note ? <Text style={styles.note}>{note}</Text> : null}
        </View>

        <PrimaryButton label="Bekijk Advies" onPress={() => router.push('/advice')} />
        <Pressable
          onPress={() => {
            reset();
            router.dismissTo('/');
          }}
          style={styles.newHit}
        >
          <Text style={styles.newLink}>Nieuwe meting</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  kicker: {
    marginTop: 16,
    color: colors.purple,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 6,
    color: colors.white,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
  },
  meta: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 14,
  },
  risk: {
    marginTop: 16,
    fontSize: 32,
    fontWeight: '800',
  },
  scoreLine: {
    marginTop: 6,
    color: colors.white,
    fontSize: 16,
  },
  score: {
    fontWeight: '800',
  },
  action: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: '700',
  },
  card: {
    marginTop: 16,
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  cardTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  analyseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2E',
  },
  firstRow: {
    marginTop: 8,
  },
  analyseLabel: {
    color: colors.text,
    fontSize: 16,
  },
  analyseValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  conclusion: {
    marginTop: 8,
    color: '#D4D4D8',
    fontSize: 15,
    lineHeight: 22,
  },
  intro: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  tableHead: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 14,
    paddingBottom: 6,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2E',
  },
  headLabel: {
    flex: 1,
    flexShrink: 1,
  },
  headValue: {
    textAlign: 'right',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  colWithout: {
    width: 62,
    color: colors.worse,
  },
  colWith: {
    width: 48,
    color: colors.good,
  },
  colDiff: {
    width: 78,
    color: colors.good,
  },
  rowLabel: {
    flex: 1,
    flexShrink: 1,
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    paddingRight: 6,
  },
  rowValue: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  good: {
    color: colors.good,
  },
  disclaimer: {
    marginTop: 10,
    color: colors.faint,
    fontSize: 12,
    lineHeight: 17,
  },
  note: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  newHit: {
    alignSelf: 'center',
    marginTop: 16,
    paddingVertical: 6,
  },
  newLink: {
    color: '#D0D0D6',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
