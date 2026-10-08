import { View } from 'react-native';
import { progressColors } from '../theme';

type Props = {
  step: 1 | 2 | 3 | 4;
};

export function ProgressBar({ step }: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: 12, paddingTop: 8 }}>
      {progressColors.map((color, index) => (
        <View
          key={color}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            backgroundColor: index < step ? color : '#2A2A2E',
          }}
        />
      ))}
    </View>
  );
}
