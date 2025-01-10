"use server";
import { signUpSchema } from "@/validations/auth/signUpSchema";

type TUserInfo = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
};

type TUserResponse = {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
  error?: Record<string, string[]>;
};

export const signUpAction = async (
  userInfo: TUserInfo
): Promise<TUserResponse> => {
  // Validate user input locally
  const validationResult = signUpSchema.safeParse(userInfo);
  if (!validationResult.success) {
    return {
      error: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // Make an API request to the signup endpoint
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    // Handle unsuccessful responses from the server
    if (!res.ok) {
      return {
        error: data.error || { general: [data.message || "Failed to sign up"] },
      };
    }

    // Return successful response with user info
    return {
      user: data.user,
      message: data.message || "User signed up successfully",
    };
  } catch (error: unknown) {
    // Handle unexpected errors
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return {
      error: { general: [errorMessage] },
    };
  }
};
