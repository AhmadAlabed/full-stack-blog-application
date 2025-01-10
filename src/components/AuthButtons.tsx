"use client";
//MUI
import { Stack, Typography } from "@mui/material";
import ButtonSocial from "./ui/ButtonSocial";
//Icon
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { loginWithSocialAction } from "@/actions/loginWithSocialAction";

const AuthButtons = () => {
  const handleButtonSocialClick = async (action: "github" | "google") => {
    await loginWithSocialAction(action);
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <ButtonSocial
        color="inherit"
        type="button"
        variant="contained"
        onClick={() => {
          handleButtonSocialClick("github");
        }}
      >
        <Typography
          variant="button"
          color="primary"
          textTransform={"capitalize"}
        >
          Login with Github
        </Typography>
        <GitHubIcon color="primary" />
      </ButtonSocial>
      <ButtonSocial
        color="inherit"
        type="button"
        variant="contained"
        onClick={() => {
          handleButtonSocialClick("google");
        }}
      >
        <Typography
          variant="button"
          color="primary"
          textTransform={"capitalize"}
        >
          Login with Google
        </Typography>
        <GoogleIcon color="primary" />
      </ButtonSocial>
    </Stack>
  );
};

export default AuthButtons;
