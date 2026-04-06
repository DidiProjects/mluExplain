"use client";

import { memo } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import type { SectionMedia } from "@/types";
import { urlFor } from "@lib/sanity";
import { useContentLinkedState, type StateMarkerInfo, type MediaMarkerInfo } from "@/hooks";

interface MediaRendererProps {
  media: SectionMedia;
}

// Image renderer
const ImageMedia = memo(function ImageMedia({
  image,
  alt,
  aspectRatio,
}: {
  image: SectionMedia["image"];
  alt?: string;
  aspectRatio?: string;
}) {
  if (!image?.asset) return null;

  const imageUrl = urlFor(image).width(800).quality(85).url();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: aspectRatio === "auto" ? "16/9" : aspectRatio,
        borderRadius: 2,
        overflow: "hidden",
        border: "2px solid #2D2D2D",
        boxShadow: "4px 4px 0px #2D2D2D",
      }}
    >
      <Image
        src={imageUrl}
        alt={alt || ""}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover" }}
      />
    </Box>
  );
});

// Video renderer
const VideoMedia = memo(function VideoMedia({
  videoUrl,
  aspectRatio,
}: {
  videoUrl?: string;
  aspectRatio?: string;
}) {
  if (!videoUrl) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: aspectRatio === "auto" ? "16/9" : aspectRatio,
        borderRadius: 2,
        overflow: "hidden",
        border: "2px solid #2D2D2D",
        boxShadow: "4px 4px 0px #2D2D2D",
      }}
    >
      <video
        src={videoUrl}
        controls
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
});

// GIF renderer (uses Image component)
const GifMedia = memo(function GifMedia({
  gif,
  alt,
  aspectRatio,
}: {
  gif: SectionMedia["gif"];
  alt?: string;
  aspectRatio?: string;
}) {
  if (!gif?.asset) return null;

  const gifUrl = urlFor(gif).url();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: aspectRatio === "auto" ? "1/1" : aspectRatio,
        borderRadius: 2,
        overflow: "hidden",
        border: "2px solid #2D2D2D",
        boxShadow: "4px 4px 0px #2D2D2D",
      }}
    >
      {/* Use img tag for GIFs to preserve animation */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={gifUrl}
        alt={alt || ""}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
});

// Embed renderer (YouTube, Vimeo, CodePen, etc.)
const EmbedMedia = memo(function EmbedMedia({
  embedUrl,
  embedType,
  aspectRatio,
}: {
  embedUrl?: string;
  embedType?: string;
  aspectRatio?: string;
}) {
  if (!embedUrl) return null;

  // Convert to embed URL if needed
  let finalUrl = embedUrl;

  if (embedType === "youtube") {
    // Convert watch URL to embed URL
    const videoId = embedUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
    )?.[1];
    if (videoId) {
      finalUrl = `https://www.youtube.com/embed/${videoId}`;
    }
  } else if (embedType === "vimeo") {
    const videoId = embedUrl.match(/vimeo\.com\/(\d+)/)?.[1];
    if (videoId) {
      finalUrl = `https://player.vimeo.com/video/${videoId}`;
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: aspectRatio === "auto" ? "16/9" : aspectRatio,
        borderRadius: 2,
        overflow: "hidden",
        border: "2px solid #2D2D2D",
        boxShadow: "4px 4px 0px #2D2D2D",
      }}
    >
      <iframe
        src={finalUrl}
        title="Embedded content"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </Box>
  );
});

// Lottie renderer
const LottieMedia = memo(function LottieMedia({
  lottieUrl,
}: {
  lottieUrl?: string;
}) {
  if (!lottieUrl) return null;

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        border: "2px solid #2D2D2D",
        boxShadow: "4px 4px 0px #2D2D2D",
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      {/* Will implement with @lottiefiles/react-lottie-player if needed */}
      <Typography color="text.secondary" textAlign="center">
        Lottie Animation: {lottieUrl}
      </Typography>
    </Box>
  );
});

/**
 * Marker-based media renderer with crossfade transitions.
 * Displays images from media markers, transitioning between them
 * as the user scrolls through content markers.
 */
interface MarkerMediaRendererProps {
  markers: MediaMarkerInfo[];
  stateMarkers: StateMarkerInfo[];
  containerRef?: React.RefObject<HTMLElement | null>;
}

function MarkerMediaRendererComponent({
  markers,
  stateMarkers,
  containerRef,
}: MarkerMediaRendererProps) {
  const { state } = useContentLinkedState(stateMarkers, containerRef);

  if (markers.length === 0) return null;

  // Clamp active index to valid range
  const activeIndex = Math.min(state, markers.length - 1);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "440/380",
        borderRadius: 2,
        overflow: "hidden",
        border: "2px solid #2D2D2D",
        boxShadow: "4px 4px 0px #2D2D2D",
        bgcolor: "background.paper",
      }}
    >
      {markers.map((marker, i) => (
        <Box
          key={marker.key}
          sx={{
            position: i === 0 ? "relative" : "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 0.4s ease-out",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={marker.imageUrl}
            alt={marker.alt || marker.label || ""}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export const MarkerMediaRenderer = memo(MarkerMediaRendererComponent);
MarkerMediaRenderer.displayName = "MarkerMediaRenderer";

/**
 * Generic media renderer component.
 * Renders different media types based on the mediaType field.
 */
function MediaRendererComponent({ media }: MediaRendererProps) {
  const { mediaType, caption, aspectRatio } = media;

  let content: React.ReactNode = null;

  switch (mediaType) {
    case "image":
      content = (
        <ImageMedia
          image={media.image}
          alt={media.image?.alt}
          aspectRatio={aspectRatio}
        />
      );
      break;

    case "video":
      content = (
        <VideoMedia videoUrl={media.videoUrl} aspectRatio={aspectRatio} />
      );
      break;

    case "gif":
      content = (
        <GifMedia
          gif={media.gif}
          alt={media.gif?.alt}
          aspectRatio={aspectRatio}
        />
      );
      break;

    case "embed":
      content = (
        <EmbedMedia
          embedUrl={media.embedUrl}
          embedType={media.embedType}
          aspectRatio={aspectRatio}
        />
      );
      break;

    case "lottie":
      content = <LottieMedia lottieUrl={media.lottieUrl} />;
      break;

    default:
      return null;
  }

  return (
    <Box>
      {content}
      {caption && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            mt: 1,
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
}

export const MediaRenderer = memo(MediaRendererComponent);
MediaRenderer.displayName = "MediaRenderer";
