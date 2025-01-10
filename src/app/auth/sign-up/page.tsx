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
import { signUpResolver } from "@/validations/auth/signUpSchema";
//Action
import { signUpAction } from "@/actions/signUpAction";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthButtons from "@/components/AuthButtons";
type TSignUpDataType = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
};
const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpDataType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    resolver: signUpResolver,
  });
  const onSubmit: SubmitHandler<TSignUpDataType> = async (data) => {
    setError("");
    try {
      const result = await signUpAction(data);

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
      toast.success(result.message || "User signed up successfully");
      router.push("/auth/sign-in");
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred during sign-up");
    }
  };
  return (
    <>
      <Typography mb={2} textAlign="center" variant="h4" color="primary">
        Welcome to Next App
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
        <TextInput<TSignUpDataType>
          name="name"
          register={register}
          placeholder="Full Name"
          error={errors.name}
          type="text"
          variant="outlined"
          pending={isSubmitting}
        />
        <TextInput<TSignUpDataType>
          name="email"
          register={register}
          placeholder="Email"
          error={errors.email}
          type="text"
          variant="outlined"
          pending={isSubmitting}
        />
        <PasswordInput<TSignUpDataType>
          variant="outlined"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password}
          pending={isSubmitting}
        />
        <PasswordInput<TSignUpDataType>
          variant="outlined"
          placeholder="Confirm Password"
          name="rePassword"
          register={register}
          error={errors.rePassword}
          pending={isSubmitting}
        />
        <ButtonInput
          type="submit"
          text="Create Account"
          variant="contained"
          pending={isSubmitting}
        />
      </Box>
      {error ? <Alert severity="error">{error}</Alert> : ""}
      <Stack direction="row" spacing={1} justifyContent="center">
        <Typography>Already have an account?</Typography>
        <Typography component={Link} color="primary" href="/auth/sign-in">
          Login
        </Typography>
      </Stack>
      <Divider variant="fullWidth" sx={{ marginBlock: 2 }}>
        Or Continue with
      </Divider>
      <AuthButtons />
    </>
  );
};

export default SignUp;
