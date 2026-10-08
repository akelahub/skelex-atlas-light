import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, disabled = false }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled ? styles.disabled : styles.enabled,
        pressed && !disabled ? styles.pressed : null,
      ]}
    >
      <Text style={[styles.label, disabled ? styles.labelDisabled : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  enabled: {
    backgroundColor: colors.green,
  },
  disabled: {
    backgroundColor: '#2A2A2E',
  },
  pressed: {
    opacity: 0.88,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  labelDisabled: {
    color: '#6E6E76',
  },
});
