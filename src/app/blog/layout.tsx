import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
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
