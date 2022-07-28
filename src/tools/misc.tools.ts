import { AnyValue, Option } from '../types';

export function makeMatchObject<T = unknown, K = T>(
  object: Record<string, T>,
  defaultReturn: K
) {
  return new Proxy(object, {
    get(target, prop) {
      if (prop in target) return target[prop.toString()];
      else return defaultReturn;
    },
  });
}

export function map<T, K>(
  data: Option<T[]>,
  fn: (item: T, index: number) => K
): K[] {
  if (!data || !Array.isArray(data)) return [];

  const mapped: K[] = [];

  let i = 0;

  for (const element of data) {
    mapped.push(fn(element, i));
    i += 1;
  }

  return mapped;
}

export function toType<T = undefined>(data: unknown): T {
  return data as T;
}

function isFn(data: AnyValue) {
  return typeof data === 'function';
}

export function ifTrue<T = undefined, K = T>(
  condition: AnyValue,
  dataOrFn: (() => T) | T,
  alternative?: (() => K) | K
): T | K {
  if (condition) {
    if (isFn(dataOrFn)) return (dataOrFn as () => T)();

    return dataOrFn as T;
  }

  if (alternative) {
    if (isFn(alternative)) return (alternative as () => K)();

    return alternative as K;
  }

  return toType<T>(undefined);
}
