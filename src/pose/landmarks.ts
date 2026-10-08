/**
 * Stick-figure pose for assets/images/worker-reach.jpg.
 *
 * Coordinates are fractions of that image (origin top-left).
 * Image-left is the worker's raised arm (reach to the shelf).
 * They were tuned against this crop so the overlay sits on the body
 * instead of floating over the racks.
 */
export const WORKER_IMAGE = {
  width: 1060,
  height: 1600,
} as const;

export const workerPhoto = require('../../assets/images/worker-reach.jpg');

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

export const LANDMARKS: readonly Joint[] = [
  { id: 'head', x: 0.5, y: 0.285, role: 'head' },
  { id: 'neck', x: 0.5, y: 0.375, role: 'neck' },
  { id: 'shoulderL', x: 0.36, y: 0.425, role: 'shoulder' },
  { id: 'elbowL', x: 0.195, y: 0.335, role: 'arm' },
  { id: 'wristL', x: 0.118, y: 0.248, role: 'wrist' },
  { id: 'shoulderR', x: 0.655, y: 0.44, role: 'shoulder' },
  { id: 'elbowR', x: 0.72, y: 0.548, role: 'arm' },
  { id: 'wristR', x: 0.782, y: 0.625, role: 'wrist' },
  { id: 'spineUpper', x: 0.5, y: 0.495, role: 'back' },
  { id: 'spineMid', x: 0.5, y: 0.59, role: 'back' },
  { id: 'spineLower', x: 0.5, y: 0.685, role: 'back' },
  { id: 'hipL', x: 0.415, y: 0.755, role: 'hip' },
  { id: 'hipR', x: 0.6, y: 0.755, role: 'hip' },
];

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
