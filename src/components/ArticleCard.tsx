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
import type { PostCard } from "@/types";

interface ArticleCardProps {
  post: PostCard;
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
        borderRadius: 1,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={post.title}
          sx={{
            objectFit: "cover",
            borderBottom: "2px solid #2D2D2D",
          }}
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
          variant="h3"
          sx={{
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "#2D2D2D",
          }}
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
                  backgroundColor: "#FFF3ED",
                  color: "#E85D3A",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  fontFamily: '"Inter", sans-serif',
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
            size="small"
            sx={{
              fontWeight: 700,
              backgroundColor: "#E85D3A",
              color: "#FFF",
              "&:hover": {
                backgroundColor: "#C44425",
              },
            }}
          >
            Ler artigo →
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
