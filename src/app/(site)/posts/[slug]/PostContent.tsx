"use client";

import { memo } from "react";
import { Box, Typography } from "@mui/material";
import { PortableText } from "@portabletext/react";
import { MediaRenderer } from "@components/MediaRenderer";
import { StickyMedia } from "@components/StickyMedia";
import type {
  PostSection as PostSectionType,
  CodeBlock,
  MathBlock,
} from "@/types";
import styles from "./PostContent.module.css";

interface PostContentProps {
  sections: PostSectionType[];
}

// Custom components for PortableText
const portableTextComponents = {
  block: {
    h3: ({ children }: { children?: React.ReactNode }) => (
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: "1.4rem", md: "1.6rem" },
          fontWeight: 600,
          mt: 3,
          mb: 1.5,
          color: "text.primary",
        }}
      >
        {children}
      </Typography>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "1.2rem", md: "1.3rem" },
          fontWeight: 600,
          mt: 2.5,
          mb: 1,
          color: "text.primary",
        }}
      >
        {children}
      </Typography>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.9,
          color: "text.secondary",
          fontSize: { xs: "1rem", md: "1.1rem" },
          mb: 2,
        }}
      >
        {children}
      </Typography>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: "4px solid",
          borderColor: "primary.main",
          pl: 3,
          py: 1,
          my: 2,
          fontStyle: "italic",
          bgcolor: "rgba(232, 93, 58, 0.05)",
          borderRadius: "0 8px 8px 0",
        }}
      >
        <Typography color="text.secondary">{children}</Typography>
      </Box>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <Box
        component="ul"
        sx={{
          pl: 3,
          mb: 2,
          "& li": {
            mb: 0.5,
            color: "text.secondary",
            lineHeight: 1.8,
          },
        }}
      >
        {children}
      </Box>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <Box
        component="ol"
        sx={{
          pl: 3,
          mb: 2,
          "& li": {
            mb: 0.5,
            color: "text.secondary",
            lineHeight: 1.8,
          },
        }}
      >
        {children}
      </Box>
    ),
  },
  marks: {
    code: ({ children }: { children?: React.ReactNode }) => (
      <Box
        component="code"
        sx={{
          bgcolor: "rgba(0,0,0,0.06)",
          px: 0.8,
          py: 0.3,
          borderRadius: 1,
          fontFamily: "monospace",
          fontSize: "0.9em",
        }}
      >
        {children}
      </Box>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string; blank?: boolean };
      children?: React.ReactNode;
    }) => (
      <Box
        component="a"
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        sx={{
          color: "primary.main",
          textDecoration: "underline",
          "&:hover": {
            color: "primary.dark",
          },
        }}
      >
        {children}
      </Box>
    ),
  },
  types: {
    codeBlock: ({ value }: { value: CodeBlock }) => (
      <Box
        sx={{
          my: 2,
          borderRadius: 2,
          overflow: "hidden",
          border: "2px solid #2D2D2D",
          boxShadow: "4px 4px 0px #2D2D2D",
        }}
      >
        {value.filename && (
          <Box
            sx={{
              bgcolor: "#2D2D2D",
              color: "#fff",
              px: 2,
              py: 0.5,
              fontSize: "0.85rem",
              fontFamily: "monospace",
            }}
          >
            {value.filename}
          </Box>
        )}
        <Box
          component="pre"
          sx={{
            bgcolor: "#1e1e1e",
            color: "#d4d4d4",
            p: 2,
            overflow: "auto",
            fontSize: "0.9rem",
            fontFamily: "monospace",
            m: 0,
          }}
        >
          <code>{value.code}</code>
        </Box>
      </Box>
    ),
    mathBlock: ({ value }: { value: MathBlock }) => (
      <Box
        sx={{
          my: value.inline ? 0 : 2,
          textAlign: value.inline ? "inherit" : "center",
          fontFamily: "KaTeX, serif",
          fontSize: value.inline ? "1em" : "1.2em",
        }}
      >
        {value.inline ? `$${value.latex}$` : `$$${value.latex}$$`}
      </Box>
    ),
  },
};

// Single section renderer
const SectionRenderer = memo(function SectionRenderer({
  section,
  index,
}: {
  section: PostSectionType;
  index: number;
}) {
  const hasMedia = !!section.media;
  const isEven = index % 2 === 0;

  // Section without media - full width
  if (!hasMedia) {
    return (
      <Box className={styles.sectionFullWidth}>
        <Typography
          variant="h2"
          className={styles.sectionTitle}
          sx={{
            fontFamily: '"Caveat", cursive',
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            mb: 2,
            color: "text.primary",
          }}
        >
          {section.title}
        </Typography>
        <Box className={styles.sectionContent}>
          <PortableText
            value={section.content}
            components={portableTextComponents}
          />
        </Box>
      </Box>
    );
  }

  // Section with media - split layout
  return (
    <Box className={styles.sectionWithMedia}>
      <Box
        className={`${styles.contentWrapper} ${
          isEven ? styles.contentLeft : styles.contentRight
        }`}
      >
        <Box className={styles.textContainer}>
          <Typography
            variant="h2"
            className={styles.sectionTitle}
            sx={{
              fontFamily: '"Caveat", cursive',
              fontSize: { xs: "1.8rem", md: "2.2rem" },
              mb: 2,
              color: "text.primary",
            }}
          >
            {section.title}
          </Typography>
          <Box className={styles.sectionContent}>
            <PortableText
              value={section.content}
              components={portableTextComponents}
            />
          </Box>
        </Box>
        <StickyMedia>
          <MediaRenderer media={section.media!} />
        </StickyMedia>
      </Box>
    </Box>
  );
});

SectionRenderer.displayName = "SectionRenderer";

/**
 * PostContent component that renders sections from Sanity CMS.
 */
function PostContentComponent({ sections }: PostContentProps) {
  if (!sections || sections.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Este post ainda não tem conteúdo.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Acesse o painel de administração para adicionar seções.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        maxWidth: "1400px",
        mx: "auto",
      }}
    >
      {sections.map((section, index) => (
        <SectionRenderer key={section._key} section={section} index={index} />
      ))}
    </Box>
  );
}

export const PostContent = memo(PostContentComponent);
PostContent.displayName = "PostContent";
