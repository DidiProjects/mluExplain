"use client";

import { Box, Container, Typography, Link as MuiLink } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: "auto",
        backgroundColor: "#FDF9F3",
        borderTop: "2px solid #2D2D2D",
        color: "#2D2D2D",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#6B6B6B", fontFamily: '"Inter", sans-serif' }}
        >
          {"© "}
          {new Date().getFullYear()}{" "}
          <MuiLink
            href="/"
            sx={{ color: "#E85D3A", textDecoration: "none", fontWeight: 600 }}
          >
            MLU-Explain
          </MuiLink>
          {" — Explicações visuais sobre Machine Learning."}
        </Typography>
      </Container>
    </Box>
  );
}
