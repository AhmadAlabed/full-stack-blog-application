import MainNavBar from "@/components/MainNavBar";
//MUI
import {
  Box,
  Button,
  Container,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Blogs from "@/components/Blogs";
import { Suspense } from "react";
import TechnologyMarquees from "@/components/TechnologyMarquees";
export default async function Main() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <MainNavBar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url("/images/hero.svg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          fontWeight={700}
          component="h1"
          variant="h3"
          textAlign="center"
          my={5}
        >
          Share Your Thoughts:{" "}
          <Typography
            fontWeight="inherit"
            component="span"
            variant="inherit"
            textAlign="inherit"
            color="primary"
          >
            A Place to Write and Inspire
          </Typography>
        </Typography>
        <Box my={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            component={Link}
            href="/blog"
            aria-label="add post"
            variant="outlined"
            color="secondary"
          >
            Create your post
          </Button>
          <Divider
            orientation="vertical"
            variant="fullWidth"
            flexItem
            sx={{ marginInline: 1 }}
          />
          <Button
            component={Link}
            href="/blog/my-posts"
            aria-label="my post"
            variant="contained"
            color="secondary"
          >
            My Posts
          </Button>
        </Box>
        <TechnologyMarquees />
      </Box>
      <Container component={"main"} maxWidth="xl">
        <Typography mb={3} textAlign="center" variant="h4" color="primary">
          Blog Posts
        </Typography>
        <Suspense
          fallback={
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          }
        >
          <Blogs />
        </Suspense>
      </Container>
    </Box>
  );
}
