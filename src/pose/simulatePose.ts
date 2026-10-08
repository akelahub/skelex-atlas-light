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
 * Illustrative shoulder load for this reach posture.
 * Kept in sync with the report comparison (82% → 38%).
 */
export const SHOULDER_LOAD_PERCENT = {
  without: 82,
  with: 38,
} as const;

const LOAD_WITHOUT: Record<JointId, LoadLevel | null> = {
  head: null,
  neck: 'moderate',
  shoulderL: 'severe',
  elbowL: 'high',
  wristL: 'moderate',
  shoulderR: 'high',
  elbowR: 'moderate',
  wristR: 'low',
  spineUpper: 'high',
  spineMid: 'high',
  spineLower: 'moderate',
  hipL: 'low',
  hipR: 'low',
};

const LOAD_WITH_EXO: Record<JointId, LoadLevel | null> = {
  head: null,
  neck: 'moderate',
  shoulderL: 'moderate',
  elbowL: 'low',
  wristL: 'low',
  shoulderR: 'low',
  elbowR: 'low',
  wristR: 'low',
  spineUpper: 'moderate',
  spineMid: 'low',
  spineLower: 'low',
  hipL: 'low',
  hipR: 'low',
};

export function jointLoad(id: JointId, exo: boolean): LoadLevel | null {
  return (exo ? LOAD_WITH_EXO : LOAD_WITHOUT)[id];
}

export function jointColor(id: JointId, exo: boolean): string | null {
  const level = jointLoad(id, exo);
  return level ? LOAD_COLOR[level] : null;
}

export function shoulderLoadPercent(exo: boolean): number {
  return exo ? SHOULDER_LOAD_PERCENT.with : SHOULDER_LOAD_PERCENT.without;
}

/** Relative drop versus the unsupported shoulder, rounded. 38/82 → 54%. */
export function shoulderReductionPercent(): number {
  const { without, with: supported } = SHOULDER_LOAD_PERCENT;
  return Math.round((1 - supported / without) * 100);
}
