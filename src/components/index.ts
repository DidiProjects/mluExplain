export { default as Header } from "./Header";
export { default as Footer } from "./Footer";
export { default as ArticleCard } from "./ArticleCard";
export { default as Hero } from "./Hero";
export { default as ThemeRegistry } from "./ThemeRegistry";
export { StickyMedia } from "./StickyMedia";
export { MediaRenderer } from "./MediaRenderer";
export * from "./MediaComponents";
// Export only the visualization map from animated components (avoid name conflicts)
export { visualizationComponents as animatedVisualizations } from "./MediaComponentsAnimated";
export type { AnimatedMediaProps } from "./MediaComponentsAnimated";
