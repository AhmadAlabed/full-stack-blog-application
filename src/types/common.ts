//  Blogs.tsx  +  Blog.tsx + my-posts(page.tsx)
export type TBlog = {
  _id: string;
  title: string;
  description: string;
  user: { name: string };
  createdAt: Date;
  updatedAt: Date;
};
