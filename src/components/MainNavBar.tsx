"use client";
//MUI
import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  Button,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";
//Next
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
const MainNavBar = () => {
  const { data: session, status } = useSession();
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: "fixed",
          right: 0,
          left: 0,
          top: 0,
          zIndex: 999,
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Image src="/images/logo.png" alt="logo" height="20" width="20" />
            <Typography
              color="primary"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, marginInlineStart: 1 }}
            >
              Next App
            </Typography>
            {status === "loading" ? (
              <CircularProgress color="primary" />
            ) : (
              <>
                {status === "authenticated" ? (
                  <>
                    <Button color="primary" onClick={handleLogout}>
                      Logout
                    </Button>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ marginInline: 1 }}
                    />
                    <Typography
                      variant="caption"
                      color="primary"
                      marginInline={1}
                    >
                      {session?.user?.name || ""}
                    </Typography>
                    <Avatar
                      sx={{ bgcolor: "#81caef" }}
                      alt={session?.user?.name || ""}
                      src={session?.user?.image || undefined}
                    >
                      {!session?.user?.image &&
                        (session?.user?.name?.charAt(0)
                          ? session?.user?.name.charAt(0)
                          : "?")}
                    </Avatar>
                  </>
                ) : (
                  <>
                    <Button
                      component={Link}
                      color="primary"
                      href="/auth/sign-up"
                    >
                      Register
                    </Button>

                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ marginInline: 2 }}
                    />

                    <Button
                      component={Link}
                      variant="outlined"
                      color="primary"
                      href="/auth/sign-in"
                    >
                      Login
                    </Button>
                  </>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default MainNavBar;
