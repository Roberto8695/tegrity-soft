export interface CrtPreferences {
  bw: boolean;
  crtFx: boolean;
}

const state: CrtPreferences = {
  bw: false,
  crtFx: true,
};

const listeners = new Set<() => void>();

export function getCrtPreferencesSnapshot(): Readonly<CrtPreferences> {
  return state;
}

const SERVER_SNAPSHOT: Readonly<CrtPreferences> = {
  bw: false,
  crtFx: true,
};

export function getCrtPreferencesServerSnapshot(): Readonly<CrtPreferences> {
  return SERVER_SNAPSHOT;
}

export function subscribeCrtPreferences(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function toggleCrtBw() {
  state.bw = !state.bw;
  if (typeof document !== "undefined") {
    document.documentElement.dataset.crtBw = state.bw ? "true" : "false";
  }
  listeners.forEach((fn) => fn());
}

export function toggleCrtFx() {
  state.crtFx = !state.crtFx;
  if (typeof document !== "undefined") {
    document.documentElement.dataset.crtFx = state.crtFx ? "true" : "false";
  }
  listeners.forEach((fn) => fn());
}
