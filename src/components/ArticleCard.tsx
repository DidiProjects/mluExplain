"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Button,
} from "@mui/material";
import Link from "next/link";
import { urlFor } from "@lib/sanity";
import type { Post } from "@services/posts";

interface ArticleCardProps {
  post: Post;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(600).height(340).url()
    : undefined;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={post.title}
          sx={{ objectFit: "cover" }}
        />
      )}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          p: 3,
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontSize: "1.25rem", fontWeight: 700, textTransform: "uppercase" }}
        >
          {post.title}
        </Typography>

        {post.categories && post.categories.length > 0 && (
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {post.categories.map((cat) => (
              <Chip
                key={cat.title}
                label={cat.title}
                size="small"
                sx={{
                  backgroundColor: "secondary.light",
                  color: "primary.dark",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ mt: "auto", pt: 1 }}>
          <Button
            component={Link}
            href={`/posts/${post.slug.current}`}
            variant="contained"
            color="secondary"
            size="small"
            sx={{ fontWeight: 700 }}
          >
            Dive In
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
