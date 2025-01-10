"use client";
//MUI
import { Alert, Box, Typography } from "@mui/material";
//Component
import ButtonInput from "@/components/ui/ButtonInput";
import TextInput from "@/components/ui/TextInput";
import MultilineTextInput from "@/components/ui/MultilineTextInput";
// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form";
// React
import { useState } from "react";
// Next.js
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// Validation Schema
import { blogResolver } from "@/validations/blog/blogSchema";
//Action
import { addBlogAction } from "@/actions/addBlogAction";
import { toast } from "react-toastify";
type TBlogDataType = {
  title: string;
  description: string;
};
const Blog = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TBlogDataType>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: blogResolver,
  });
  if (status === "loading") {
    return <p>Loading session...</p>;
  }
  const onSubmit: SubmitHandler<TBlogDataType> = async (data) => {
    setError("");
    try {
      const result = await addBlogAction({
        ...data,
        token: session?.token || "",
      });

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

      toast.success(result.message);
      router.push("/");
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again later.");
      toast.error("An unexpected error occurred during sign-in");
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 84px)",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "420px" }}>
          <Typography mb={2} textAlign="center" variant="h4" color="primary">
            Create a new blog post.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextInput
              name="title"
              register={register}
              placeholder="Title"
              error={errors.title}
              type="text"
              variant="outlined"
              pending={isSubmitting}
            />
            <MultilineTextInput
              name="description"
              rows={4}
              register={register}
              placeholder="Description"
              error={errors.description}
              type="text"
              variant="outlined"
              pending={isSubmitting}
            />
            <ButtonInput
              type="submit"
              text="Create"
              variant="contained"
              pending={isSubmitting}
            />
          </Box>
          {error ? <Alert severity="error">{error}</Alert> : ""}
        </Box>
      </Box>
    </>
  );
};

export default Blog;
