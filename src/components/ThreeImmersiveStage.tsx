"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { animate, stagger, type JSAnimation } from "animejs";
import { getInstances } from "animejs/adapters/three";
import {
  getScrollTelemetry,
  subscribeActiveSection,
  type SectionId,
} from "@/lib/scroll-telemetry";
import {
  subscribeStageInteractions,
  type StageInteractionEvent,
} from "@/lib/stage-director";
import {
  getCrtPreferencesSnapshot,
  subscribeCrtPreferences,
} from "@/lib/crt-preferences";

const GRID_COLS = 12;
const GRID_ROWS = 6;
const INSTANCE_COUNT = GRID_COLS * GRID_ROWS;
const DEFAULT_ACCENT_HEX = "#38bdf8";

const INTERACTIVE_TARGET_SELECTOR = [
  "[data-stage-target]",
  "[data-service-card]",
  "[data-project-card]",
  "[data-team-card]",
  "[data-faq-item]",
  "[data-workflow-step]",
  "#contacto button",
  "#contacto input",
  "#contacto textarea",
  "#contacto select",
  "#contacto a",
  "#inicio button",
  "#inicio a",
  "#servicios button",
  "#proyectos button",
  "footer button",
  "footer input",
].join(", ");

interface SectionCorePose {
  x: number;
  y: number;
  z: number;
  scale: number;
  tiltX: number;
  tiltY: number;
  tiltZ: number;
}

const CORE_SECTION_POSES: Record<SectionId, SectionCorePose> = {
  inicio: { x: 3.1, y: 0.25, z: -1.1, scale: 1.0, tiltX: 16, tiltY: -22, tiltZ: 8 },
  servicios: { x: -3.2, y: -0.2, z: -1.6, scale: 1.12, tiltX: -24, tiltY: 36, tiltZ: -12 },
  proyectos: { x: 0.0, y: 0.15, z: -2.4, scale: 1.24, tiltX: 28, tiltY: 110, tiltZ: 18 },
  nosotros: { x: 0.0, y: -0.1, z: -2.1, scale: 1.05, tiltX: -14, tiltY: 195, tiltZ: -8 },
  faq: { x: -3.0, y: 0.2, z: -2.5, scale: 0.92, tiltX: 12, tiltY: 270, tiltZ: 14 },
  contacto: { x: 2.5, y: -0.1, z: -1.5, scale: 1.14, tiltX: -18, tiltY: 345, tiltZ: -10 },
};

function computeNodeTarget(
  section: SectionId,
  col: number,
  row: number
): { x: number; y: number; z: number; scale: number; rx: number; ry: number } {
  const nx = col - (GRID_COLS - 1) / 2;
  const ny = row - (GRID_ROWS - 1) / 2;

  switch (section) {
    case "inicio":
      return {
        x: nx * 1.12,
        y: ny * 0.95 + Math.sin(col * 0.65) * 0.25,
        z: -4.2 + Math.cos(col * 0.7 + row * 0.55) * 0.65,
        scale: 0.85,
        rx: Math.sin(row * 0.7) * 28,
        ry: col * 8,
      };
    case "servicios": {
      const band = Math.floor(col / 4);
      const clusterShiftX = (band - 1) * 0.48;
      return {
        x: nx * 1.06 + clusterShiftX,
        y: ny * 0.92,
        z: -4.3 + band * 0.35 - Math.abs(ny) * 0.28,
        scale: 0.96,
        rx: (band - 1) * 22,
        ry: (row - 2.5) * 16,
      };
    }
    case "proyectos": {
      const angle = (col / GRID_COLS) * Math.PI * 2;
      const radius = 3.2 + (row - 2.5) * 0.72;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * (radius * 0.58),
        z: -4.8 + Math.sin(col * 0.9 + row) * 0.85,
        scale: 0.78,
        rx: (angle * 180) / Math.PI,
        ry: row * 24,
      };
    }
    case "nosotros": {
      const dist = Math.hypot(nx * 0.8, ny);
      return {
        x: nx * 1.18,
        y: ny * 1.05,
        z: -4.9 + Math.cos(dist * 0.75) * 0.9,
        scale: 0.74,
        rx: ny * 20,
        ry: nx * 18,
      };
    }
    case "faq":
      return {
        x: nx * 1.24,
        y: ny * 1.08,
        z: -5.4 - Math.abs(nx) * 0.14,
        scale: 0.62,
        rx: 0,
        ry: (col % 2 === 0 ? 1 : -1) * 14,
      };
    case "contacto":
      return {
        x: nx * 0.98 + 0.45,
        y: ny * 0.88,
        z: -3.6 - Math.hypot(nx, ny) * 0.25,
        scale: 0.88,
        rx: ny * 14,
        ry: -nx * 14,
      };
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function computeNearestNodeIndex(
  clientX: number,
  clientY: number,
  width: number,
  height: number
): number {
  const safeW = Math.max(1, width);
  const safeH = Math.max(1, height);
  const col = clamp(Math.round((clientX / safeW) * (GRID_COLS - 1)), 0, GRID_COLS - 1);
  // Three.js +Y points upward whereas DOM clientY points downward
  const row = clamp(Math.round((1 - clientY / safeH) * (GRID_ROWS - 1)), 0, GRID_ROWS - 1);
  return row * GRID_COLS + col;
}

function viewportToWorld(
  clientX: number,
  clientY: number,
  width: number,
  height: number,
  camera: THREE.PerspectiveCamera,
  planeZ: number
): { x: number; y: number } {
  const safeW = Math.max(1, width);
  const safeH = Math.max(1, height);
  const distance = Math.max(1, camera.position.z - planeZ);
  const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5) * distance;
  const visibleWidth = visibleHeight * (safeW / safeH);
  const nx = clientX / safeW - 0.5;
  const ny = -(clientY / safeH - 0.5);
  return { x: nx * visibleWidth, y: ny * visibleHeight };
}

function extractAccentHex(el: Element): string {
  return (
    el.getAttribute("data-stage-accent") ??
    el.closest("[data-stage-accent]")?.getAttribute("data-stage-accent") ??
    DEFAULT_ACCENT_HEX
  );
}

export function ThreeImmersiveStage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: (window.devicePixelRatio || 1) < 1.5,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const getWidth = () => window.innerWidth;
    const getHeight = () => window.innerHeight;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(getWidth(), getHeight());
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "block h-full w-full";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080b, 0.042);

    const camera = new THREE.PerspectiveCamera(
      44,
      getWidth() / Math.max(1, getHeight()),
      0.1,
      60
    );
    camera.position.set(0, 0, 10.6);

    // Architectural studio lighting rig + interactive DOM-tracked spotlight
    const ambientLight = new THREE.AmbientLight(0x93c5fd, 0.72);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 1.75);
    keyLight.position.set(5, 6, 8);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x60a5fa, 2.3, 24);
    rimLight.position.set(-5, -3, 5);
    scene.add(rimLight);

    const focusLight = new THREE.PointLight(0x38bdf8, 0, 15, 1.4);
    focusLight.position.set(0, 0, 2.2);
    scene.add(focusLight);

    // 1. Anime.js-driven InstancedMesh Architectural Lattice (white base multiplies cleanly with instanceColor)
    const nodeGeometry = new THREE.BoxGeometry(0.31, 0.31, 0.09);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.36,
      metalness: 0.76,
      roughness: 0.24,
      transparent: true,
      opacity: 0.88,
    });
    const instancedGrid = new THREE.InstancedMesh(
      nodeGeometry,
      nodeMaterial,
      INSTANCE_COUNT
    );
    instancedGrid.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instancedGrid);

    const baseNodeColor = new THREE.Color(0x181c26);
    const scratchNodeColor = new THREE.Color();
    for (let i = 0; i < INSTANCE_COUNT; i++) {
      instancedGrid.setColorAt(i, baseNodeColor);
    }
    if (instancedGrid.instanceColor) {
      instancedGrid.instanceColor.needsUpdate = true;
    }

    const gridInstances = getInstances(instancedGrid).filter(
      (inst): inst is NonNullable<typeof inst> => inst !== null
    );

    const targetNodeZ = new Float32Array(INSTANCE_COUNT);
    const currentNodeZ = new Float32Array(INSTANCE_COUNT);

    let formationAnim: JSAnimation | undefined;
    let waveAnim: JSAnimation | undefined;
    let coreAnim: JSAnimation | undefined;

    const getBaseNodeScale = (section: SectionId, idx: number, mobileFactor: number) => {
      const col = idx % GRID_COLS;
      const row = Math.floor(idx / GRID_COLS);
      return computeNodeTarget(section, col, row).scale * mobileFactor;
    };

    const applyGridFormation = (section: SectionId, immediate = false) => {
      const mobileFactor = getWidth() < 768 ? 0.68 : 1;

      gridInstances.forEach((_inst, idx) => {
        const col = idx % GRID_COLS;
        const row = Math.floor(idx / GRID_COLS);
        const z = computeNodeTarget(section, col, row).z;
        targetNodeZ[idx] = z;
        if (immediate) currentNodeZ[idx] = z;
      });

      if (immediate) {
        gridInstances.forEach((inst, idx) => {
          const col = idx % GRID_COLS;
          const row = Math.floor(idx / GRID_COLS);
          const pos = computeNodeTarget(section, col, row);
          inst.x = pos.x * mobileFactor;
          inst.y = pos.y * mobileFactor;
          inst.z = pos.z;
          inst.scale = pos.scale * mobileFactor;
          inst.rotateX = pos.rx;
          inst.rotateY = pos.ry;
          inst.rotateZ = 0;
        });
        return;
      }

      formationAnim?.cancel();
      const mapForSection =
        (selector: (pos: ReturnType<typeof computeNodeTarget>) => number) =>
        (_target: unknown, idx = 0): number => {
          const col = idx % GRID_COLS;
          const row = Math.floor(idx / GRID_COLS);
          return selector(computeNodeTarget(section, col, row));
        };

      // Intentionally excludes z/rotateZ so real-time cursor field & radial UI waves never contend
      formationAnim = animate(gridInstances, {
        x: mapForSection((p) => p.x * mobileFactor),
        y: mapForSection((p) => p.y * mobileFactor),
        scale: mapForSection((p) => p.scale * mobileFactor),
        rotateX: mapForSection((p) => p.rx),
        rotateY: mapForSection((p) => p.ry),
        duration: 1100,
        delay: stagger(20, { grid: [GRID_COLS, GRID_ROWS], from: "center" }),
        ease: "outExpo",
      });
    };

    // 2. Sculpted Orbital Precision Engine Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const outerIcoGeo = new THREE.IcosahedronGeometry(1.42, 1);
    const outerEdgesGeo = new THREE.EdgesGeometry(outerIcoGeo);
    const outerWireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.42,
    });
    const outerWire = new THREE.LineSegments(outerEdgesGeo, outerWireMat);
    coreGroup.add(outerWire);

    const innerIcoGeo = new THREE.IcosahedronGeometry(0.86, 0);
    const innerEdgesGeo = new THREE.EdgesGeometry(innerIcoGeo);
    const innerWireMat = new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.58,
    });
    const innerWire = new THREE.LineSegments(innerEdgesGeo, innerWireMat);
    coreGroup.add(innerWire);

    const gimbalOneGeo = new THREE.TorusGeometry(2.12, 0.014, 8, 96);
    const gimbalOneMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.44,
    });
    const gimbalOne = new THREE.Mesh(gimbalOneGeo, gimbalOneMat);
    gimbalOne.rotation.x = Math.PI * 0.38;
    coreGroup.add(gimbalOne);

    const gimbalTwoGeo = new THREE.TorusGeometry(2.62, 0.009, 8, 96);
    const gimbalTwoMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.28,
    });
    const gimbalTwo = new THREE.Mesh(gimbalTwoGeo, gimbalTwoMat);
    gimbalTwo.rotation.y = Math.PI * 0.34;
    coreGroup.add(gimbalTwo);

    // 3. Atmospheric Particle Field
    const particleCount = getWidth() < 768 ? 120 : 220;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = i * 2.399963229728653;
      const radial = 3.2 + ((i * 19) % 47) * 0.16;
      particlePositions[i * 3] = Math.cos(t) * radial;
      particlePositions[i * 3 + 1] = (((i * 37) % 100) / 100 - 0.5) * 9.5;
      particlePositions[i * 3 + 2] = Math.sin(t) * radial * 0.65 - 3.0;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.038,
      transparent: true,
      opacity: 0.48,
      sizeAttenuation: true,
    });
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleField);

    const applyCoreSectionPose = (section: SectionId, immediate = false) => {
      const base = CORE_SECTION_POSES[section];
      const mobileScale = getWidth() < 768 ? 0.62 : getWidth() < 1024 ? 0.8 : 1;
      const targetX = getWidth() < 768 ? base.x * 0.25 : base.x;

      if (immediate) {
        coreGroup.position.set(targetX, base.y, base.z);
        coreGroup.scale.setScalar(base.scale * mobileScale);
        coreGroup.rotation.set(
          THREE.MathUtils.degToRad(base.tiltX),
          THREE.MathUtils.degToRad(base.tiltY),
          THREE.MathUtils.degToRad(base.tiltZ)
        );
        return;
      }

      coreAnim?.cancel();
      coreAnim = animate(coreGroup, {
        x: targetX,
        y: base.y,
        z: base.z,
        scale: base.scale * mobileScale,
        rotateX: base.tiltX,
        rotateY: base.tiltY,
        rotateZ: base.tiltZ,
        duration: 1200,
        ease: "outExpo",
      });
    };

    const initialSection = getScrollTelemetry().activeSection;
    applyGridFormation(initialSection, true);
    applyCoreSectionPose(initialSection, true);

    if (prefersReducedMotion) {
      const renderStaticWithBw = () => {
        const isBw = getCrtPreferencesSnapshot().bw;
        keyLight.color.setHex(isBw ? 0xe5e7eb : 0x38bdf8);
        rimLight.color.setHex(isBw ? 0x9ca3af : 0x60a5fa);
        particleMaterial.color.setHex(isBw ? 0xd1d5db : 0x7dd3fc);
        outerWireMat.color.setHex(isBw ? 0xdbe0e8 : 0x38bdf8);
        innerWireMat.color.setHex(isBw ? 0xf3f4f6 : 0x7dd3fc);
        gimbalOneMat.color.setHex(isBw ? 0xdbe0e8 : 0x38bdf8);
        gimbalTwoMat.color.setHex(isBw ? 0x9ca3af : 0x60a5fa);
        nodeMaterial.emissive.setHex(isBw ? 0xdbe0e8 : 0x0ea5e9);
        renderer.render(scene, camera);
      };
      renderStaticWithBw();
      const unsubBwStatic = subscribeCrtPreferences(renderStaticWithBw);
      const handleStaticResize = () => {
        const w = getWidth();
        const h = Math.max(1, getHeight());
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        renderStaticWithBw();
      };
      window.addEventListener("resize", handleStaticResize);
      return () => {
        unsubBwStatic();
        window.removeEventListener("resize", handleStaticResize);
        instancedGrid.dispose();
        nodeGeometry.dispose();
        nodeMaterial.dispose();
        outerIcoGeo.dispose();
        outerEdgesGeo.dispose();
        outerWireMat.dispose();
        innerIcoGeo.dispose();
        innerEdgesGeo.dispose();
        innerWireMat.dispose();
        gimbalOneGeo.dispose();
        gimbalOneMat.dispose();
        gimbalTwoGeo.dispose();
        gimbalTwoMat.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    // Element-coupled state synchronized with UI hovers, focuses, and clicks
    const targetPointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };
    const targetAccent = new THREE.Color(DEFAULT_ACCENT_HEX);
    const currentAccent = new THREE.Color(DEFAULT_ACCENT_HEX);
    const bwPhosphorColor = new THREE.Color(0xdbe0e8);
    const bwBaseNodeColor = new THREE.Color(0x1b1d22);
    const bwKeyColor = new THREE.Color(0xe5e7eb);
    const bwRimColor = new THREE.Color(0x9ca3af);
    const bwParticleColor = new THREE.Color(0xd1d5db);
    const colorKeyDefault = new THREE.Color(0x38bdf8);
    const colorRimDefault = new THREE.Color(0x60a5fa);
    const colorParticleDefault = new THREE.Color(0x7dd3fc);
    const coreColorMix = new THREE.Color();

    let pointerClientX = getWidth() * 0.5;
    let pointerClientY = getHeight() * 0.5;
    let hasPointerActive = false;

    let hasElementLock = false;
    let elementClientX = getWidth() * 0.5;
    let elementClientY = getHeight() * 0.5;
    let targetFocusIntensity = 0;
    let focusBurstBoost = 0;
    let spinImpulse = 0;
    let lastFocusedEl: Element | null = null;

    const triggerNodeWave = (originIdx: number, peakMultiplier: number) => {
      const mobileFactor = getWidth() < 768 ? 0.68 : 1;
      const section = getScrollTelemetry().activeSection;
      waveAnim?.cancel();
      waveAnim = animate(gridInstances, {
        scale: [
          (_t: unknown, idx = 0) =>
            getBaseNodeScale(section, idx, mobileFactor) *
            (idx === originIdx ? peakMultiplier * 1.15 : peakMultiplier),
          (_t: unknown, idx = 0) => getBaseNodeScale(section, idx, mobileFactor),
        ],
        rotateZ: [(_t: unknown, idx = 0) => (idx % 2 === 0 ? 22 : -22), 0],
        duration: 640,
        delay: stagger(18, { grid: [GRID_COLS, GRID_ROWS], from: originIdx }),
        ease: "outExpo",
      });
    };

    const applyElementInteraction = (
      mode: "focus" | "pulse",
      clientX: number,
      clientY: number,
      accent?: string
    ) => {
      hasElementLock = true;
      elementClientX = clientX;
      elementClientY = clientY;
      targetAccent.set(accent ?? DEFAULT_ACCENT_HEX);
      targetFocusIntensity = mode === "pulse" ? 6.4 : 4.6;
      if (mode === "pulse") {
        focusBurstBoost = 2.6;
        spinImpulse = 3.2;
      }

      const originIdx = computeNearestNodeIndex(
        clientX,
        clientY,
        getWidth(),
        getHeight()
      );
      triggerNodeWave(originIdx, mode === "pulse" ? 1.52 : 1.24);
    };

    const releaseElementLock = () => {
      hasElementLock = false;
      lastFocusedEl = null;
      targetFocusIntensity = 0;
      targetAccent.set(DEFAULT_ACCENT_HEX);
    };

    const unsubscribeSection = subscribeActiveSection((section) => {
      releaseElementLock();
      applyGridFormation(section, false);
      applyCoreSectionPose(section, false);
    });

    const unsubscribeStage = subscribeStageInteractions((event: StageInteractionEvent) => {
      if (event.type === "clear") {
        releaseElementLock();
        return;
      }
      const cx = event.clientX ?? getWidth() * 0.5;
      const cy = event.clientY ?? getHeight() * 0.5;
      applyElementInteraction(event.type, cx, cy, event.accent);
    });

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const w = Math.max(1, getWidth());
      const h = Math.max(1, getHeight());
      hasPointerActive = true;
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
      targetPointer.x = (event.clientX / w - 0.5) * 2;
      targetPointer.y = (event.clientY / h - 0.5) * 2;
    };

    const engageElementFromTarget = (target: EventTarget | null, mode: "focus" | "pulse") => {
      if (!(target instanceof Element)) return;
      const matched = target.closest(INTERACTIVE_TARGET_SELECTOR);
      if (!matched) return;
      if (mode === "focus" && matched === lastFocusedEl) return;
      lastFocusedEl = matched;
      const rect = matched.getBoundingClientRect();
      applyElementInteraction(
        mode,
        rect.left + rect.width * 0.5,
        rect.top + rect.height * 0.5,
        extractAccentHex(matched)
      );
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      engageElementFromTarget(event.target, "focus");
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (!lastFocusedEl) return;
      const related = event.relatedTarget instanceof Element ? event.relatedTarget : null;
      if (!related || !related.closest(INTERACTIVE_TARGET_SELECTOR)) {
        releaseElementLock();
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      engageElementFromTarget(event.target, "focus");
    };

    const handleFocusOut = (event: FocusEvent) => {
      const related = event.relatedTarget instanceof Element ? event.relatedTarget : null;
      if (!related || !related.closest(INTERACTIVE_TARGET_SELECTOR)) {
        releaseElementLock();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const targetEl =
        event.target instanceof Element
          ? event.target.closest(INTERACTIVE_TARGET_SELECTOR)
          : null;
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        applyElementInteraction(
          "pulse",
          rect.left + rect.width * 0.5,
          rect.top + rect.height * 0.5,
          extractAccentHex(targetEl)
        );
        return;
      }

      const originIdx = computeNearestNodeIndex(
        event.clientX,
        event.clientY,
        getWidth(),
        getHeight()
      );
      focusBurstBoost = 1.8;
      spinImpulse = 1.6;
      triggerNodeWave(originIdx, 1.38);
    };

    const handleResize = () => {
      const w = getWidth();
      const h = Math.max(1, getHeight());
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.addEventListener("focusin", handleFocusIn, { passive: true });
    document.addEventListener("focusout", handleFocusOut, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("resize", handleResize);

    // Main render loop with visibility throttling & live cursor/element lattice field
    let rafId = 0;
    let lastTime = performance.now();
    let prevBwForGrid: boolean | null = null;
    let wasHotspotActive = true;

    const renderFrame = (now: number) => {
      rafId = window.requestAnimationFrame(renderFrame);
      if (document.hidden) {
        lastTime = now;
        return;
      }

      const dt = Math.min(0.05, (now - lastTime) * 0.001);
      lastTime = now;

      const w = getWidth();
      const h = getHeight();
      const { progress, velocity } = getScrollTelemetry();
      const clampedVel = Math.max(-25, Math.min(25, velocity));

      currentPointer.x += (targetPointer.x - currentPointer.x) * 0.07;
      currentPointer.y += (targetPointer.y - currentPointer.y) * 0.07;

      // Subtle camera parallax driven by pointer and scroll progress
      camera.position.x = currentPointer.x * 0.45;
      camera.position.y = -currentPointer.y * 0.3 + (0.5 - progress) * 0.45;
      camera.position.z = 10.6 - Math.sin(progress * Math.PI) * 0.9;
      camera.lookAt(0, 0, -1.6);

      // Smooth semantic accent tinting across lighting & wireframes (instant native B&W phosphor)
      const isBw = getCrtPreferencesSnapshot().bw;
      currentAccent.lerp(isBw ? bwPhosphorColor : targetAccent, 0.14);
      keyLight.color.copy(isBw ? bwKeyColor : colorKeyDefault);
      rimLight.color.copy(isBw ? bwRimColor : colorRimDefault);
      particleMaterial.color.copy(isBw ? bwParticleColor : colorParticleDefault);
      nodeMaterial.emissive.copy(currentAccent);
      focusLight.color.copy(currentAccent);
      outerWireMat.color.copy(currentAccent);
      innerWireMat.color
        .copy(currentAccent)
        .lerp(coreColorMix.set(isBw ? 0xf3f4f6 : 0xe0f2fe), 0.45);
      gimbalOneMat.color.copy(currentAccent);
      gimbalTwoMat.color.copy(isBw ? bwRimColor : colorRimDefault);

      focusBurstBoost = Math.max(0, focusBurstBoost - dt * 5.2);
      spinImpulse = Math.max(0, spinImpulse - dt * 4.2);
      const desiredLightIntensity =
        (hasElementLock ? targetFocusIntensity : hasPointerActive ? 1.8 : 0) +
        focusBurstBoost;
      focusLight.intensity += (desiredLightIntensity - focusLight.intensity) * 0.14;

      const hotspotClientX = hasElementLock ? elementClientX : pointerClientX;
      const hotspotClientY = hasElementLock ? elementClientY : pointerClientY;
      const hotspotLightWorld = viewportToWorld(hotspotClientX, hotspotClientY, w, h, camera, 1.8);
      focusLight.position.x += (hotspotLightWorld.x - focusLight.position.x) * 0.14;
      focusLight.position.y += (hotspotLightWorld.y - focusLight.position.y) * 0.14;

      // Gravitate orbital precision core subtly toward active UI element (when Anime core transition isn't locked)
      if (hasElementLock) {
        const elementCoreWorld = viewportToWorld(elementClientX, elementClientY, w, h, camera, -1.6);
        const attractStrength = w < 768 ? 0.015 : 0.032;
        coreGroup.position.x += (elementCoreWorld.x * 0.42 - coreGroup.position.x) * attractStrength;
        coreGroup.position.y += (elementCoreWorld.y * 0.32 - coreGroup.position.y) * attractStrength;
      }

      // Live spatial field across the 72 InstancedMesh blocks around active pointer/element
      const fieldWorld = viewportToWorld(hotspotClientX, hotspotClientY, w, h, camera, -4.3);
      const fieldRadius = hasElementLock ? 4.4 : 3.1;
      const hasHotspot = hasElementLock || hasPointerActive;
      const shouldUpdateColors =
        hasHotspot || wasHotspotActive || prevBwForGrid !== isBw;
      let anyColorUpdated = false;

      for (let i = 0; i < gridInstances.length; i++) {
        const inst = gridInstances[i];
        let proximity = 0;
        if (hasHotspot) {
          const dist = Math.hypot(inst.x - fieldWorld.x, inst.y - fieldWorld.y);
          proximity = Math.max(0, 1 - dist / fieldRadius);
        }

        const easedProximity = proximity * proximity;
        const lift = easedProximity * (hasElementLock ? 1.35 : 0.85);
        const desiredZ = targetNodeZ[i] + lift;
        currentNodeZ[i] += (desiredZ - currentNodeZ[i]) * 0.16;
        inst.z = currentNodeZ[i];

        if (shouldUpdateColors) {
          scratchNodeColor
            .copy(isBw ? bwBaseNodeColor : baseNodeColor)
            .lerp(currentAccent, easedProximity * (hasElementLock ? 0.92 : 0.62));
          instancedGrid.setColorAt(i, scratchNodeColor);
          anyColorUpdated = true;
        }
      }

      if (shouldUpdateColors) {
        prevBwForGrid = isBw;
        wasHotspotActive = hasHotspot;
      }

      if (anyColorUpdated && instancedGrid.instanceColor) {
        instancedGrid.instanceColor.needsUpdate = true;
      }

      // Continuous kinetic ring drift amplified by Lenis velocity and element click impulses
      const spinSpeed = 0.22 + Math.abs(clampedVel) * 0.055 + spinImpulse;
      outerWire.rotation.y += dt * spinSpeed * 0.65;
      outerWire.rotation.x += dt * 0.14;
      innerWire.rotation.y -= dt * (spinSpeed * 1.15);
      innerWire.rotation.z += dt * 0.28;
      gimbalOne.rotation.z += dt * (0.35 + clampedVel * 0.04 + spinImpulse * 0.4);
      gimbalTwo.rotation.x -= dt * (0.28 + clampedVel * 0.035);

      // Particle field parallax and slow rotational drift
      particleField.rotation.y = progress * 0.85 + currentPointer.x * 0.16;
      particleField.rotation.x = currentPointer.y * 0.1;

      renderer.render(scene, camera);
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      unsubscribeSection();
      unsubscribeStage();
      formationAnim?.revert();
      waveAnim?.revert();
      coreAnim?.revert();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);

      instancedGrid.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      outerIcoGeo.dispose();
      outerEdgesGeo.dispose();
      outerWireMat.dispose();
      innerIcoGeo.dispose();
      innerEdgesGeo.dispose();
      innerWireMat.dispose();
      gimbalOneGeo.dispose();
      gimbalOneMat.dispose();
      gimbalTwoGeo.dispose();
      gimbalTwoMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    />
  );
}
