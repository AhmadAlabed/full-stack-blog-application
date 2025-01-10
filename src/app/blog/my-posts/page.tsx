import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { Suspense } from "react";
import BlogPosts from "./BlogPosts";

const MyPosts = () => {
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{ pt: 4, minHeight: "calc(100vh - 84px)" }}
    >
      <Typography mb={5} textAlign="center" variant="h4" color="primary">
        My Blog Posts
      </Typography>
      <Suspense
        fallback={
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        }
      >
        <BlogPosts />
      </Suspense>
    </Container>
  );
};

export default MyPosts;
