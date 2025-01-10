"use client";
//MUI
import Button from "@mui/material/Button";
//React
import { ButtonHTMLAttributes, ReactNode } from "react";
interface IButtonSocialProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "button" | "reset";
  variant: "text" | "contained" | "outlined";
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  children: ReactNode;
}

const ButtonSocial: React.FC<IButtonSocialProps> = ({
  type,
  variant,
  color,
  children,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      type={type}
      fullWidth
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        textTransform: "capitalize",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonSocial;
