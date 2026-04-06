"use client";

import { useState, useEffect, useRef, useCallback, RefObject } from "react";

export type EasingFunction = "linear" | "easeOut" | "easeInOut" | "spring";
export type ScrubMode = "scrub" | "playOnce" | "playReverse";

export interface ScrollAnimationConfig {
  enabled?: boolean;
  easing?: EasingFunction;
  startOffset?: number; // 0-100, where element enters viewport
  endOffset?: number; // 0-100, where animation completes
  scrubMode?: ScrubMode;
}

interface UseScrollProgressReturn {
  progress: number; // 0 to 1
  ref: RefObject<HTMLDivElement | null>;
  isInView: boolean;
}

// Easing functions
const easings: Record<EasingFunction, (t: number) => number> = {
  linear: (t) => t,
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  spring: (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
        ? 1
        : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

/**
 * Hook that tracks scroll progress of an element within the viewport.
 * Returns a progress value from 0 to 1 as the element scrolls through.
 *
 * Best practices implemented:
 * - Uses Intersection Observer for efficiency (only tracks when visible)
 * - RAF-based scroll tracking for smooth 60fps updates
 * - Configurable easing for natural motion
 * - Scrub mode options for different animation behaviors
 */
export function useScrollProgress(
  config: ScrollAnimationConfig = {}
): UseScrollProgressReturn {
  const {
    enabled = true,
    easing = "easeOut",
    startOffset = 80,
    endOffset = 20,
    scrubMode = "scrub",
  } = config;

  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const hasPlayedRef = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);

  const calculateProgress = useCallback(() => {
    if (!ref.current || !enabled) return 0;

    const rect = ref.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Convert offsets to pixel positions
    const startTrigger = viewportHeight * (startOffset / 100);
    const endTrigger = viewportHeight * (endOffset / 100);

    // Element's center position relative to viewport
    const elementCenter = rect.top + rect.height / 2;

    // Calculate raw progress
    let rawProgress: number;

    if (elementCenter >= startTrigger) {
      rawProgress = 0;
    } else if (elementCenter <= endTrigger) {
      rawProgress = 1;
    } else {
      rawProgress = (startTrigger - elementCenter) / (startTrigger - endTrigger);
    }

    // Clamp between 0 and 1
    rawProgress = Math.max(0, Math.min(1, rawProgress));

    // Apply easing
    return easings[easing](rawProgress);
  }, [enabled, startOffset, endOffset, easing]);

  const updateProgress = useCallback(() => {
    if (!enabled) return;

    const newProgress = calculateProgress();

    if (scrubMode === "scrub") {
      setProgress(newProgress);
    } else if (scrubMode === "playOnce") {
      if (newProgress > 0 && !hasPlayedRef.current) {
        hasPlayedRef.current = true;
        // Animate to 1 smoothly
        let start: number | null = null;
        const animateTo = (timestamp: number) => {
          if (start === null) start = timestamp;
          const elapsed = (timestamp - start) / 1000; // seconds
          const t = Math.min(elapsed / 0.8, 1); // 0.8s duration
          setProgress(easings[easing](t));
          if (t < 1) {
            requestAnimationFrame(animateTo);
          }
        };
        requestAnimationFrame(animateTo);
      }
    } else if (scrubMode === "playReverse") {
      if (newProgress > 0) {
        setProgress(1);
      } else {
        setProgress(0);
      }
    }
  }, [calculateProgress, enabled, scrubMode, easing]);

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    // Intersection Observer to detect when element is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "100px 0px 100px 0px", // Extend detection area
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !isInView) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      return;
    }

    // Throttled scroll handler using RAF
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial update
    updateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, isInView, updateProgress]);

  return { progress, ref, isInView };
}

export default useScrollProgress;
