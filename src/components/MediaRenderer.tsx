"use client";

import { memo, Suspense, lazy } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import Image from "next/image";
import type { SectionMedia, VisualizationType } from "@/types";
import { urlFor } from "@lib/sanity";
import { useContentLinkedState, type StateMarkerInfo } from "@/hooks";

// Import stateful visualization components (states-based animations)
import { statefulVisualizations } from "@components/MediaComponentsStateful";

// Lazy load static visualizations as fallback
const staticVisualizationComponents = {
  "neural-network": lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.NeuralNetworkMedia,
    }))
  ),
  "gradient-descent": lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.GradientDescentMedia,
    }))
  ),
  "decision-tree": lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.DecisionTreeMedia,
    }))
  ),
  "confusion-matrix": lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.ConfusionMatrixMedia,
    }))
  ),
  "loss-chart": lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.LossChartMedia,
    }))
  ),
  "data-flow": lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.DataFlowMedia,
    }))
  ),
  transformer: lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.TransformerMedia,
    }))
  ),
  attention: lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.AttentionMedia,
    }))
  ),
  convolution: lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.ConvolutionMedia,
    }))
  ),
  "cnn-architecture": lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.CNNArchitectureMedia,
    }))
  ),
  pooling: lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.PoolingMedia,
    }))
  ),
  "transfer-learning": lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.TransferLearningMedia,
    }))
  ),
  overfitting: lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.OverfittingMedia,
    }))
  ),
  "rag-pipeline": lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.RAGPipelineMedia,
    }))
  ),
  "embedding-space": lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.EmbeddingSpaceMedia,
    }))
  ),
  regularization: lazy(() =>
    import("@components/MediaComponents").then((m) => ({
      default: m.RegularizationMedia,
    }))
  ),
};

interface MediaRendererProps {
  media: SectionMedia;
  stateMarkers?: StateMarkerInfo[];
}

// Loading skeleton for media
function MediaSkeleton() {
  return (
    <Skeleton
      variant="rounded"
      width="100%"
      height={300}
      sx={{ bgcolor: "rgba(0,0,0,0.1)" }}
    />
  );
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

// Visualization renderer (pre-built SVG components)
// Uses discrete states that progress as content markers are scrolled into view
const VisualizationMedia = memo(function VisualizationMedia({
  visualizationType,
  stateMarkers = [],
}: {
  visualizationType?: VisualizationType;
  stateMarkers?: StateMarkerInfo[];
}) {
  // Use content-linked state tracking based on markers in content
  const { state } = useContentLinkedState(stateMarkers);

  if (!visualizationType) return null;

  // Get stateful component
  const StatefulComponent = statefulVisualizations[visualizationType];

  if (StatefulComponent) {
    return (
      <Box>
        <StatefulComponent state={state} />
      </Box>
    );
  }

  // Fallback to static component (lazy loaded)
  const StaticComponent = staticVisualizationComponents[visualizationType];

  if (!StaticComponent) {
    return (
      <Typography color="error">
        Unknown visualization: {visualizationType}
      </Typography>
    );
  }

  return (
    <Suspense fallback={<MediaSkeleton />}>
      <StaticComponent />
    </Suspense>
  );
});

/**
 * Generic media renderer component.
 * Renders different media types based on the mediaType field.
 */
function MediaRendererComponent({ media, stateMarkers }: MediaRendererProps) {
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

    case "visualization":
      content = (
        <VisualizationMedia
          visualizationType={media.visualizationType}
          stateMarkers={stateMarkers}
        />
      );
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
