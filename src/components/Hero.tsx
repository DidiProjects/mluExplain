"use client";

import { Box, Container, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        backgroundColor: "#FDF9F3",
        py: { xs: 8, md: 14 },
        textAlign: "center",
        borderBottom: "3px solid #2D2D2D",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle, #2D2D2D 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          opacity: 0.06,
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "3rem", md: "4.5rem" },
            mb: 1,
            color: "#2D2D2D",
          }}
        >
          MLU-<span style={{ color: "#E85D3A" }}>Explain</span>
        </Typography>

        <Box
          sx={{
            width: 80,
            height: 3,
            backgroundColor: "#E85D3A",
            mx: "auto",
            mb: 3,
            borderRadius: 2,
          }}
        />

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1.1rem", md: "1.3rem" },
            color: "#6B6B6B",
            maxWidth: 560,
            mx: "auto",
            lineHeight: 1.8,
          }}
        >
          Explicações visuais e acessíveis sobre os principais conceitos de
          Machine Learning — de redes neurais a NLP, de forma divertida e
          informativa.
        </Typography>

        {/* Sketch doodle accents */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 16, md: 30 },
            right: { xs: 16, md: 60 },
            fontSize: { xs: "2rem", md: "3rem" },
            opacity: 0.15,
            transform: "rotate(12deg)",
            fontFamily: '"Caveat", cursive',
            color: "#2D2D2D",
          }}
        >
          ✦
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 16, md: 30 },
            left: { xs: 16, md: 60 },
            fontSize: { xs: "2rem", md: "3rem" },
            opacity: 0.15,
            transform: "rotate(-8deg)",
            fontFamily: '"Caveat", cursive',
            color: "#E85D3A",
          }}
        >
          ◯
        </Box>
      </Container>
    </Box>
  );
}
