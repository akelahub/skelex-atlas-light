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

## Public click-through

The web export is set up for GitHub Pages at:

https://akelahub.github.io/skelex-atlas-light/

`app.config.js` reads two environment variables used only by the export:

- `EXPO_BASE_URL=/skelex-atlas-light` prefixes scripts and the plasterer clip so they load on a project site.
- `EXPO_WEB_OUTPUT=static` writes one HTML file per screen (`record.html`, `method.html`, …), so a refresh of `/record` still loads the app. `scripts/prepare-pages.mjs` adds `404.html` (same shell as the start page) and `.nojekyll` (GitHub’s Jekyll builder would otherwise hide the `_expo/` folder). A cold refresh of Opname still sends you back to the method screen, because consent is kept only in memory.
- On a wide window the export keeps the 420px phone column with a style rule in `app/+html.tsx`. Static hydration does not apply that width from React state.

Local `npx expo start --web` leaves both unset, so the dev server stays at `/`.

Reproduce the Pages bundle:

```bash
EXPO_BASE_URL=/skelex-atlas-light EXPO_WEB_OUTPUT=static npx expo export --platform web
node scripts/prepare-pages.mjs
```

`.github/workflows/pages.yml` runs that on every push to `main` and deploys with GitHub Actions. The site does not go live until an org admin turns Pages on. This repository is private, and the cloud agent cannot change Pages settings (`POST /repos/akelahub/skelex-atlas-light/pages` returns 403).

Admin steps:

1. Confirm the org plan includes GitHub Pages for private repositories (GitHub Team or Enterprise). On GitHub Free, private Pages is unavailable.
2. If the plan does not include it, either upgrade, or make this repository public (Settings → General → Change repository visibility). A public repo can use Pages for free. Making it public exposes the source and the client clip.
3. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
4. So Skelex can open the link without a GitHub account: on the same Pages screen set visibility to **Public**. A private Pages site only loads for people who can already read the repo.
5. Merge the workflow pull request. The action publishes to the URL above.

If a paid plan and a public repo are both off the table, the same `dist/` folder can be published on an existing free host the org already uses (Cloudflare Pages, Netlify, or Vercel). Point the project base path at whatever subpath that host uses, or leave `EXPO_BASE_URL` empty for a site served from `/`.

## Out of scope

The ErgoVision PRD describes the later Android app (vision-camera, MediaPipe Pose, on-device RULA). Those libraries are intentionally not dependencies yet.
