import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";
import Blog from "@/models/blog";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { blogSchema } from "@/validations/blog/blogSchema";

// Function to handle errors
const handleError = (error: unknown) => {
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred";
  console.error("Error:", errorMessage);
  return NextResponse.json({ message: errorMessage }, { status: 500 });
};

// Function to validate and decode the JWT token
const validateToken = (headerToken: string | null): { id: string } => {
  if (!headerToken || !headerToken.startsWith(`${process.env.BEARER} `)) {
    throw new Error("A valid token is required for authentication");
  }

  const token = headerToken.split(" ")[1];
  if (!token || token.length === 0) {
    throw new Error("Invalid or missing token");
  }

  const SECRET_KEY = process.env.JWT_SECRET as string;
  const decoded = jwt.verify(token, SECRET_KEY) as { id?: string };
  if (!decoded.id || !Types.ObjectId.isValid(decoded.id)) {
    throw new Error("Invalid or missing User ID");
  }

  return decoded as { id: string };
};

// GET handler: Fetch all blog posts
export const GET = async () => {
  try {
    await connectToDatabase();

    const blogs = await Blog.find()
      .populate("user", "name -_id")
      .select("-__v")
      .sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};

// POST handler: Create a new blog
export const POST = async (request: NextRequest) => {
  try {
    // Validate and decode the token
    const headerToken = request.headers.get("authorization");
    const { id: userId } = validateToken(headerToken);

    // Parse and validate the request body
    const body = await request.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    const validationResult = blogSchema.safeParse({ title, description });
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create and save the blog
    const newBlog = new Blog({
      title,
      description,
      user: new Types.ObjectId(userId),
    });
    await newBlog.save();

    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
};
