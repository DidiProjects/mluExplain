"use client";

import { Box, Container, Typography, Link as MuiLink } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: "auto",
        backgroundColor: "primary.main",
        color: "#FFFFFF",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" sx={{ color: "#CCCCCC" }}>
          {"© "}
          {new Date().getFullYear()}{" "}
          <MuiLink
            href="/"
            sx={{ color: "secondary.main", textDecoration: "none" }}
          >
            MLU-Explain
          </MuiLink>
          {" — Visual explanations of core machine learning concepts."}
        </Typography>
      </Container>
    </Box>
  );
}
