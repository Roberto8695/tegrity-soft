import { animate, createScope, onScroll, stagger, svg } from "animejs";

export interface SectionFxConfig {
  root: HTMLElement;
  traceSelector?: string;
  staggerTargets?: Array<{
    selector: string;
    containerSelector?: string;
    delayStep?: number;
    from?: "first" | "center" | "last";
  }>;
}

/**
 * Attaches Anime.js v4 scroll-synchronized SVG circuit traces and staggered card/item choreography
 * scoped to a section container, respecting `prefers-reduced-motion`.
 */
export function attachSectionScrollFX({
  root,
  traceSelector,
  staggerTargets = [],
}: SectionFxConfig): () => void {
  if (
    typeof window === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return () => {};
  }

  const scope = createScope({ root }).add(() => {
    if (traceSelector) {
      const paths = root.querySelectorAll(traceSelector);
      if (paths.length > 0) {
        animate(svg.createDrawable(traceSelector), {
          draw: ["0 0", "0 1"],
          ease: "outCubic",
          autoplay: onScroll({
            target: root,
            enter: "end-=40 start",
            leave: "center start",
            sync: 0.45,
          }),
        });
      }
    }

    staggerTargets.forEach((item) => {
      const nodes = root.querySelectorAll(item.selector);
      if (nodes.length === 0) return;

      const triggerTarget = item.containerSelector
        ? root.querySelector(item.containerSelector) ?? root
        : root;

      animate(item.selector, {
        y: [18, 0],
        scale: [0.98, 1],
        opacity: [0.78, 1],
        duration: 640,
        delay: stagger(item.delayStep ?? 85, {
          from: item.from ?? "first",
        }),
        ease: "outExpo",
        autoplay: onScroll({
          target: triggerTarget,
          enter: "end-=60 start",
          repeat: false,
        }),
      });
    });
  });

  return () => scope.revert();
}
