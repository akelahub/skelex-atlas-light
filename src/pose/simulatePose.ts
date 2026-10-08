import type { PoseJoints } from './clipPose';
import { armRaise } from './clipPose';
import type { JointId } from './landmarks';

/** Green → yellow → orange → red, matching shoulder and back load. */
export type LoadLevel = 'low' | 'moderate' | 'high' | 'severe';

export const LOAD_COLOR: Record<LoadLevel, string> = {
  low: '#3DDC6A',
  moderate: '#F5C542',
  high: '#F08A24',
  severe: '#FF3B30',
};

/**
 * Example shoulder load used by the report comparison.
 * The live bar on the record screen follows the clip instead.
 */
export const SHOULDER_LOAD_PERCENT = {
  without: 82,
  with: 38,
} as const;

const EXO_SCALE = SHOULDER_LOAD_PERCENT.with / SHOULDER_LOAD_PERCENT.without;

function levelForRaise(raise: number): LoadLevel {
  if (raise > 0.16) return 'severe';
  if (raise > 0.12) return 'high';
  if (raise > 0.03) return 'moderate';
  return 'low';
}

function ease(level: LoadLevel, steps: number): LoadLevel {
  const order: LoadLevel[] = ['low', 'moderate', 'high', 'severe'];
  const index = Math.max(0, order.indexOf(level) - steps);
  return order[index];
}

/** Live shoulder load, 24% with both arms down up to 82% in full overhead work. */
export function shoulderLoadForPose(pose: PoseJoints, exo: boolean): number {
  const left = Math.min(1, Math.max(0, armRaise(pose, 'L') / 0.24));
  const right = Math.min(1, Math.max(0, armRaise(pose, 'R') / 0.24));
  const combined = Math.max(left, right) * 0.75 + Math.min(left, right) * 0.25;
  const base = Math.round(24 + combined * 58);
  return exo ? Math.round(base * EXO_SCALE) : base;
}

export function shoulderReductionForPose(pose: PoseJoints): number {
  const plain = shoulderLoadForPose(pose, false);
  const supported = shoulderLoadForPose(pose, true);
  if (plain <= 0) return 0;
  return Math.round((1 - supported / plain) * 100);
}

export function phaseLabel(pose: PoseJoints): string {
  const left = armRaise(pose, 'L');
  const right = armRaise(pose, 'R');
  const higher = Math.max(left, right);
  const lower = Math.min(left, right);
  if (higher < 0.03) return 'Armen laag';
  if (lower < 0.02 && higher > 0.05) return 'Eén arm omhoog';
  return 'Bovenhands werk';
}

export function jointLoadForPose(id: JointId, pose: PoseJoints, exo: boolean): LoadLevel | null {
  if (id === 'head') return null;
  const left = armRaise(pose, 'L');
  const right = armRaise(pose, 'R');
  const side = id.endsWith('L') ? left : id.endsWith('R') ? right : Math.max(left, right);
  let level = levelForRaise(side);

  if (id === 'neck') {
    level = levelForRaise(Math.max(left, right) - 0.04);
  }
  if (id === 'spineUpper' || id === 'spineMid' || id === 'spineLower') {
    level = levelForRaise((left + right) / 2);
  }
  if (id === 'hipL' || id === 'hipR' || id === 'spineLower') {
    level = ease(level, 1);
  }
  if (id.startsWith('wrist')) {
    level = ease(level, 1);
  }

  if (exo && (id.startsWith('shoulder') || id.startsWith('elbow') || id === 'spineUpper' || id === 'spineMid')) {
    level = ease(level, id.startsWith('shoulder') || id === 'spineUpper' ? 2 : 1);
  }
  return level;
}

export function jointColorForPose(id: JointId, pose: PoseJoints, exo: boolean): string | null {
  const level = jointLoadForPose(id, pose, exo);
  return level ? LOAD_COLOR[level] : null;
}

/** Relative drop of the example report pair. 38/82 → 54%. */
export function shoulderReductionPercent(): number {
  const { without, with: supported } = SHOULDER_LOAD_PERCENT;
  return Math.round((1 - supported / without) * 100);
}
