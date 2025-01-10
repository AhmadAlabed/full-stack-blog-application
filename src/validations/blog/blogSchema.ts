import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const blogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must contain at least 3 characters." })
    .max(50, { message: "Title cannot exceed 50 characters." }),

  description: z
    .string()
    .trim()
    .min(20, { message: "Description must contain at least 20 characters." })
    .max(200, { message: "Description cannot exceed 200 characters." }),
});

export const blogResolver = zodResolver(blogSchema);
