import { Stack, Typography } from "@mui/material";
import Blog from "@/components/ui/Blog";
import { type TBlog } from "@/types/common";

// fetchBlogs
const fetchBlogs = async (): Promise<TBlog[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
};

const Blogs = async () => {
  try {
    const blogs = await fetchBlogs();

    return (
      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
        {blogs.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No blogs available.
          </Typography>
        ) : (
          blogs.map((blog) => (
            <Blog blog={blog} key={blog._id} showDelete={false} />
          ))
        )}
      </Stack>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return (
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <Typography variant="h6" color="error">
          Failed to load blogs.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please try again later.
        </Typography>
      </Stack>
    );
  }
};

export default Blogs;
