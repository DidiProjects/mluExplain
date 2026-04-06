"use client";

import { memo, ReactNode } from "react";
import { Box } from "@mui/material";
import { useStickyMedia } from "@hooks/useStickyMedia";

interface StickyMediaProps {
  children: ReactNode;
}

/**
 * Wrapper component for sticky media behavior.
 * Media stays at natural position, becomes fixed at viewport center on scroll,
 * and stops at the container bottom.
 * 
 * Uses direct DOM manipulation for performance (no re-renders on scroll).
 */
function StickyMediaComponent({ children }: StickyMediaProps) {
  const { containerRef, mediaRef } = useStickyMedia();

  return (
    <Box
      ref={containerRef}
      sx={{
        flex: 1,
        position: "relative",
        minHeight: "100%",
      }}
    >
      <Box
        ref={mediaRef}
        sx={{
          padding: "1rem",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// Memoize to prevent unnecessary re-renders when parent updates
export const StickyMedia = memo(StickyMediaComponent);
StickyMedia.displayName = "StickyMedia";
