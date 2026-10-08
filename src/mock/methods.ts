export const METHODS = [
  {
    id: 'RULA',
    title: 'RULA',
    subtitle: 'Bovenste ledematen',
  },
  {
    id: 'REBA',
    title: 'REBA',
    subtitle: 'Hele lichaam',
  },
  {
    id: 'NIOSH',
    title: 'NIOSH',
    subtitle: 'Tillen',
  },
  {
    id: 'KIM',
    title: 'KIM',
    subtitle: 'Handmatige handelingen',
  },
] as const;

export type MethodId = (typeof METHODS)[number]['id'];
