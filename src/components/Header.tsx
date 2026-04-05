"use client";

import { AppBar, Toolbar, Typography, Container, Box, Button, Slide } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Slide appear={false} direction="down" in={show}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#FDF9F3",
          borderBottom: "2px solid #2D2D2D",
          color: "#2D2D2D",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", minHeight: 56 }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Caveat", cursive',
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "#2D2D2D",
                }}
              >
                MLU-<span style={{ color: "#E85D3A" }}>Explain</span>
              </Typography>
            </Link>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                component={Link}
                href="/"
                sx={{
                  color: "#2D2D2D",
                  fontWeight: 600,
                  fontFamily: '"Inter", sans-serif',
                  border: "none",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.04)",
                    boxShadow: "none",
                    transform: "none",
                  },
                }}
              >
                Articles
              </Button>
              <Button
                component={Link}
                href="/about"
                sx={{
                  color: "#2D2D2D",
                  fontWeight: 600,
                  fontFamily: '"Inter", sans-serif',
                  border: "none",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.04)",
                    boxShadow: "none",
                    transform: "none",
                  },
                }}
              >
                About
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
