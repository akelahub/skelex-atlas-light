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
4. **Opname** — still photo of a worker reaching to a shelf, with a stick figure locked to that photo. Start/stop, timer, and an exoskeleton toggle. The toggle lowers shoulder load and draws a gold brace. Shoulder and back joints run green → yellow → orange → red.
5. **Rapport** — risk, score, analyse, conclusion, and a with/without comparison. Without the exoskeleton this matches the concept (Hoog Risico, score 6). With it, the result is illustrative (score 3).
6. **Advies** — placeholder.

Mock numbers live in `src/mock/`. The pose lives in `src/pose/` (`landmarks.ts`, `frame.ts`, `simulatePose.ts`).

## Photo

`assets/images/worker-reach.jpg` is a portrait crop of [Pexels 7019315](https://www.pexels.com/photo/person-pulling-box-from-a-shelf-7019315/) by cottonbro studio (Pexels License). The worker’s clothes have no printed skeleton. Joint coordinates are fractions of this file, and the overlay uses the same fitted rectangle as the image, so the figure does not drift when the phone width changes.

## Out of scope

The ErgoVision PRD describes the later Android app (vision-camera, MediaPipe Pose, on-device RULA). Those libraries are intentionally not dependencies yet.
