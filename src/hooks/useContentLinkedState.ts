"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * State marker info extracted from content blocks
 */
export interface StateMarkerInfo {
  /** Unique key of the content block */
  key: string;
  /** State index to activate when this marker is centered */
  stateIndex: number;
}

/**
 * Hook that tracks which visualization state to show based on content scroll position.
 * 
 * States are linked to marker elements in the content. When a marker crosses
 * the center of the viewport (or reaches its closest position to center),
 * the corresponding state is activated.
 * 
 * Handles edge cases:
 * - No markers: returns state 0
 * - End of scroll: shows the last state if we can't scroll further
 * - Pre-first-marker: shows state 0 until first marker is reached
 */

interface UseContentLinkedStateReturn {
  /** Current state index */
  state: number;
  /** Whether tracking is active */
  isTracking: boolean;
}

export function useContentLinkedState(
  markers: StateMarkerInfo[],
  /** Ref to the container element (section) to detect end of scroll */
  containerRef?: React.RefObject<HTMLElement | null>
): UseContentLinkedStateReturn {
  const [state, setState] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  // Sort markers by stateIndex to ensure correct order
  const sortedMarkers = [...markers].sort((a, b) => a.stateIndex - b.stateIndex);

  const calculateState = useCallback(() => {
    if (sortedMarkers.length === 0) {
      return 0;
    }

    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    // Check if we're at the end of scroll (container bottom is visible)
    let isAtEndOfScroll = false;
    if (containerRef?.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      // Consider "end of scroll" when container bottom is at or above 80% of viewport
      isAtEndOfScroll = containerRect.bottom <= viewportHeight * 0.8;
    }

    // If at end of scroll, show the highest state we have markers for
    if (isAtEndOfScroll) {
      const maxState = Math.max(...sortedMarkers.map((m) => m.stateIndex));
      return maxState;
    }

    // Find the active state based on which marker has passed the center
    // We look for the marker that is closest to or above the center
    let activeState = 0;

    for (const marker of sortedMarkers) {
      const element = document.getElementById(`state-marker-${marker.key}`);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const markerCenter = rect.top + rect.height / 2;

      // If this marker's center is at or above the viewport center,
      // this state should be active
      if (markerCenter <= viewportCenter) {
        activeState = marker.stateIndex;
      } else {
        // Markers are sorted, so once we find one below center, we can stop
        break;
      }
    }

    return activeState;
  }, [sortedMarkers, containerRef]);

  // Derive tracking status from markers length
  const hasMarkers = sortedMarkers.length > 0;

  // Update state in RAF loop
  useEffect(() => {
    if (!hasMarkers) {
      return;
    }

    const tick = () => {
      const newState = calculateState();
      setState(newState);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
    };
  }, [hasMarkers, calculateState]);

  return { state, isTracking: hasMarkers };
}
