import { Stack, Typography } from "@mui/material";
import Blog from "@/components/ui/Blog";
import { type TBlog } from "@/types/common";
import { auth } from "@/auth";
const fetchBlogs = async (token: string): Promise<TBlog[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/my-posts`,
    {
      cache: "no-store",
      headers: {
        "content-type": "application/json",
        authorization: `${process.env.BEARER} ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};

const BlogPosts = async () => {
  const session = await auth();

  try {
    // Fetch blogs using the session token
    const blogs = await fetchBlogs(session?.token || "");

    return (
      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
        {blogs.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No blogs available.
          </Typography>
        ) : (
          blogs.map((blog) => (
            <Blog
              blog={blog}
              key={blog._id}
              showDelete={true}
              token={session?.token}
            />
          ))
        )}
      </Stack>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return (
      <Typography variant="h6" color="error" textAlign="center">
        Failed to load blogs. Please try again later.
      </Typography>
    );
  }
};

export default BlogPosts;
