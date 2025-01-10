"use server";
import { revalidatePath } from "next/cache";

type TBlogInfo = {
  blogId: string;
  token: string | undefined;
};

interface TDeleteBlogResponse {
  success: boolean;
  error?: string;
  message?: string;
}

export const deleteBlogAction = async (
  blogInfo: TBlogInfo
): Promise<TDeleteBlogResponse> => {
  const { blogId, token } = blogInfo;

  try {
    // Send DELETE request to the server
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.BEARER} ${token}`,
        },
      }
    );

    const data = await res.json();

    // Check response status
    if (!res.ok) {
      throw new Error(data.message || "Failed to delete blog");
    }

    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/my-blog");

    return {
      success: true,
      message: data.message || "Blog deleted successfully",
    };
  } catch (error: unknown) {
    // Handle errors gracefully
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { success: false, error: errorMessage };
  }
};
