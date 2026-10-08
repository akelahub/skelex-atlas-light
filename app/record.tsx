import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAssessment } from '../src/assessment/AssessmentContext';
import { AtlasLogo } from '../src/components/AtlasLogo';
import { BackButton } from '../src/components/BackButton';
import { ProgressBar } from '../src/components/ProgressBar';
import { SkeletonOverlay } from '../src/components/SkeletonOverlay';
import { formatDuration } from '../src/format';
import { CLIP_SIZE, plastererClip, poseSnapshot } from '../src/pose/clipPose';
import { frameForPhoto, type Frame } from '../src/pose/frame';
import {
  phaseLabel,
  shoulderLoadForPose,
  shoulderReductionForPose,
} from '../src/pose/simulatePose';
import { colors } from '../src/theme';

export default function RecordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { method, consentAccepted, exoEnabled, setExoEnabled, finishRecording } = useAssessment();
  const [stage, setStage] = useState({ width: 0, height: 0 });
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [clipTime, setClipTime] = useState(0);
  const recordingRef = useRef(false);
  const startedAtRef = useRef<number | null>(null);
  const player = useVideoPlayer(plastererClip, (video) => {
    video.loop = true;
    video.muted = true;
    video.volume = 0;
    video.timeUpdateEventInterval = 0.05;
    video.play();
  });

  useEffect(() => {
    if (!method || !consentAccepted) {
      router.replace(method ? '/consent' : '/method');
    }
  }, [consentAccepted, method, router]);

  // One clock for the life of the screen. Elapsed time comes from Date.now(),
  // so a leaked interval cannot run the timer faster than real time.
  useEffect(() => {
    const timer = setInterval(() => {
      if (!recordingRef.current || startedAtRef.current == null) {
        return;
      }
      const next = Math.floor((Date.now() - startedAtRef.current) / 1000);
      setElapsed((current) => (current === next ? current : next));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const subscription = player.addListener('timeUpdate', ({ currentTime }) => {
      setClipTime(currentTime);
    });
    // play() before the view mounts is a no-op, so keep trying until the clip moves.
    const started = Date.now();
    const kick = setInterval(() => {
      player.play();
      if (player.currentTime > 0.15 || Date.now() - started > 8000) {
        clearInterval(kick);
      }
    }, 200);
    return () => {
      clearInterval(kick);
      subscription.remove();
    };
  }, [player]);

  const frame: Frame = frameForPhoto(stage.width, stage.height, CLIP_SIZE.width, CLIP_SIZE.height);
  const { joints, pose } = poseSnapshot(clipTime);
  const load = shoulderLoadForPose(pose, exoEnabled);
  const reduction = shoulderReductionForPose(pose);
  const phase = phaseLabel(pose);
  const loadColor = load >= 70 ? colors.bad : load >= 48 ? colors.worse : load >= 34 ? colors.yellow : colors.good;

  function startRecording() {
    startedAtRef.current = Date.now();
    recordingRef.current = true;
    setElapsed(0);
    setRecording(true);
  }

  function stopAndReport() {
    recordingRef.current = false;
    const seconds =
      startedAtRef.current == null ? 0 : Math.floor((Date.now() - startedAtRef.current) / 1000);
    setElapsed(seconds);
    setRecording(false);
    finishRecording(seconds, exoEnabled);
    router.push('/report');
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ProgressBar step={3} />
      <View
        style={styles.stage}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setStage((current) =>
            current.width === width && current.height === height ? current : { width, height },
          );
        }}
      >
        {frame.width > 0 ? (
          <>
            <VideoView
              player={player}
              nativeControls={false}
              contentFit="fill"
              surfaceType="textureView"
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: frame.x,
                top: frame.y,
                width: frame.width,
                height: frame.height,
              }}
            />
            <View
              pointerEvents="none"
              style={[
                styles.scrim,
                { left: frame.x, top: frame.y, width: frame.width, height: frame.height },
              ]}
            />
            <View pointerEvents="none" style={{ position: 'absolute', left: frame.x, top: frame.y }}>
              <SkeletonOverlay width={frame.width} height={frame.height} exo={exoEnabled} joints={joints} />
            </View>
          </>
        ) : null}
        <View style={styles.topBar}>
          <BackButton />
          <View style={styles.logoWrap} pointerEvents="none">
            <AtlasLogo compact />
          </View>
          <View style={styles.methodPill}>
            <Text style={styles.methodText}>{method ?? 'RULA'}</Text>
          </View>
        </View>
        <Text style={styles.simLabel}>Simulatie · geen live camera</Text>
        <Text style={styles.phaseLabel}>{phase}</Text>
        <View pointerEvents="none" style={styles.finder}>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
        </View>

        <View style={[styles.dock, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        <View style={styles.loadRow}>
          <Text style={styles.loadLabel}>Schouderbelasting</Text>
          <Text style={[styles.loadValue, { color: loadColor }]}>{load}%</Text>
        </View>
        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              {
                width: `${load}%`,
                backgroundColor: loadColor,
              },
            ]}
          />
        </View>
        <Text style={styles.legend}>Schouders en rug kleuren mee · groen, geel, oranje, rood</Text>
        {exoEnabled ? (
          <Text style={styles.reduction}>−{reduction}% t.o.v. zonder exoskelet</Text>
        ) : (
          <Text style={styles.reductionSpacer}> </Text>
        )}

        <View style={[styles.toggleCard, exoEnabled ? styles.toggleOn : null]}>
          <View style={styles.toggleText}>
            <Text style={styles.toggleTitle}>Exoskelet simulatie</Text>
            <Text style={styles.toggleState}>{exoEnabled ? 'aan' : 'uit'}</Text>
          </View>
          <Pressable
            accessibilityRole="switch"
            accessibilityLabel="Exoskelet simulatie"
            accessibilityState={{ checked: exoEnabled }}
            onPress={() => setExoEnabled(!exoEnabled)}
            style={[styles.switch, exoEnabled ? styles.switchOn : null]}
          >
            <View style={[styles.knob, exoEnabled ? styles.knobOn : null]} />
          </Pressable>
        </View>

        <Text style={styles.timer}>{formatDuration(elapsed)}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={recording ? 'Stop de meting' : 'Start de meting'}
          onPress={() => {
            if (recordingRef.current) {
              stopAndReport();
              return;
            }
            startRecording();
          }}
          style={styles.record}
        >
          {recording ? <View style={styles.stopSquare} /> : null}
        </Pressable>
        <Text style={styles.recordLabel}>{recording ? 'Stop de meting' : 'Start de meting'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  stage: {
    flex: 1,
    backgroundColor: colors.stage,
    marginTop: 8,
  },
  scrim: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  topBar: {
    position: 'absolute',
    top: 10,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  methodPill: {
    minWidth: 64,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderWidth: 1,
    borderColor: '#3A3A40',
    alignItems: 'center',
  },
  methodText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  simLabel: {
    position: 'absolute',
    top: 58,
    left: 16,
    color: colors.title,
    fontSize: 13,
    fontWeight: '600',
  },
  phaseLabel: {
    position: 'absolute',
    top: 76,
    left: 16,
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  finder: {
    position: 'absolute',
    top: 8,
    left: 12,
    right: 12,
    bottom: 250,
  },
  corner: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 },
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: 'rgba(0,0,0,0.78)',
  },
  loadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  loadLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  loadValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  track: {
    marginTop: 6,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2A2A2E',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  legend: {
    marginTop: 6,
    color: colors.faint,
    fontSize: 12,
  },
  reduction: {
    marginTop: 2,
    color: colors.good,
    fontSize: 13,
    fontWeight: '700',
    minHeight: 18,
  },
  reductionSpacer: {
    minHeight: 18,
    marginTop: 2,
  },
  toggleCard: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2E6B38',
    backgroundColor: '#101612',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleOn: {
    borderColor: colors.good,
  },
  toggleText: {
    flex: 1,
  },
  toggleTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  toggleState: {
    color: colors.title,
    fontSize: 13,
    marginTop: 1,
  },
  switch: {
    width: 52,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3A3A40',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  switchOn: {
    backgroundColor: colors.green,
  },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  knobOn: {
    alignSelf: 'flex-end',
  },
  timer: {
    marginTop: 8,
    textAlign: 'center',
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  record: {
    alignSelf: 'center',
    marginTop: 4,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E10600',
    borderWidth: 4,
    borderColor: '#3A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopSquare: {
    width: 20,
    height: 20,
    borderRadius: 3,
    backgroundColor: colors.white,
  },
  recordLabel: {
    marginTop: 6,
    marginBottom: 4,
    textAlign: 'center',
    color: '#D0D0D6',
    fontSize: 14,
  },
});
