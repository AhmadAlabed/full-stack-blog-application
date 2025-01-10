"use client";
//MUI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
//type
interface IButtonProps {
  type: "submit" | "button" | "reset";
  variant: "text" | "contained" | "outlined";
  text: string;
  pending: boolean;
}
const ButtonInput = ({ variant, type, text, pending }: IButtonProps) => {
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Button
          type={type}
          variant={variant}
          sx={{
            width: "100%",
            padding: "8px",
          }}
          disabled={pending}
        >
          {text}
        </Button>
        {pending && (
          <CircularProgress
            size={24}
            color="primary"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-16px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </>
  );
};

export default ButtonInput;
