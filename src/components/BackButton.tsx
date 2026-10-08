import { Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme';

type Props = {
  onPress?: () => void;
};

export function BackButton({ onPress }: Props) {
  const router = useRouter();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Terug"
      onPress={onPress ?? (() => router.back())}
      style={styles.button}
    >
      <Svg width={18} height={18} viewBox="0 0 18 18">
        <Path
          d="M11.5 3.5 L6 9 l5.5 5.5"
          fill="none"
          stroke={colors.white}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1,
    borderColor: '#3A3A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
