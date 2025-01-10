import { Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 84px)",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "420px" }}>{children}</Box>
      </Box>
      <IconButton
        component={Link}
        href="/"
        aria-label="add"
        color="primary"
        size="large"
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <HomeIcon />
      </IconButton>
    </>
  );
}
