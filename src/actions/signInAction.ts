"use server";
import { signInSchema } from "@/validations/auth/signInSchema";

export type TUserInfo = {
  email: string;
  password: string;
};

type TUserResponse = {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
  token?: string;
  error?: Record<string, string[]>;
};

export const signInAction = async (
  userInfo: TUserInfo
): Promise<TUserResponse> => {
  // Validate user input
  const validationResult = signInSchema.safeParse(userInfo);
  if (!validationResult.success) {
    return {
      error: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // Make API request to sign in
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
      {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Parse response data
    const data = await res.json();

    // If response is not successful, return error
    if (!res.ok) {
      return {
        error: data.error || { general: [data.message || "Failed to sign in"] },
      };
    }

    // Return user data, message, and token on successful sign-in
    return {
      user: data.user,
      message: data.message || "User signed in successfully",
      token: data.token,
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
