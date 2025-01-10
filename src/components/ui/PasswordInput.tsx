"use client";
//MUI
import { InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
//React
import { MouseEvent, useState } from "react";
// React Hook Form
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
//type
interface IPasswordInputProps<T extends FieldValues> {
  variant: "filled" | "outlined" | "standard";
  name: Path<T>;
  error?: FieldError;
  register: UseFormRegister<T>;
  placeholder: string;
  pending: boolean;
}
const PasswordInput = <T extends FieldValues>({
  variant,
  name,
  error,
  register,
  placeholder,
  pending,
}: IPasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault();
  };
  return (
    <>
      <TextField
        size="small"
        variant={variant}
        type={showPassword ? "text" : "password"}
        fullWidth
        placeholder={placeholder}
        {...register(name)}
        helperText={error?.message}
        error={!!error}
        disabled={pending}
        sx={{ marginBottom: 1 }}
        slotProps={{
          input: {
            // sx: {
            //   borderRadius: "10px",
            //   backgroundColor: "#F9F9F9",
            //   boxShadow: "0px 10.09px 20.18px 0px #4461F20D",
            // },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};

export default PasswordInput;
