import { notFound } from "next/navigation";
import { Container, Typography, Box, Chip } from "@mui/material";
import { PortableText } from "@portabletext/react";
import { getPostBySlug, getAllPostSlugs } from "@services/posts";
import { urlFor } from "@lib/sanity";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : undefined;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Title */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "1.75rem", md: "2.5rem" },
          mb: 2,
          textAlign: "center",
        }}
      >
        {post.title}
      </Typography>

      {/* Meta: author + date + categories */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        {post.author?.name && (
          <Typography variant="body2" color="text.secondary">
            by {post.author.name}
          </Typography>
        )}
        {post.publishedAt && (
          <Typography variant="body2" color="text.secondary">
            {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        )}
        {post.categories?.map((cat) => (
          <Chip
            key={cat.title}
            label={cat.title}
            size="small"
            sx={{
              backgroundColor: "secondary.light",
              color: "primary.dark",
              fontWeight: 600,
            }}
          />
        ))}
      </Box>

      {/* Main Image */}
      {imageUrl && (
        <Box
          sx={{
            mb: 4,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt={post.title}
            sx={{ width: "100%", display: "block" }}
          />
        </Box>
      )}

      {/* Body */}
      <Box
        sx={{
          "& p": { mb: 2, lineHeight: 1.8, color: "text.secondary" },
          "& h2": {
            mt: 4,
            mb: 2,
            fontWeight: 700,
            color: "text.primary",
          },
          "& h3": { mt: 3, mb: 1.5, fontWeight: 600 },
          "& blockquote": {
            borderLeft: "4px solid",
            borderColor: "secondary.main",
            pl: 3,
            py: 1,
            my: 2,
            fontStyle: "italic",
            color: "text.secondary",
          },
          "& img": {
            maxWidth: "100%",
            borderRadius: 2,
            my: 2,
          },
          "& ul": { pl: 3, mb: 2 },
          "& li": { mb: 0.5 },
          "& a": {
            color: "secondary.dark",
            textDecoration: "underline",
          },
        }}
      >
        {post.body && <PortableText value={post.body} />}
      </Box>
    </Container>
  );
}
