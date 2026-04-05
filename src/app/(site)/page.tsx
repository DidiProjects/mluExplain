import { Container, Typography, Box, Grid } from "@mui/material";
import { getAllPosts } from "@services/posts";
import ArticleCard from "@components/ArticleCard";
import Hero from "@components/Hero";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      <Hero />

      {/* Articles Grid */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          sx={{
            mb: 5,
            fontWeight: 700,
            textAlign: "center",
            color: "#2D2D2D",
            fontSize: { xs: "1.8rem", md: "2.2rem" },
          }}
        >
          Últimos Artigos
        </Typography>

        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid key={post._id} size={{ xs: 12, sm: 6 }}>
              <ArticleCard post={post} />
            </Grid>
          ))}
        </Grid>

        {posts.length === 0 && (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}
          >
            Nenhum artigo publicado ainda. Adicione posts no Sanity Studio!
          </Typography>
        )}
      </Container>
    </>
  );
}
