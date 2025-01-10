import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { Suspense, FC } from "react";
import SingleBlogPost from "./SingleBlogPost";

const LoadingFallback = () => (
  <Box sx={{ width: "100%" }}>
    <LinearProgress />
  </Box>
);

interface IPostProps {
  params: {
    blogId: string;
  };
}

const Post: FC<IPostProps> = ({ params }) => {
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{ pt: 4, minHeight: "calc(100vh - 84px)" }}
    >
      <Typography mb={5} textAlign="center" variant="h4" color="primary">
        Blog Post
      </Typography>
      <Suspense fallback={<LoadingFallback />}>
        <SingleBlogPost blogId={params.blogId} />
      </Suspense>
    </Container>
  );
};

export default Post;
