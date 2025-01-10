import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must contain at least 3 characters.")
      .regex(/^[a-zA-Z]+$/, "Name must contain only alphabetic characters."),

    email: z.string().email("Invalid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/\d/, "Password must contain at least one number.")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character."
      ),
    rePassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.rePassword;
    },
    {
      message: "The Confirm password must match the password.",
      path: ["rePassword"],
    }
  );
export const signUpResolver = zodResolver(signUpSchema);
