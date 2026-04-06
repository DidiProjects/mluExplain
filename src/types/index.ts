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
  | "lottie";

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

  // Common
  caption?: string;
  aspectRatio?: "auto" | "16/9" | "4/3" | "1/1" | "9/16";
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
export interface MediaAsset {
  _id: string;
  _type: "mediaAsset";
  identifier: SanitySlug;
  label: string;
  group?: string;
  image: SanityImage & { asset: { _ref: string; _type: "reference"; _id?: string; url?: string } };
}

export interface MediaMarker {
  _type: "mediaMarker";
  _key: string;
  media?: MediaAsset;
  label?: string;
}

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
  content: (PortableTextBlock | CodeBlock | MathBlock | MediaMarker | StateMarker)[];
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
