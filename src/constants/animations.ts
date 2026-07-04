/**
 * Sanskriti Pre School — Animation Tokens
 *
 * Defines standard animation durations, easing curves, and reusable
 * spring/timing configurations for React Native Reanimated.
 *
 * Every animation in the app MUST use these tokens. This ensures:
 *  1. Visual consistency — all transitions feel cohesive.
 *  2. Performance — values are tuned for 60fps on mid-range devices.
 *  3. Brand alignment — the "Academic Warmth" feel: calm, purposeful, not frantic.
 *
 * Philosophy:
 *  - Micro-interactions should be quick (150–250ms) to feel snappy.
 *  - Layout transitions should be moderate (300–400ms) to feel purposeful.
 *  - Full-screen transitions should be smooth (400–500ms) to feel composed.
 *  - Use spring physics for interactive elements; timing for state changes.
 */

import { Easing } from 'react-native-reanimated';

// ─── Durations ────────────────────────────────────────────────────────────────
/** Standard animation durations in milliseconds */
export const Duration = {
  /** 100ms — instant feedback: active state press */
  instant: 100,
  /** 150ms — micro-interactions: icon change, checkbox toggle */
  micro: 150,
  /** 200ms — fast transitions: button press feedback, chip selection */
  fast: 200,
  /** 300ms — standard transitions: card hover, tab switch, fade in/out */
  normal: 300,
  /** 400ms — deliberate transitions: modal appear, screen transition */
  moderate: 400,
  /** 500ms — slow transitions: splash screen fade, onboarding slide */
  slow: 500,
  /** 800ms — dramatic transitions: first-load hero animation */
  dramatic: 800,
  /** 1200ms — very slow: splash screen logo reveal */
  reveal: 1200,
} as const;

// ─── Easing Curves ────────────────────────────────────────────────────────────
/**
 * Custom easing curves for different interaction types.
 * Based on Material Design 3's emphasis and standard curves,
 * tuned for the "calm & professional" brand feel.
 */
export const Curves = {
  /** Standard curve — most transitions. Slow start, fast middle, slow end. */
  standard: Easing.bezier(0.2, 0.0, 0.0, 1.0),
  /** Enter curve — elements appearing. Starts fast, decelerates. */
  enter: Easing.bezier(0.0, 0.0, 0.0, 1.0),
  /** Exit curve — elements disappearing. Starts slow, accelerates. */
  exit: Easing.bezier(0.2, 0.0, 1.0, 1.0),
  /** Emphasis curve — attention-seeking animations like errors. More dramatic. */
  emphasis: Easing.bezier(0.2, 0.0, 0.0, 1.0),
  /** Linear — progress bars, loading indicators only */
  linear: Easing.linear,
} as const;

// ─── Spring Configurations ───────────────────────────────────────────────────
/**
 * Pre-defined spring configs for `withSpring`.
 * Springs are preferred for interactive elements because they feel physical.
 */
export const Springs = {
  /** Gentle bounce — buttons, fab press, card lift */
  gentle: {
    damping: 15,
    stiffness: 150,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  },
  /** Snappy — tab indicator slide, toggle switches */
  snappy: {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  },
  /** Bouncy — pull-to-refresh, success checkmark */
  bouncy: {
    damping: 10,
    stiffness: 200,
    mass: 0.6,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  },
  /** Stiff — no overshoot, used for layout shifts */
  stiff: {
    damping: 25,
    stiffness: 400,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  },
} as const;

// ─── Timing Configurations ───────────────────────────────────────────────────
/**
 * Pre-defined timing configs for `withTiming`.
 * Timing is preferred for opacity, color, and non-interactive transitions.
 */
export const Timings = {
  /** Fade in/out — opacity changes */
  fade: {
    duration: Duration.normal,
    easing: Curves.standard,
  },
  /** Quick fade — micro state changes */
  quickFade: {
    duration: Duration.fast,
    easing: Curves.standard,
  },
  /** Slide — positional transitions */
  slide: {
    duration: Duration.moderate,
    easing: Curves.standard,
  },
  /** Enter — elements appearing on screen */
  enter: {
    duration: Duration.normal,
    easing: Curves.enter,
  },
  /** Exit — elements leaving the screen */
  exit: {
    duration: Duration.fast,
    easing: Curves.exit,
  },
  /** Emphasis — error shakes, success pulses */
  emphasis: {
    duration: Duration.moderate,
    easing: Curves.emphasis,
  },
} as const;

// ─── Stagger Delays ──────────────────────────────────────────────────────────
/**
 * When animating lists or grids, stagger each item by this delay.
 * Example: item N enters at `delay = N * StaggerDelay.list`.
 */
export const StaggerDelay = {
  /** 50ms per item — fast lists (notifications, menu items) */
  fast: 50,
  /** 80ms per item — standard lists (cards, curriculum items) */
  list: 80,
  /** 120ms per item — slow grids (gallery, dashboard tiles) */
  grid: 120,
} as const;

// ─── Scale Feedback ──────────────────────────────────────────────────────────
/**
 * Scale values for press/hover feedback on interactive elements.
 * These are subtle to maintain the "professional & calm" brand.
 */
export const ScaleFeedback = {
  /** 0.97 — buttons, primary actions */
  button: 0.97,
  /** 0.98 — cards, list items */
  card: 0.98,
  /** 0.95 — icon buttons, FABs */
  icon: 0.95,
  /** 1.02 — hover lift (web only) */
  hoverLift: 1.02,
} as const;
