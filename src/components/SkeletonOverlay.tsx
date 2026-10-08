import Svg, { Circle, Line } from 'react-native-svg';
import type { PoseJoints } from '../pose/clipPose';
import { BONES, BRACE_BONES, type Joint, type JointId } from '../pose/landmarks';
import { jointColorForPose } from '../pose/simulatePose';
import { colors } from '../theme';

type Props = {
  width: number;
  height: number;
  exo: boolean;
  joints: readonly Joint[];
};

function point(joints: readonly Joint[], id: JointId, width: number, height: number) {
  const joint = joints.find((item) => item.id === id);
  if (!joint) return { x: 0, y: 0 };
  return { x: joint.x * width, y: joint.y * height };
}

export function SkeletonOverlay({ width, height, exo, joints }: Props) {
  if (width <= 0 || height <= 0) return null;

  const pose = Object.fromEntries(joints.map((joint) => [joint.id, { x: joint.x, y: joint.y }])) as PoseJoints;

  const boneWidth = Math.max(2.5, width * 0.012);
  const jointRadius = Math.max(4.5, width * 0.02);
  const head = point(joints, 'head', width, height);
  const headRadius = width * 0.055;

  return (
    <Svg width={width} height={height}>
      {exo
        ? BRACE_BONES.map(([from, to]) => {
            const a = point(joints, from, width, height);
            const b = point(joints, to, width, height);
            return (
              <Line
                key={`brace-${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={colors.gold}
                strokeWidth={boneWidth * 2.8}
                strokeLinecap="round"
              />
            );
          })
        : null}
      {BONES.map(([from, to]) => {
        const a = point(joints, from, width, height);
        const b = point(joints, to, width, height);
        return (
          <Line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgba(255,255,255,0.94)"
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
      {joints
        .filter((joint) => joint.id !== 'head')
        .map((joint) => {
          const color = jointColorForPose(joint.id, pose, exo) ?? colors.yellow;
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
