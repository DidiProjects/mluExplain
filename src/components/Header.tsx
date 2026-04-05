"use client";

import { AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";
import Link from "next/link";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "primary.main",
        borderBottom: "3px solid",
        borderColor: "secondary.main",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  color: "#FFFFFF",
                  fontSize: "1.3rem",
                }}
              >
                MLU-
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  color: "secondary.main",
                  fontSize: "1.3rem",
                }}
              >
                EXPLAIN
              </Typography>
            </Box>
          </Link>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              href="/"
              sx={{ color: "#FFFFFF", fontWeight: 600 }}
            >
              Articles
            </Button>
            <Button
              component={Link}
              href="/about"
              sx={{ color: "#FFFFFF", fontWeight: 600 }}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
