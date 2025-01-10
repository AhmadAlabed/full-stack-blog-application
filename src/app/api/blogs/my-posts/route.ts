import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";
import Blog from "@/models/blog";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

// Function to handle errors consistently
const handleError = (error: unknown) => {
  console.error("Error occurred:", error); // Log the error for debugging
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred";
  return NextResponse.json({ message: errorMessage }, { status: 500 });
};

// Function to extract and validate token
const extractAndVerifyToken = (
  request: Request
): { id: string; email?: string } => {
  const headerToken = request.headers.get("authorization");

  if (!headerToken?.startsWith(`${process.env.BEARER} `)) {
    throw new Error("A token is required for authentication");
  }

  const token = headerToken.split(" ")[1];
  if (!token) {
    throw new Error("Invalid Token");
  }

  try {
    const SECRET_KEY = process.env.JWT_SECRET as string;
    return jwt.verify(token, SECRET_KEY) as { id: string; email?: string };
  } catch {
    throw new Error("Invalid or expired Token");
  }
};

// GET handler: Fetch user's blog posts
export const GET = async (request: Request) => {
  try {
    // Extract and validate token
    const decoded = extractAndVerifyToken(request);

    // Validate user ID
    if (!decoded.id || !Types.ObjectId.isValid(decoded.id)) {
      return NextResponse.json(
        { message: "Invalid or missing User ID" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Fetch blogs associated with the user
    const blogs = await Blog.find({ user: decoded.id })
      .populate("user", "name -_id")
      .select("-__v")
      .sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};
