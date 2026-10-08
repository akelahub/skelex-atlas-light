import Svg, { Circle, Line } from 'react-native-svg';
import { BONES, BRACE_BONES, LANDMARKS, type JointId } from '../pose/landmarks';
import { jointColor } from '../pose/simulatePose';
import { colors } from '../theme';

type Props = {
  width: number;
  height: number;
  exo: boolean;
};

function point(id: JointId, width: number, height: number) {
  const joint = LANDMARKS.find((item) => item.id === id);
  if (!joint) {
    return { x: 0, y: 0 };
  }
  return { x: joint.x * width, y: joint.y * height };
}

export function SkeletonOverlay({ width, height, exo }: Props) {
  if (width <= 0 || height <= 0) {
    return null;
  }

  const boneWidth = Math.max(2.5, width * 0.012);
  const jointRadius = Math.max(4.5, width * 0.02);
  const head = point('head', width, height);
  const headRadius = width * 0.05;

  return (
    <Svg width={width} height={height}>
      {exo
        ? BRACE_BONES.map(([from, to]) => {
            const a = point(from, width, height);
            const b = point(to, width, height);
            return (
              <Line
                key={`brace-${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={colors.gold}
                strokeWidth={boneWidth * 2.6}
                strokeLinecap="round"
              />
            );
          })
        : null}
      {BONES.map(([from, to]) => {
        const a = point(from, width, height);
        const b = point(to, width, height);
        return (
          <Line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgba(255,255,255,0.92)"
            strokeWidth={boneWidth}
            strokeLinecap="round"
          />
        );
      })}
      <Circle
        cx={head.x}
        cy={head.y}
        r={headRadius}
        fill="none"
        stroke={colors.gold}
        strokeWidth={Math.max(2, boneWidth * 0.85)}
      />
      {LANDMARKS.filter((joint) => joint.id !== 'head').map((joint) => {
        const color = jointColor(joint.id, exo) ?? colors.yellow;
        return (
          <Circle
            key={joint.id}
            cx={joint.x * width}
            cy={joint.y * height}
            r={jointRadius}
            fill={color}
            stroke="rgba(0,0,0,0.35)"
            strokeWidth={1}
          />
        );
      })}
    </Svg>
  );
}
