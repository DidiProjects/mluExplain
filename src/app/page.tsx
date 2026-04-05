import { Container, Typography, Box, Grid } from "@mui/material";
import { getAllPosts } from "@services/posts";
import ArticleCard from "@components/ArticleCard";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #232F3E 0%, #37475A 100%)",
          color: "#FFFFFF",
          py: { xs: 6, md: 10 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 2,
            }}
          >
            MLU-<span style={{ color: "#FF9900" }}>EXPLAIN</span>
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.25rem" },
              color: "#CCCCCC",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Visual explanations of core machine learning concepts
          </Typography>
        </Container>
      </Box>

      {/* Articles Grid */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          sx={{
            mb: 4,
            fontWeight: 700,
            textAlign: "center",
            color: "text.primary",
          }}
        >
          Explore Published Articles
        </Typography>

        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ArticleCard post={post} />
            </Grid>
          ))}
        </Grid>

        {posts.length === 0 && (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}
          >
            No articles published yet. Add posts on Sanity Studio!
          </Typography>
        )}
      </Container>
    </>
  );
}
