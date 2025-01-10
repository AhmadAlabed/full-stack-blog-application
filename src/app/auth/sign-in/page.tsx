"use client";
//MUI
import { Alert, Box, Divider, Stack, Typography } from "@mui/material";
//Component
import TextInput from "@/components/ui/TextInput";
import ButtonInput from "@/components/ui/ButtonInput";
import PasswordInput from "@/components/ui/PasswordInput";
// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form";
// Next.js
// import Link from "next/link";
import { useRouter } from "next/navigation";
// Validation Schema
import { signInResolver } from "@/validations/auth/signInSchema";
// React
import { useState } from "react";
//Action
import { signInAction } from "@/actions/signInAction";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthButtons from "@/components/AuthButtons";
import { signIn } from "next-auth/react";
type TSignInDataType = {
  email: string;
  password: string;
};
const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInDataType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: signInResolver,
  });
  const onSubmit: SubmitHandler<TSignInDataType> = async (data) => {
    // Reset the error message before making the API call
    setError("");
    try {
      const result = await signInAction(data);
      // If errors are returned, handle them and set the error message
      if (result?.error) {
        if (result?.error?.message) {
          setError(result.error.message[0]);
        } else {
          let message = "";
          for (const [, value] of Object.entries(result.error)) {
            message += `${value.join("\n")}` + "\n";
          }
          setError(message.trim());
        }
        return;
      }

      // If no errors, proceed to sign in
      if (result?.user && result?.token) {
        await signIn("credentials", {
          redirect: false,
          name: result.user.name,
          email: result.user.email,
          token: result.token,
        });
        toast.success(result.message || "Signed in successfully!");
        // Redirect to the home page
        router.push("/");
      } else {
        // If user or token is missing
        setError("Missing user data or token.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred during sign-in");
    }
  };
  return (
    <>
      <Typography mb={2} textAlign="center" variant="h4" color="primary">
        Log in to your account
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <TextInput
          name="email"
          register={register}
          placeholder="Email"
          error={errors.email}
          type="text"
          variant="outlined"
          pending={isSubmitting}
        />
        <PasswordInput
          variant="outlined"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password}
          pending={isSubmitting}
        />
        <ButtonInput
          type="submit"
          text="Login"
          variant="contained"
          pending={isSubmitting}
        />
      </Box>
      {error ? <Alert severity="error">{error}</Alert> : ""}
      <Stack direction="row" spacing={1} justifyContent="center">
        <Typography>{"Don't you have an account?"}</Typography>
        <Typography component={Link} color="primary" href="/auth/sign-up">
          Register
        </Typography>
      </Stack>
      <Divider variant="fullWidth" sx={{ marginBlock: 2 }}>
        Or Continue with
      </Divider>
      <AuthButtons />
    </>
  );
};

export default SignIn;
