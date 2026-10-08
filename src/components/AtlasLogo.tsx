import { Text, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { colors } from '../theme';

type Props = {
  compact?: boolean;
};

export function AtlasLogo({ compact = false }: Props) {
  const mark = compact ? 22 : 40;
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={mark} height={mark * 0.92} viewBox="0 0 40 36">
        <Polygon
          points="20,2 37,34 3,34"
          fill="none"
          stroke={colors.white}
          strokeWidth={compact ? 2.2 : 1.6}
        />
        <Polygon points="20,12 29,30 11,30" fill={colors.green} />
      </Svg>
      <Text
        style={{
          marginTop: compact ? 2 : 8,
          color: colors.white,
          fontSize: compact ? 13 : 20,
          fontWeight: '700',
          letterSpacing: compact ? 1.6 : 3,
        }}
      >
        ATLAS
      </Text>
      {compact ? null : (
        <Text
          style={{
            marginTop: 2,
            color: colors.muted,
            fontSize: 10,
            letterSpacing: 1.4,
          }}
        >
          ENGINEERING LIBRARY
        </Text>
      )}
    </View>
  );
}
