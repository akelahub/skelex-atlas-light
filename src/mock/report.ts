import type { MethodId } from './methods';
import { SHOULDER_LOAD_PERCENT } from '../pose/simulatePose';

export type ScoreTone = 'low' | 'mid' | 'high';

export type AnalyseRow = {
  label: string;
  value: string;
  tone: ScoreTone;
};

export type ComparisonRow = {
  label: string;
  without: string;
  withExo: string;
  diff: string;
  /** Heavier unsupported values read as red; the rest of "zonder" stays orange. */
  withoutTone: 'orange' | 'red';
};

/**
 * Concept numbers for a recording without an exoskeleton.
 * RULA action level 5–6: investigate and change soon.
 */
export const REPORT_WITHOUT = {
  riskLabel: 'Hoog Risico',
  tone: 'high' as const,
  score: 6,
  action: 'Actie vereist',
  conclusion:
    'Er is een hoog risico op musculoskeletale klachten. Actie wordt aanbevolen.',
  rows: [
    { label: 'Nek', value: '2', tone: 'mid' },
    { label: 'Schouders', value: '3', tone: 'high' },
    { label: 'Rug', value: '3', tone: 'high' },
    { label: 'Armen', value: '2', tone: 'mid' },
    { label: 'Polsen', value: '2', tone: 'mid' },
    { label: 'Belasting', value: 'Hoog', tone: 'high' },
  ] satisfies AnalyseRow[],
};

/**
 * Illustrative result when the exoskeleton simulation is on.
 * Score 6 → 3. Not a validated RULA calculation.
 */
export const REPORT_WITH_EXO = {
  riskLabel: 'Matig risico',
  tone: 'mid' as const,
  score: 3,
  action: 'Nader onderzoek',
  conclusion:
    'In dit voorbeeld daalt de schouderbelasting met een passief schouder-exoskelet. Dit is een indicatie, geen live meting.',
  rows: [
    { label: 'Nek', value: '2', tone: 'mid' },
    { label: 'Schouders', value: '1', tone: 'low' },
    { label: 'Rug', value: '2', tone: 'mid' },
    { label: 'Armen', value: '2', tone: 'mid' },
    { label: 'Polsen', value: '2', tone: 'mid' },
    { label: 'Belasting', value: 'Matig', tone: 'mid' },
  ] satisfies AnalyseRow[],
};

export const COMPARISON: ComparisonRow[] = [
  { label: 'Gemiddelde score', without: '5,4', withExo: '3,1', diff: '−2,3', withoutTone: 'orange' },
  { label: 'Maximale score', without: '7', withExo: '4', diff: '−3', withoutTone: 'red' },
  { label: 'Tijd in risicozone', without: '68%', withExo: '22%', diff: '−46 pt', withoutTone: 'red' },
  {
    label: 'Schouderbelasting',
    without: `${SHOULDER_LOAD_PERCENT.without}%`,
    withExo: `${SHOULDER_LOAD_PERCENT.with}%`,
    diff: `−${SHOULDER_LOAD_PERCENT.without - SHOULDER_LOAD_PERCENT.with} pt`,
    withoutTone: 'red',
  },
];

export function comparisonIntro(usedExo: boolean): string {
  if (usedExo) {
    return 'Deze opname liep met exoskelet-simulatie. Links zie je dezelfde taak zonder exoskelet.';
  }
  return 'Deze opname liep zonder exoskelet. Rechts zie je dezelfde taak met een passief schouder-exoskelet.';
}

export function comparisonDisclaimer(): string {
  return `Voorbeelddata, geen live meting. Zonder exoskelet is de schouderbelasting ${SHOULDER_LOAD_PERCENT.without}%, met exoskelet ${SHOULDER_LOAD_PERCENT.with}%.`;
}

export function methodNote(method: MethodId): string | null {
  if (method === 'RULA') {
    return null;
  }
  return `De getallen zijn het RULA-voorbeeld uit dit prototype. ${method} doorloopt dezelfde schermen, maar wordt hier nog niet echt berekend.`;
}

export function scoreColumnLabel(method: MethodId, kind: 'avg' | 'max'): string {
  const prefix = kind === 'avg' ? 'Gemiddelde' : 'Maximale';
  return method === 'RULA' ? `${prefix} RULA` : `${prefix} score`;
}
