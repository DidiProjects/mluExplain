import { notFound } from "next/navigation";
import { Typography, Box, Chip } from "@mui/material";
import { getPostBySlug, getAllPostSlugs } from "@services/posts";
import { urlFor } from "@lib/sanity";
import { PostContent } from "./PostContent";

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

  // Use excerpt if available, otherwise extract from body
  const description =
    post.excerpt ||
    post.body?.find(
      (block: { _type: string; style?: string }) =>
        block._type === "block" && block.style === "normal"
    )?.children?.[0]?.text ||
    "";

  return (
    <Box sx={{ width: "100%" }}>
      {/* Hero Header */}
      <Box
        sx={{
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: 6,
          textAlign: "center",
        }}
      >
        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            mb: 2,
            color: "text.primary",
            fontFamily: '"Caveat", cursive',
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
              por {post.author.name}
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
              border: "2px solid #2D2D2D",
              boxShadow: "6px 6px 0px #2D2D2D",
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

        {/* Description */}
        {description && (
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              lineHeight: 1.8,
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>

      {/* Topic Sections */}
      <PostContent sections={post.sections || []} />
    </Box>
  );
}
