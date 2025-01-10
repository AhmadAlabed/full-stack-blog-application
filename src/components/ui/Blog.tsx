import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { format } from "date-fns";
import DeleteDialog from "./DeleteDialog";
import { type TBlog } from "@/types/common";
import Link from "next/link";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
type TBlogProps = {
  blog: TBlog;
  showDelete?: boolean;
  token?: string | undefined;
};

const Blog = ({ blog, showDelete, token }: TBlogProps) => {
  const cardStyles = {
    width: "320px",
    position: "relative",
  };

  const titleStyles = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const descriptionStyles = {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  };

  return (
    <Card variant="elevation" sx={cardStyles}>
      <CardContent>
        <Typography variant="h5" component="h3" sx={titleStyles}>
          {blog.title}
        </Typography>
        <Typography mb={3} variant="caption" component="p" color={grey[600]}>
          {format(new Date(blog.createdAt), "dd-MM-yyyy")}
        </Typography>
        <Typography mb={3} variant="body2" component="p" sx={descriptionStyles}>
          {blog.description || "No description available."}
        </Typography>
        <Typography variant="caption" component="p" color="primary">
          {`By: ${blog.user?.name || "Anonymous"}`}
          <IconButton
            size="small"
            color="primary"
            aria-label="more"
            component={Link}
            href={`/blog/${blog._id}`}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Typography>
      </CardContent>

      {showDelete && <DeleteDialog blogId={blog._id} token={token} />}
    </Card>
  );
};

export default Blog;
