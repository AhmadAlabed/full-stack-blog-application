"use server";
import { blogSchema } from "@/validations/blog/blogSchema";
import { revalidatePath } from "next/cache";

type TBlogInfo = {
  title: string;
  description: string;
  token: string;
};

type TBlogResponse = {
  blog?: {
    _id: string;
    title: string;
    description: string;
    user: string;
  };
  message?: string;
  error?: Record<string, string[]>;
};

export const addBlogAction = async (
  blogInfo: TBlogInfo
): Promise<TBlogResponse> => {
  const { title, description, token } = blogInfo;

  // Validate blog info locally
  const validationResult = blogSchema.safeParse({ title, description });
  if (!validationResult.success) {
    return {
      error: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`,
      {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.BEARER} ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.message || "Failed to add blog",
        error: data.error || {},
      };
    }

    // Revalidate the home page
    revalidatePath("/");

    return {
      blog: data.blog,
      message: data.message || "Blog added successfully",
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return {
      message: errorMessage,
      error: { general: [errorMessage] },
    };
  }
};
