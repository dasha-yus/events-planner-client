export function setJsonValue<T = { [key: string]: string }>(k: string, v: T) {
  if (v === undefined || v === null) {
    window.localStorage.removeItem(k);
  } else {
    const s = JSON.stringify(v);
    window.localStorage.setItem(k, s);
  }
}

export function getJsonValue<T = { [key: string]: string }>(
  k: string
): T | undefined {
  const v = window.localStorage.getItem(k);
  if (typeof v !== "string") {
    return undefined;
  }
  try {
    return JSON.parse(v) as T;
  } catch (err) {
    return undefined;
  }
}

export function setPlainValue(k: string, v: string) {
  if (v === undefined || v === null) {
    window.localStorage.removeItem(k);
  } else {
    window.localStorage.setItem(k, v);
  }
}

export function getPlainValue(k: string): string | undefined {
  const v = window.localStorage.getItem(k);
  if (typeof v !== "string") {
    return undefined;
  }
  return v;
}
