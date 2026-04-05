import { Container, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ mb: 3, textAlign: "center" }}>
        About
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center", maxWidth: 600, mx: "auto" }}>
        MLU-Explain exists to teach important machine learning concepts through
        visual essays in a fun, informative, and accessible manner.
      </Typography>
    </Container>
  );
}
