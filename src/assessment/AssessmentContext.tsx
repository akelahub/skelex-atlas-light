import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { MethodId } from '../mock/methods';

type AssessmentState = {
  method: MethodId | null;
  personConsent: boolean;
  deviceConsent: boolean;
  consentAccepted: boolean;
  exoEnabled: boolean;
  /** Seconds counted on the record screen when Stop was pressed. */
  durationSec: number;
  /** Exoskeleton toggle at the moment the recording stopped. */
  usedExo: boolean;
  recorded: boolean;
};

type AssessmentActions = {
  setMethod: (method: MethodId) => void;
  setPersonConsent: (value: boolean) => void;
  setDeviceConsent: (value: boolean) => void;
  acceptConsent: () => void;
  setExoEnabled: (value: boolean) => void;
  finishRecording: (durationSec: number, usedExo: boolean) => void;
  reset: () => void;
};

const initial: AssessmentState = {
  method: null,
  personConsent: false,
  deviceConsent: false,
  consentAccepted: false,
  exoEnabled: false,
  durationSec: 0,
  usedExo: false,
  recorded: false,
};

const AssessmentContext = createContext<(AssessmentState & AssessmentActions) | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(initial);

  const value = useMemo<AssessmentState & AssessmentActions>(
    () => ({
      ...state,
      setMethod: (method) => setState((current) => ({ ...current, method })),
      setPersonConsent: (personConsent) => setState((current) => ({ ...current, personConsent })),
      setDeviceConsent: (deviceConsent) => setState((current) => ({ ...current, deviceConsent })),
      acceptConsent: () => setState((current) => ({ ...current, consentAccepted: true })),
      setExoEnabled: (exoEnabled) => setState((current) => ({ ...current, exoEnabled })),
      finishRecording: (durationSec, usedExo) =>
        setState((current) => ({ ...current, durationSec, usedExo, recorded: true })),
      reset: () => setState(initial),
    }),
    [state],
  );

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}

export function useAssessment() {
  const value = useContext(AssessmentContext);
  if (!value) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return value;
}
