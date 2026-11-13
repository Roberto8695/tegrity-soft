export interface StageInteractionEvent {
  type: "focus" | "pulse" | "clear";
  clientX?: number;
  clientY?: number;
  accent?: string;
}

type StageListener = (event: StageInteractionEvent) => void;

const listeners = new Set<StageListener>();

export function subscribeStageInteractions(listener: StageListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getElementCenterCoords(el: Element): { clientX: number; clientY: number } {
  const rect = el.getBoundingClientRect();
  return {
    clientX: rect.left + rect.width * 0.5,
    clientY: rect.top + rect.height * 0.5,
  };
}

/**
 * Directs the 3D Three.js stage and Anime.js instance grid to gravitate toward and frame a UI element.
 */
export function focusStageOnElement(el: Element, accent?: string) {
  const { clientX, clientY } = getElementCenterCoords(el);
  listeners.forEach((fn) =>
    fn({
      type: "focus",
      clientX,
      clientY,
      accent,
    })
  );
}

/**
 * Fires an outward Anime.js radial wave in the 3D InstancedMesh lattice seeded at a concrete element.
 */
export function pulseStageFromElement(el: Element, accent?: string) {
  const { clientX, clientY } = getElementCenterCoords(el);
  listeners.forEach((fn) =>
    fn({
      type: "pulse",
      clientX,
      clientY,
      accent,
    })
  );
}

/**
 * Releases explicit element lock back to smooth pointer/scroll tracking.
 */
export function clearStageFocus() {
  listeners.forEach((fn) => fn({ type: "clear" }));
}
