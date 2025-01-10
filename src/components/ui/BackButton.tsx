"use client";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      sx={{ maxWidth: "100px" }}
      variant="outlined"
      color="primary"
      onClick={() => router.back()}
      startIcon={<ArrowBackIosIcon />}
    >
      Back
    </Button>
  );
};

export default BackButton;
