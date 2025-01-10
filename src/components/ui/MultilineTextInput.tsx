"use client";
//MUI
import TextField from "@mui/material/TextField";
// React Hook Form
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
//type
interface ITextInputProps<T extends FieldValues> {
  type: string;
  rows: number;
  variant: "filled" | "outlined" | "standard";
  placeholder: string;
  name: Path<T>;
  error?: FieldError;
  register: UseFormRegister<T>;
  pending: boolean;
}

const MultilineTextInput = <T extends FieldValues>({
  type,
  rows,
  variant,
  placeholder,
  name,
  error,
  register,
  pending,
}: ITextInputProps<T>) => {
  return (
    <>
      <TextField
        size="small"
        variant={variant}
        placeholder={placeholder}
        type={type}
        fullWidth
        {...register(name)}
        error={!!error}
        helperText={error?.message}
        disabled={pending}
        sx={{ marginBottom: 1 }}
        multiline
        rows={rows}
      />
    </>
  );
};

export default MultilineTextInput;
