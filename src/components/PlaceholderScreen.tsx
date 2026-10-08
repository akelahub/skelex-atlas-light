import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from './BackButton';
import { ProgressBar } from './ProgressBar';
import { colors } from '../theme';

type Props = {
  kicker: string;
  title: string;
  body: string;
};

export function PlaceholderScreen({ kicker, title, body }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
      <ProgressBar step={1} />
      <View style={styles.header}>
        <BackButton />
      </View>
      <View style={styles.body}>
        <Text style={styles.kicker}>{kicker}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.card}>
          <Text style={styles.badge}>PLACEHOLDER</Text>
          <Text style={styles.bodyText}>{body}</Text>
        </View>
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
    paddingTop: 20,
  },
  kicker: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  title: {
    marginTop: 8,
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  card: {
    marginTop: 18,
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
  bodyText: {
    marginTop: 10,
    color: colors.text,
    fontSize: 16,
    lineHeight: 23,
  },
});
