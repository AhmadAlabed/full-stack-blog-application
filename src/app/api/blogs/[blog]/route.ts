import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/blog";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

// Function to handle errors
const handleError = (error: unknown) => {
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred";
  return NextResponse.json({ message: errorMessage }, { status: 500 });
};

// Helper function to validate token
const validateToken = (headerToken: string | null) => {
  if (!headerToken?.startsWith(`${process.env.BEARER} `)) {
    throw new Error("A token is required for authentication");
  }

  const token = headerToken.split(" ")[1];
  if (!token) {
    throw new Error("Invalid Token");
  }

  const SECRET_KEY = process.env.JWT_SECRET as string;
  return jwt.verify(token, SECRET_KEY) as { id?: string; email?: string };
};

// DELETE handler
export const DELETE = async (
  request: NextRequest,
  context: { params: { blog: string } }
) => {
  try {
    const blogId = context.params.blog;

    // Validate blog ID
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return NextResponse.json(
        { message: "Invalid or missing Blog ID" },
        { status: 400 }
      );
    }

    // Extract and validate token
    const headerToken = request.headers.get("authorization");
    const decoded = validateToken(headerToken);

    // Validate user ID
    if (!decoded.id || !Types.ObjectId.isValid(decoded.id)) {
      return NextResponse.json(
        { message: "Invalid or missing User ID" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Verify blog existence and ownership
    const blog = await Blog.findOne({ _id: blogId, user: decoded.id });
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found or you are not authorized to delete it" },
        { status: 404 }
      );
    }

    // Delete blog
    await blog.deleteOne();

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Handle authentication errors separately for better UX
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { message: "Invalid or expired Token" },
        { status: 401 }
      );
    }
    return handleError(error);
  }
};
// GET function to retrieve a blog based on blogId
export const GET = async (
  request: NextRequest,
  context: { params: { blog: string } }
) => {
  try {
    const blogId = context.params.blog;

    // Validate blog ID
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return NextResponse.json(
        { message: "Invalid or missing Blog ID" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();
    // Find the blog by ID
    const blog = await Blog.findOne({ _id: blogId })
      .populate("user", "name -_id")
      .select("-__v")
      .sort({ createdAt: -1 });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    // Return the blog data if found
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};
