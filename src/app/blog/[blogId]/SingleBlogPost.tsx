import { Divider, Stack, Typography, Box } from "@mui/material";
import { type TBlog } from "@/types/common";
import { grey } from "@mui/material/colors";
import { format } from "date-fns";
import BackButton from "@/components/ui/BackButton";

const fetchBlogs = async (blogId: string): Promise<TBlog> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`,
    {
      cache: "no-store",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog post");
  }

  return res.json();
};

const SingleBlogPost = async ({ blogId }: { blogId: string }) => {
  try {
    const blog = await fetchBlogs(blogId);

    return (
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          maxWidth: "800px",
          backgroundColor: grey[900],
          mx: "auto",
          mt: 4,
        }}
      >
        <Stack spacing={2}>
          {/* Title */}
          <Typography variant="h4" component="h1" fontWeight="bold">
            {blog.title}
          </Typography>

          {/* Date */}
          <Typography
            variant="body2"
            component="p"
            color={grey[600]}
            sx={{ fontStyle: "italic" }}
          >
            Published on:{" "}
            {format(new Date(blog.createdAt), "dd-MM-yyyy (hh:mm)")}
          </Typography>

          {/* Divider */}
          <Divider />

          {/* Description */}
          <Typography
            variant="body1"
            component="p"
            sx={{ lineHeight: 1.6, textAlign: "justify" }}
          >
            {blog.description || "No description available."}
          </Typography>

          {/* Author */}
          <Typography
            variant="body1"
            component="p"
            color="primary"
            fontWeight="medium"
          >
            {`By: ${blog.user?.name || "Anonymous"}`}
          </Typography>

          {/* Back Button */}
          <Box mt={2}>
            <BackButton />
          </Box>
        </Stack>
      </Box>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);

    return (
      <Box
        sx={{
          p: 3,
          bgcolor: "#ffe6e6",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="error">
          Failed to load blog. Please try again later.
        </Typography>
      </Box>
    );
  }
};

export default SingleBlogPost;
