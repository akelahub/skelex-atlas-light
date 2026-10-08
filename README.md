# Atlas Light

Clickable prototype of Atlas Light for Skelex: a Dutch, phone-shaped ergonomics flow from question to a mock RULA report. There is no camera and no MediaPipe in this build. Scores, the stick figure, and the exoskeleton effect are example data.

## Run

Requires Node 22.13 or newer.

```bash
npm install
npx expo start
```

Web (phone-width column on a wide window):

```bash
npx expo start --web
```

Android, via Expo Go on the same network:

```bash
npx expo start
```

Open Expo Go and scan the QR code. The app stays inside the Expo SDK 57 runtime, so it does not need a custom dev client.

## Flow

1. **Start** — Risk Assessment, or placeholders for Support Strength Advisor and the ROI calculator.
2. **Methode** — RULA, REBA, NIOSH, or KIM. Verder stays disabled until one is selected.
3. **Toestemming** — the person in frame agrees, and video stays on the device. Both boxes are required. This build states that it does not use the camera.
4. **Opname** — looped, muted client clip of a plasterer smoothing a ceiling. A stick figure follows his joints: red/orange while both arms are overhead, green when the arms come down, yellow on the one-arm touch-up. Start/stop, timer, and an exoskeleton toggle. The toggle lowers shoulder load and draws a gold brace.
5. **Rapport** — risk, score, analyse, conclusion, and a with/without comparison. Without the exoskeleton this matches the concept (Hoog Risico, score 6). With it, the result is illustrative (score 3).
6. **Advies** — placeholder.

Mock report numbers live in `src/mock/`. The pose lives in `src/pose/`: `clipTrack.ts` is the baked joint path, `clipPose.ts` samples it, `simulatePose.ts` turns arm height into colors and shoulder load.

## Clip

`assets/video/plasterer-ceiling.mp4` is the client demo (about 10 seconds, 720×1280). It plays looped and muted behind the skeleton, in the same fitted rectangle, so the figure stays on the body when the phone width changes. The track follows the clip: both arms overhead for most of the first six seconds, arms down around 6.5–7.6 seconds, then a one-handed touch-up. There is no exoskeleton in the picture. The app does not run a live pose model.

## Out of scope

The ErgoVision PRD describes the later Android app (vision-camera, MediaPipe Pose, on-device RULA). Those libraries are intentionally not dependencies yet.
