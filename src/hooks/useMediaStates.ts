"use client";

import { useState, useEffect, useRef, useCallback, RefObject } from "react";

/**
 * Hook that tracks discrete states of a media element based on scroll position.
 * States progress from 0 to (totalStates - 1) as the element scrolls through viewport.
 * 
 * Timing:
 * - State 0: when element center reaches 60% from top (just after centering)
 * - Last state: when element center reaches 35% from top (before leaving view)
 * - This gives comfortable margins for reading content alongside the visualization
 */

interface UseMediaStatesReturn {
  /** Current state index (0 to totalStates - 1) */
  state: number;
  /** Progress within current state (0 to 1) */
  stateProgress: number;
  /** Ref to attach to the media container */
  ref: RefObject<HTMLDivElement | null>;
  /** Whether the element is currently visible */
  isInView: boolean;
}

export function useMediaStates(totalStates: number): UseMediaStatesReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(0);
  const [stateProgress, setStateProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);

  const calculateState = useCallback(() => {
    if (!ref.current || totalStates <= 1) return { state: 0, stateProgress: 0 };

    const rect = ref.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;

    // Define the scroll range where states progress
    // Start: element center at 60% from top (0.6 * viewportHeight)
    // End: element center at 35% from top (0.35 * viewportHeight)
    // This gives a comfortable range while element is prominently visible
    const startPosition = viewportHeight * 0.60;
    const endPosition = viewportHeight * 0.35;

    // Calculate raw progress through the range (0 to 1)
    let rawProgress: number;

    if (elementCenter >= startPosition) {
      rawProgress = 0;
    } else if (elementCenter <= endPosition) {
      rawProgress = 1;
    } else {
      rawProgress = (startPosition - elementCenter) / (startPosition - endPosition);
    }

    rawProgress = Math.max(0, Math.min(1, rawProgress));

    // Convert progress to discrete state
    const stateFloat = rawProgress * (totalStates - 1);
    const currentState = Math.min(Math.floor(stateFloat), totalStates - 1);
    const progressInState = stateFloat - currentState;

    return { state: currentState, stateProgress: progressInState };
  }, [totalStates]);

  // Update loop using RAF
  useEffect(() => {
    if (!isInView) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
      return;
    }

    const tick = () => {
      const { state: newState, stateProgress: newProgress } = calculateState();
      setState(newState);
      setStateProgress(newProgress);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
    };
  }, [isInView, calculateState]);

  // Intersection Observer for efficiency
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "100px 0px" }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { state, stateProgress, ref, isInView };
}
