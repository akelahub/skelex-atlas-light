import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { MethodId } from '../mock/methods';
import { colors } from '../theme';

type Props = {
  id: MethodId;
  active?: boolean;
};

export function MethodIcon({ id, active = false }: Props) {
  const stroke = active ? colors.title : colors.white;
  if (id === 'RULA') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Circle cx={12} cy={5} r={2.1} fill="none" stroke={stroke} strokeWidth={1.6} />
        <Path
          d="M12 8.2 v6.2 M8.2 11.2 h7.6 M9.2 20.2 l2.8-5.8 2.8 5.8"
          fill="none"
          stroke={stroke}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
  if (id === 'REBA') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Rect x={6} y={3.5} width={12} height={17} rx={2} fill="none" stroke={stroke} strokeWidth={1.6} />
        <Path d="M9 9 h6 M9 12.5 h6 M9 16 h4" stroke={stroke} strokeWidth={1.6} strokeLinecap="round" />
      </Svg>
    );
  }
  if (id === 'NIOSH') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Path
          d="M8 8.5 h8 v3.2 H8 z M7 14.5 h10 v5 H7 z"
          fill="none"
          stroke={stroke}
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
        <Path d="M12 8.5 V5.2" stroke={stroke} strokeWidth={1.6} strokeLinecap="round" />
      </Svg>
    );
  }
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path
        d="M7 3.8 h7 l4 4 V20 a1.4 1.4 0 0 1-1.4 1.4 H7 A1.4 1.4 0 0 1 5.6 20 V5.2 A1.4 1.4 0 0 1 7 3.8 z"
        fill="none"
        stroke={stroke}
        strokeWidth={1.6}
      />
      <Path d="M14 3.8 V8 h4.2" fill="none" stroke={stroke} strokeWidth={1.6} />
    </Svg>
  );
}
