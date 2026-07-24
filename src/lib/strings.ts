import en from '../i18n/en.json';

type NestedKeys<T> = T extends object
  ? { [K in keyof T]: K extends string ? `${K}` | `${K}.${NestedKeys<T[K]>}` : never }[keyof T]
  : never;

export type TranslationKey = NestedKeys<typeof en>;

export function t(key: string): string {
  const keys = key.split('.');
  let current: any = en;

  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return key; // Fallback to key if missing
    }
  }

  return typeof current === 'string' ? current : key;
}
