// Shared TypeScript types
import type { PortableTextBlock } from "@portabletext/types";

// Sanity base types
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityFile {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

// Media types
export type MediaType =
  | "image"
  | "video"
  | "gif"
  | "embed"
  | "lottie"
  | "visualization";

export type VisualizationType =
  | "neural-network"
  | "gradient-descent"
  | "decision-tree"
  | "confusion-matrix"
  | "loss-chart"
  | "data-flow"
  | "transformer"
  | "attention"
  | "convolution"
  | "cnn-architecture"
  | "pooling"
  | "transfer-learning"
  | "overfitting"
  | "rag-pipeline"
  | "embedding-space"
  | "regularization";

export type EmbedType =
  | "youtube"
  | "vimeo"
  | "codepen"
  | "codesandbox"
  | "other";

// Scroll animation configuration
export interface ScrollAnimationConfig {
  enabled?: boolean;
  easing?: "linear" | "easeOut" | "easeInOut" | "spring";
  startOffset?: number;
  endOffset?: number;
  scrubMode?: "scrub" | "playOnce" | "playReverse";
}

export interface SectionMedia {
  _type: "sectionMedia";
  mediaType: MediaType;

  // Image
  image?: SanityImage;

  // Video
  video?: SanityFile;
  videoUrl?: string;

  // GIF/Animation
  gif?: SanityImage;

  // Embed
  embedUrl?: string;
  embedType?: EmbedType;

  // Lottie
  lottieUrl?: string;
  lottieFile?: SanityFile;

  // Visualization (new CMS-driven config)
  visualization?: VisualizationConfig;
  
  // Legacy visualization type (deprecated)
  visualizationType?: VisualizationType;

  // Common
  caption?: string;
  aspectRatio?: "auto" | "16/9" | "4/3" | "1/1" | "9/16";
}

// ===================
// VISUALIZATION CONFIG TYPES
// ===================

export type ColorPreset = "default" | "cool" | "warm" | "nature" | "vibrant" | "custom";

export interface VisualizationTheme {
  preset?: ColorPreset;
  colors?: string[];
  backgroundColor?: string;
}

export interface StateLabel {
  _key: string;
  label: string;
  description?: string;
}

export interface PipelineStep {
  _key: string;
  label: string;
  icon?: string;
}

export interface TransformerBlock {
  _key: string;
  label: string;
}

export interface CNNLayer {
  _key: string;
  label: string;
  type: "input" | "conv" | "pool" | "fc" | "output";
  icon?: string;
}

export interface LossDataPoint {
  _key: string;
  epoch: number;
  loss: number;
}

export interface RegularizationTechnique {
  _key: string;
  name: string;
  icon?: string;
  description?: string;
}

// Type-specific configurations
export interface NeuralNetworkConfig {
  layerLabels?: string[];
  layerSizes?: number[];
}

export interface PipelineConfig {
  steps?: PipelineStep[];
}

export interface TransformerConfig {
  blocks?: TransformerBlock[];
}

export interface AttentionConfig {
  queryLabels?: string[];
  keyLabels?: string[];
}

export interface ConfusionMatrixConfig {
  values?: {
    truePositive: number;
    falsePositive: number;
    falseNegative: number;
    trueNegative: number;
  };
  labels?: {
    positiveClass: string;
    negativeClass: string;
    predictedPositive: string;
    predictedNegative: string;
  };
}

export interface LossChartConfig {
  dataPoints?: LossDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export interface CNNArchitectureConfig {
  layers?: CNNLayer[];
}

export interface DecisionTreeConfig {
  rootLabel?: string;
  depth?: number;
}

export interface OverfittingConfig {
  trainLabel?: string;
  validationLabel?: string;
  showOverfitZone?: boolean;
}

export interface EmbeddingConfig {
  clusterLabels?: string[];
  axisLabels?: {
    x: string;
    y: string;
  };
}

export interface RegularizationConfig {
  techniques?: RegularizationTechnique[];
}

export interface TransferLearningConfig {
  baseModelLabel?: string;
  frozenLabel?: string;
  newHeadLabel?: string;
}

export interface ConvolutionConfig {
  inputSize?: number;
  filterSize?: number;
}

export interface PoolingConfig {
  poolingType?: "max" | "avg";
  inputSize?: number;
  poolSize?: number;
}

export interface GradientDescentConfig {
  startLabel?: string;
  endLabel?: string;
  numSteps?: number;
}

// Main visualization config type
export interface VisualizationConfig {
  type: VisualizationType;
  title: string;
  subtitle?: string;
  hint?: string;
  stateLabels?: StateLabel[];
  theme?: VisualizationTheme;
  
  // Type-specific configs
  neuralNetworkConfig?: NeuralNetworkConfig;
  pipelineConfig?: PipelineConfig;
  transformerConfig?: TransformerConfig;
  attentionConfig?: AttentionConfig;
  confusionMatrixConfig?: ConfusionMatrixConfig;
  lossChartConfig?: LossChartConfig;
  cnnConfig?: CNNArchitectureConfig;
  decisionTreeConfig?: DecisionTreeConfig;
  overfittingConfig?: OverfittingConfig;
  embeddingConfig?: EmbeddingConfig;
  regularizationConfig?: RegularizationConfig;
  transferLearningConfig?: TransferLearningConfig;
  convolutionConfig?: ConvolutionConfig;
  poolingConfig?: PoolingConfig;
  gradientDescentConfig?: GradientDescentConfig;
}

// Math equation block
export interface MathBlock {
  _type: "mathBlock";
  _key: string;
  latex: string;
  inline?: boolean;
}

// Code block
export interface CodeBlock {
  _type: "codeBlock";
  _key: string;
  language?: string;
  code: string;
  filename?: string;
}

// State marker for media visualization states
export interface StateMarker {
  _type: "stateMarker";
  _key: string;
  stateIndex: number;
  label?: string;
}

// Post section (topic within a post)
export interface PostSection {
  _type: "postSection";
  _key: string;
  title: string;
  content: (PortableTextBlock | CodeBlock | MathBlock | StateMarker)[];
  media?: SectionMedia;
}

// Author
export interface Author {
  _id: string;
  _type: "author";
  name: string;
  slug?: SanitySlug;
  image?: SanityImage;
  bio?: PortableTextBlock[];
}

// Category
export interface Category {
  _id: string;
  _type: "category";
  title: string;
  slug?: SanitySlug;
  description?: string;
}

// Post
export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  author?: Author;
  mainImage?: SanityImage;
  categories?: Category[];
  publishedAt?: string;
  sections?: PostSection[];
  // Legacy field
  body?: PortableTextBlock[];
}

// Post card (for list views)
export interface PostCard {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  author?: {
    name: string;
    image?: SanityImage;
  };
  mainImage?: SanityImage;
  categories?: {
    title: string;
  }[];
  publishedAt?: string;
}
