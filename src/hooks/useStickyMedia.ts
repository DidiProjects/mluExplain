"use client";

import { useRef, useCallback, useLayoutEffect } from "react";

type StickyState = "natural" | "fixed" | "bottom";

interface UseStickyMediaReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  mediaRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Custom hook for sticky media behavior.
 * Media starts at its natural position, becomes fixed at viewport center
 * when scrolling, and stops when reaching the container bottom.
 * 
 * Uses direct DOM manipulation for performance (avoids re-renders on scroll).
 */
export function useStickyMedia(): UseStickyMediaReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const lastStateRef = useRef<StickyState>("natural");

  const calculatePosition = useCallback(() => {
    const container = containerRef.current;
    const media = mediaRef.current;

    if (!container || !media) return;

    const containerRect = container.getBoundingClientRect();
    const mediaHeight = media.offsetHeight;
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    // Calculate the target position (center of viewport)
    const targetTop = viewportCenter - mediaHeight / 2;

    // Container boundaries
    const containerTop = containerRect.top;
    const containerBottom = containerRect.bottom;

    // Where the media would naturally be (top of container)
    const naturalPosition = containerTop;

    // Where the media bottom would be if centered
    const centeredMediaBottom = targetTop + mediaHeight;

    // Check if we've scrolled past the natural position
    const shouldBeSticky = naturalPosition < targetTop;

    // Check if centered media would exceed container bottom
    const wouldExceedBottom = centeredMediaBottom > containerBottom;

    let newState: StickyState;

    if (!shouldBeSticky) {
      newState = "natural";
    } else if (wouldExceedBottom) {
      newState = "bottom";
    } else {
      newState = "fixed";
    }

    // Only update DOM if state changed (performance optimization)
    if (newState !== lastStateRef.current) {
      lastStateRef.current = newState;

      if (newState === "natural") {
        media.style.position = "relative";
        media.style.top = "0";
        media.style.bottom = "auto";
        media.style.left = "auto";
        media.style.right = "auto";
        media.style.width = "auto";
      } else if (newState === "bottom") {
        media.style.position = "absolute";
        media.style.bottom = "0";
        media.style.top = "auto";
        media.style.left = "0";
        media.style.right = "0";
        media.style.width = "auto";
      } else {
        media.style.position = "fixed";
        media.style.top = `${targetTop}px`;
        media.style.bottom = "auto";
        media.style.left = `${containerRect.left}px`;
        media.style.width = `${containerRect.width}px`;
      }
    } else if (newState === "fixed") {
      // Always update position when fixed (container may have moved)
      media.style.top = `${targetTop}px`;
      media.style.left = `${containerRect.left}px`;
      media.style.width = `${containerRect.width}px`;
    }
  }, []);

  useLayoutEffect(() => {
    // Initial calculation after mount
    calculatePosition();

    // Throttled scroll handler for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculatePosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Also recalculate on resize
    const handleResize = () => {
      calculatePosition();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [calculatePosition]);

  return { containerRef, mediaRef };
}
