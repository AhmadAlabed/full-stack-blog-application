import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";
import { signUpSchema } from "@/validations/auth/signUpSchema";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const { name, email, password, rePassword } = await request.json();
    const validationResult = signUpSchema.safeParse({
      name,
      email,
      password,
      rePassword,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // Return success response
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    // Return error response
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
