export const isDefined = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;
