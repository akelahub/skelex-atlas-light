export type JointId =
  | 'head'
  | 'neck'
  | 'shoulderL'
  | 'elbowL'
  | 'wristL'
  | 'shoulderR'
  | 'elbowR'
  | 'wristR'
  | 'spineUpper'
  | 'spineMid'
  | 'spineLower'
  | 'hipL'
  | 'hipR';

export type JointRole = 'head' | 'neck' | 'shoulder' | 'arm' | 'wrist' | 'back' | 'hip';

export type Joint = {
  id: JointId;
  x: number;
  y: number;
  role: JointRole;
};

export const LANDMARK_ROLES: Record<JointId, JointRole> = {
  head: 'head',
  neck: 'neck',
  shoulderL: 'shoulder',
  elbowL: 'arm',
  wristL: 'wrist',
  shoulderR: 'shoulder',
  elbowR: 'arm',
  wristR: 'wrist',
  spineUpper: 'back',
  spineMid: 'back',
  spineLower: 'back',
  hipL: 'hip',
  hipR: 'hip',
};

export const BONES: readonly [JointId, JointId][] = [
  ['head', 'neck'],
  ['neck', 'shoulderL'],
  ['neck', 'shoulderR'],
  ['neck', 'spineUpper'],
  ['shoulderL', 'elbowL'],
  ['elbowL', 'wristL'],
  ['shoulderR', 'elbowR'],
  ['elbowR', 'wristR'],
  ['spineUpper', 'spineMid'],
  ['spineMid', 'spineLower'],
  ['spineLower', 'hipL'],
  ['spineLower', 'hipR'],
  ['hipL', 'hipR'],
];

/** Upper-arm and shoulder bridge drawn in gold when the exoskeleton is on. */
export const BRACE_BONES: readonly [JointId, JointId][] = [
  ['elbowL', 'shoulderL'],
  ['shoulderL', 'shoulderR'],
  ['shoulderR', 'elbowR'],
  ['neck', 'spineUpper'],
];
