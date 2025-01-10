import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const NotFound = () => {
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
        <Typography mb={2} textAlign="center" variant="h1" color="secondary">
          404
        </Typography>
        <Typography mb={2} textAlign="center" variant="h4" color="primary">
          Page not found
        </Typography>
        <Typography mb={3} textAlign="center" variant="h6" color="primary">
          Oops! The page you are looking for is not exist, it might have been
          moved or deleted.
        </Typography>
        <Button
          component={Link}
          href="/"
          aria-label="add post"
          variant="outlined"
          color="secondary"
        >
          back to home
        </Button>
      </Box>
    </>
  );
};

export default NotFound;
