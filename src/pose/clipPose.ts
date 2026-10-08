import { CLIP_DURATION_SEC, CLIP_JOINT_ORDER, CLIP_TRACK } from './clipTrack';
import { LANDMARK_ROLES, type Joint, type JointId } from './landmarks';

export const CLIP_SIZE = { width: 720, height: 1280 } as const;

export const plastererClip = require('../../assets/video/plasterer-ceiling.mp4');

export type PoseJoints = Record<JointId, { x: number; y: number }>;

function sampleAt(timeSec: number): PoseJoints {
  const duration = CLIP_DURATION_SEC;
  const time = ((timeSec % duration) + duration) % duration;
  let index = 0;
  while (index < CLIP_TRACK.length - 1 && CLIP_TRACK[index + 1][0] <= time) {
    index += 1;
  }
  const current = CLIP_TRACK[index];
  const next = CLIP_TRACK[(index + 1) % CLIP_TRACK.length];
  const currentTime = current[0];
  const nextTime = next[0];
  const span = nextTime > currentTime ? nextTime - currentTime : duration - currentTime + nextTime;
  const into = time >= currentTime ? time - currentTime : time + (duration - currentTime);
  const blend = span <= 0 ? 0 : Math.min(1, Math.max(0, into / span));

  const joints = {} as PoseJoints;
  CLIP_JOINT_ORDER.forEach((id, jointIndex) => {
    const offset = 1 + jointIndex * 2;
    joints[id] = {
      x: current[offset] + (next[offset] - current[offset]) * blend,
      y: current[offset + 1] + (next[offset + 1] - current[offset + 1]) * blend,
    };
  });
  return joints;
}

/** How far a wrist sits above its shoulder, in fractions of the frame. Negative when the arm is down. */
export function armRaise(pose: PoseJoints, side: 'L' | 'R'): number {
  return pose[`shoulder${side}`].y - pose[`wrist${side}`].y;
}

export function poseSnapshot(timeSec: number): { joints: Joint[]; pose: PoseJoints } {
  const pose = sampleAt(timeSec);
  return {
    pose,
    joints: CLIP_JOINT_ORDER.map((id) => ({
      id,
      role: LANDMARK_ROLES[id],
      x: pose[id].x,
      y: pose[id].y,
    })),
  };
}
