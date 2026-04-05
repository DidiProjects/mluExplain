import { ThemeRegistry } from "@components/index";
import { Header } from "@components/index";
import { Footer } from "@components/index";
import { Box } from "@mui/material";
import "./globals.css";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeRegistry>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeRegistry>
  );
}
