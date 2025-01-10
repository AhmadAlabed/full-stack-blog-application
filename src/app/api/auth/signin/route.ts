import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { signInSchema } from "@/validations/auth/signInSchema";

const SECRET_KEY = process.env.JWT_SECRET as string;

// Ensure the JWT_SECRET environment variable is set
if (!SECRET_KEY) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate the provided email and password
    const validationResult = signInSchema.safeParse({ email, password });
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();
    const user = await User.findOne({ email });

    // If user does not exist, return an error
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
    // Validate the provided password against the stored hash
    const isValidPassword = await bcrypt.compare(
      password as string,
      user?.password ?? ""
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "24h",
    });

    // Return a success response with the user data and token
    return NextResponse.json(
      {
        message: "Logged in successfully",
        user: { id: user._id, email: user.email, name: user.name },
        token,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Handle unexpected errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
